from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import os
from dotenv import load_dotenv
from pydantic import ValidationError

from models.party_request import PartyRequest, PartyPlanResponse
from agents.party_director import party_director

# Load environment variables
load_dotenv()

app = FastAPI(title="AI Party Planner", version="1.0.0")

# Add CORS middleware for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://ai-party-planner.vercel.app",
    ],  # Add comma here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "AI Party Planner API", "status": "running"}


@app.post("/api/party-plan", response_model=PartyPlanResponse)
async def create_party_plan(request_data: dict):
    """
    Generate a party plan using AI specialists.
    """
    try:
        print("Raw request data received:", request_data)

        # Try to parse the request data
        try:
            request = PartyRequest(**request_data)
            print("Successfully parsed request:", request.dict())
        except ValidationError as e:
            print("Pydantic validation error:", e.errors())
            # Return detailed validation errors
            raise HTTPException(status_code=422, detail=e.errors())

        # Validate required fields
        if not request.occasion or not request.planning_focus:
            raise HTTPException(
                status_code=400,
                detail="Missing required fields: occasion and planning_focus",
            )

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

        if request.start_time and request.end_time:
            party_details += (
                f"- Party Time: {request.start_time} to {request.end_time}\n"
            )

        if request.time_of_day:
            party_details += f"- Time of Day: {request.time_of_day}\n"

        if request.dietary_restrictions:
            party_details += f"- Dietary Restrictions: {request.dietary_restrictions}\n"

        if request.guest_ages:
            party_details += f"- Guest Ages: {request.guest_ages}\n"

        if request.special_requests:
            party_details += f"- Special Requests: {request.special_requests}\n"

        party_details += f"\nBased on the planning focus '{request.planning_focus}', please call the appropriate specialist tools and create a comprehensive party plan."

        print("Party details being sent to agent:", party_details)

        # Call the party director agent
        response = party_director(party_details)

        return PartyPlanResponse(
            success=True,
            plan=str(response),
            specialist_used="Party Director with specialized agents",
            timestamp=datetime.now().isoformat(),
        )

    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        print("Unexpected error in create_party_plan:", str(e))
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
