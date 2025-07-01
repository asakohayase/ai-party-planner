from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import os
from dotenv import load_dotenv

from models.party_request import PartyRequest, PartyPlanResponse
from agents.party_director import PartyDirector

# Load environment variables
load_dotenv()

app = FastAPI(title="AI Party Planner", version="1.0.0")

# Add CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the party director
party_director = PartyDirector()

@app.get("/")
async def root():
    return {"message": "AI Party Planner API", "status": "running"}

@app.post("/api/party-plan", response_model=PartyPlanResponse)
async def create_party_plan(request: PartyRequest):
    """
    Generate a party plan using AI specialists.
    """
    try:
        # Validate required fields
        if not request.occasion or not request.guest_count:
            raise HTTPException(status_code=400, detail="Missing required fields")
        
        # Generate the party plan
        plan_content, specialist_used = party_director.plan_party(request)
        
        return PartyPlanResponse(
            success=True,
            plan=plan_content,
            specialist_used=specialist_used,
            timestamp=datetime.now().isoformat()
        )
        
    except Exception as e:
        print(f"Error generating party plan: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to generate party plan: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
