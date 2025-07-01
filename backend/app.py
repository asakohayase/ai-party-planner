from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import os
from dotenv import load_dotenv

from models.party_request import PartyRequest, PartyPlanResponse
from agents.party_director import party_director

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
        if not request.occasion or not request.planning_focus:
            raise HTTPException(status_code=400, detail="Missing required fields")

        # Format the party request with proper handling of optional fields
        party_details = f"""
Party Planning Request:
- Occasion: {request.occasion}
- Planning Focus: {request.planning_focus}
"""

        # Add optional fields only if they have values
        if request.guest_count:
            party_details += f"- Guest Count: {request.guest_count}\n"

        if request.location:
            party_details += f"- Location: {request.location} \n"

        if request.start_time and request.end_time and request.duration_hours:
            party_details += f"- Duration: {request.duration_hours} hours ({request.start_time} to {request.end_time})\n"

        if request.time_of_day:
            party_details += f"- Time of Day: {request.time_of_day}\n"

        if request.dietary_restrictions:
            party_details += f"- Dietary Restrictions: {request.dietary_restrictions}\n"

        if request.guest_ages:
            party_details += f"- Guest Ages: {request.guest_ages}\n"

        if request.special_requests:
            party_details += f"- Special Requests: {request.special_requests}\n"

        party_details += f"\nBased on the planning focus '{request.planning_focus}', please call the appropriate specialist tools and create a comprehensive party plan."

        # Generate the party plan using the agent directly
        plan_content = party_director(party_details)

        return PartyPlanResponse(
            success=True,
            plan=str(plan_content),
            specialist_used="comprehensive",
            timestamp=datetime.now().isoformat(),
        )

    except Exception as e:
        print(f"Error generating party plan: {str(e)}")
        raise HTTPException(
            status_code=500, detail=f"Failed to generate party plan: {str(e)}"
        )


@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
