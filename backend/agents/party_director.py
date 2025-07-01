from strands import Agent
from .food_specialist import food_drink_specialist
from .theme_specialist import theme_decoration_specialist
from .activity_specialist import activity_entertainment_specialist
from models.party_request import PartyRequest

PARTY_DIRECTOR_PROMPT = """
You are a Party Director AI that coordinates ALL specialized party planning agents for comprehensive home party planning.

For every party request, you should:
1. ALWAYS call food_drink_specialist for menu and refreshment planning
2. ALWAYS call theme_decoration_specialist for decoration and ambiance ideas  
3. ALWAYS call activity_entertainment_specialist for games and entertainment

Then combine all their responses into a comprehensive, well-organized party plan with clear sections:
- 🍕 FOOD & DRINKS (from food specialist)
- 🎨 THEME & DECORATIONS (from theme specialist)  
- 🎪 ACTIVITIES & ENTERTAINMENT (from activity specialist)
- 📋 COORDINATION TIPS (your own suggestions for bringing it all together)

Make the final plan cohesive and ensure all three aspects work well together for the specific occasion, guest count, location, and duration.
"""

class PartyDirector:
    def __init__(self):
        self.director = Agent(
            system_prompt=PARTY_DIRECTOR_PROMPT,
            tools=[food_drink_specialist, theme_decoration_specialist, activity_entertainment_specialist]
        )
    
    def plan_party(self, party_request: PartyRequest) -> tuple[str, str]:
        """
        Generate a comprehensive party plan using ALL specialists.
        
        Returns:
            tuple: (plan_content, specialist_used)
        """
        # Format the party request for the AI
        party_details = self._format_party_request(party_request)
        
        # Enhanced prompt to ensure all specialists are called
        comprehensive_prompt = f"""
        {party_details}
        
        IMPORTANT: You must call ALL THREE specialists for a complete party plan:
        1. First call food_drink_specialist for the menu and drinks
        2. Then call theme_decoration_specialist for decorations and theme
        3. Then call activity_entertainment_specialist for activities and entertainment
        4. Finally, combine everything into a comprehensive plan with clear sections
        
        Provide a complete party planning solution covering food, decorations, and activities.
        """
        
        # Get the comprehensive plan from the director
        plan = self.director(comprehensive_prompt)
        
        return str(plan), "comprehensive"  # Return "comprehensive" since all specialists used
    
    def _format_party_request(self, request: PartyRequest) -> str:
        details = f"""
Party Planning Request:
- Occasion: {request.occasion}
- Guest Count: {request.guest_count}
- Location: {request.location} home
- Duration: {request.duration}
- Time of Day: {request.time_of_day}
"""
        
        if request.dietary_restrictions:
            details += f"- Dietary Restrictions: {request.dietary_restrictions}\n"
        if request.guest_ages:
            details += f"- Guest Ages: {request.guest_ages}\n"
        if request.special_requests:
            details += f"- Special Requests: {request.special_requests}\n"
        
        return details
