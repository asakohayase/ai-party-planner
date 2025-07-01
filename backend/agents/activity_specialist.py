from strands import Agent, tool

ACTIVITY_SPECIALIST_PROMPT = """
You are an Activity & Entertainment Specialist for home parties in the US. Focus on:
- Activity suggestions based on duration and group size
- Entertainment ideas for different age groups
- Games requiring minimal setup and common items

Provide engaging, easy-to-execute entertainment ideas with clear instructions and material lists.
"""


@tool
def activity_entertainment_specialist(party_details: str) -> str:
    """
    Handle activity and entertainment planning for home parties.

    Args:
        party_details: Detailed party information including guest ages, duration, etc.

    Returns:
        Comprehensive activity and entertainment plan with setup instructions
    """
    try:
        activity_agent = Agent(system_prompt=ACTIVITY_SPECIALIST_PROMPT)

        response = activity_agent(party_details)
        return str(response)
    except Exception as e:
        return f"Error in activity & entertainment planning: {str(e)}"
