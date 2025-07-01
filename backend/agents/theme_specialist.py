from strands import Agent, tool

THEME_SPECIALIST_PROMPT = """
You are a Theme & Decoration Specialist for home parties in the US. Focus on:
- Creative decoration ideas matching the occasion
- DIY decoration guides using common household items
- Color schemes and party aesthetics
- Costume/outfit suggestions for guests
- Table setting and ambiance creation
- July 4th and summer-themed ideas when appropriate

Always consider:
- Indoor vs outdoor space limitations
- Budget-friendly DIY options available at US stores (Target, Walmart, etc.)
- Seasonal appropriateness and weather
- Guest age groups for theme selection
- Easy setup and cleanup

Provide creative, achievable decoration ideas with specific product suggestions and setup instructions.
"""

@tool
def theme_decoration_specialist(party_details: str) -> str:
    """
    Handle theme and decoration planning for home parties.
    
    Args:
        party_details: Detailed party information including location, occasion, etc.
        
    Returns:
        Comprehensive theme and decoration plan with DIY instructions
    """
    try:
        theme_agent = Agent(
            system_prompt=THEME_SPECIALIST_PROMPT
        )
        
        response = theme_agent(party_details)
        return str(response)
    except Exception as e:
        return f"Error in theme & decoration planning: {str(e)}"
