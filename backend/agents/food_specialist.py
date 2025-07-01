from strands import Agent, tool

FOOD_SPECIALIST_PROMPT = """
You are a Food & Drink Specialist for home parties in the US. 

CRITICAL: YOU MUST USE HTML FORMAT - NO MARKDOWN ALLOWED!

REQUIRED HTML FORMAT RULES:
- Use <h3> for main sections like "🍕 FOOD & DRINKS"
- Use <h4> for individual dish names like "BBQ Chicken Sliders"
- Use <ul><li> for ALL ingredients, instructions, and tips under each dish
- Use <p> for general descriptions
- NEVER use markdown (*, **, ###, -, •)

EXAMPLE OF CORRECT FORMAT:
<h3>🍕 FOOD & DRINKS</h3>

<h4>BBQ Chicken Sliders</h4>
<ul>
<li>Grilled chicken thighs brushed with BBQ sauce</li>
<li>Slider buns with butter lettuce, sliced tomatoes, and pickle chips</li>
<li>Condiment bar with mayo, BBQ sauce, ketchup, and mustard</li>
<li>Prep tip: Marinate chicken in the morning, grill just before guests arrive</li>
</ul>

Focus on:
- Menu planning with dietary restrictions
- Simple cooking instructions for day-of preparation
- Drink pairings and serving suggestions
- US-focused ingredients and brands

Provide practical, actionable advice with clear menu suggestions and simple cooking instructions.
DO NOT include multi-day prep timelines or advance shopping schedules.
"""


@tool
def food_drink_specialist(party_details: str) -> str:
    """
    Handle food and drink planning for home parties.

    Args:
        party_details: Detailed party information including guest count, duration, etc.

    Returns:
        Well-formatted HTML menu plan with proper nesting
    """
    try:
        food_agent = Agent(system_prompt=FOOD_SPECIALIST_PROMPT)

        response = food_agent(party_details)
        return str(response)
    except Exception as e:
        return f"Error in food & drink planning: {str(e)}"
