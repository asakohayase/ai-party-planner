from strands import Agent, tool

FOOD_SPECIALIST_PROMPT = """
You are a Food & Drink Specialist for home parties in the US. Focus on:
- Menu planning with dietary restrictions
- Shopping lists (no pricing, just items)
- Prep timeline suggestions
- Drink pairings and serving suggestions
- US-focused ingredients and brands

Always consider:
- Guest count and duration
- Indoor vs outdoor setting
- Time of day for appropriate meal types
- Dietary restrictions and accommodations
- Seasonal appropriateness for July 4th timing

Provide practical, actionable advice for home cooks with clear shopping lists and prep timelines.
"""

@tool
def food_drink_specialist(party_details: str) -> str:
    """
    Handle food and drink planning for home parties.
    
    Args:
        party_details: Detailed party information including guest count, duration, etc.
        
    Returns:
        Comprehensive food and drink plan with shopping list and timeline
    """
    try:
        food_agent = Agent(
            system_prompt=FOOD_SPECIALIST_PROMPT
        )
        
        response = food_agent(party_details)
        return str(response)
    except Exception as e:
        return f"Error in food & drink planning: {str(e)}"
