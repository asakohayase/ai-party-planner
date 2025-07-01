from strands import tool
from datetime import datetime


@tool
def calculate_party_duration(start_time: str, end_time: str) -> str:
    """
    Calculate party duration and time of day from start/end times.

    Args:
        start_time: Start time in HH:MM format (e.g., "14:00")
        end_time: End time in HH:MM format (e.g., "17:00")

    Returns:
        Formatted string with duration and time of day information
    """
    try:
        start = datetime.strptime(start_time, "%H:%M")
        end = datetime.strptime(end_time, "%H:%M")

        # Calculate duration in hours
        duration = (end - start).total_seconds() / 3600

        # Determine time of day
        start_hour = start.hour
        if start_hour < 12:
            time_of_day = "morning"
        elif start_hour < 18:
            time_of_day = "afternoon"
        else:
            time_of_day = "evening"

        return f"Duration: {duration} hours, Time of day: {time_of_day}"
    except Exception as e:
        return f"Could not calculate time details: {str(e)}"
