from pydantic import BaseModel
from typing import Optional, Literal


class PartyRequest(BaseModel):
    occasion: str
    guest_count: Optional[int] = None
    location: Optional[Literal["indoor", "outdoor"]] = None
    start_time: Optional[str] = None
    end_time: Optional[str] = None
    time_of_day: Optional[Literal["morning", "afternoon", "evening"]] = None
    planning_focus: str
    dietary_restrictions: Optional[str] = None
    guest_ages: Optional[Literal["kids", "adults", "mixed"]] = None
    special_requests: Optional[str] = None


class PartyPlanResponse(BaseModel):
    success: bool
    plan: str
    specialist_used: str
    timestamp: str
