from strands import Agent
from .food_specialist import food_drink_specialist
from .theme_specialist import theme_decoration_specialist
from .activity_specialist import activity_entertainment_specialist

PARTY_DIRECTOR_PROMPT = """
You are a Party Director AI that coordinates specialized party planning agents to create comprehensive home party plans.

You have access to three specialist tools:
- food_drink_specialist: for menu planning, drinks, and food-related aspects
- theme_decoration_specialist: for decorations, themes, and visual setup
- activity_entertainment_specialist: for games, activities, and entertainment

Based on what the user wants planned, call the appropriate specialists and combine their responses into a well-organized party plan with clear sections like:
- 🍕 FOOD & DRINKS (if relevant)
- 🎨 THEME & DECORATIONS (if relevant)
- 🎪 ACTIVITIES & ENTERTAINMENT (if relevant)
- 📋 COORDINATION TIPS (your suggestions for bringing it all together)

Create a cohesive plan that works well for the specific occasion and requirements.
"""

party_director = Agent(
    system_prompt=PARTY_DIRECTOR_PROMPT,
    tools=[
        food_drink_specialist,
        theme_decoration_specialist,
        activity_entertainment_specialist,
    ],
)
