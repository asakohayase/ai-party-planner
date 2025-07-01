from strands import Agent

from .food_specialist import food_drink_specialist
from .theme_specialist import theme_decoration_specialist
from .activity_specialist import activity_entertainment_specialist


PARTY_DIRECTOR_PROMPT = """
You are a Party Director AI that coordinates specialized party planning agents.

You have access to these tools:
- food_drink_specialist: for menu planning and drinks
- theme_decoration_specialist: for decorations and themes  
- activity_entertainment_specialist: for games and activities

Based on what the user wants planned, call the appropriate specialists and combine their responses into a comprehensive party plan.

Always structure your response with clear sections and provide practical, actionable advice.
Focus on the specific planning aspects the user requested.
"""

party_director = Agent(
    system_prompt=PARTY_DIRECTOR_PROMPT,
    tools=[
        food_drink_specialist,
        theme_decoration_specialist,
        activity_entertainment_specialist,
    ],
)
