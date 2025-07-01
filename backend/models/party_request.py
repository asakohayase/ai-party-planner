from pydantic import BaseModel
from typing import Optional, Literal


class PartyRequest(BaseModel):
    occasion: str
    guest_count: int
    location: Literal["indoor", "outdoor"]
    start_time: str
    end_time: str
    duration_hours: float
    time_of_day: Literal["morning", "afternoon", "evening"]
    planning_focus: str
    dietary_restrictions: Optional[str] = None
    guest_ages: Optional[Literal["kids", "adults", "mixed"]] = None
    special_requests: Optional[str] = None


class PartyPlanResponse(BaseModel):
    success: bool
    plan: str
    specialist_used: str
    timestamp: str["afternoon", "evening"]
    dietary_restrictions: Optional[str] = None
    guest_ages: Optional[Literal["kids", "adults", "mixed"]] = None
    special_requests: Optional[str] = None


class PartyPlanResponse(BaseModel):
    success: bool
    plan: str
    specialist_used: str
    timestamp: str
