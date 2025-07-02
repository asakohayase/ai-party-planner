# **AI Party Planner** 🎉

### Strands Agents SDK Demo: "Agents as Tools" Pattern

A demonstration project showcasing the **Strands Agents SDK's "Agents as Tools"** pattern through an intelligent party planning system. This project implements a hierarchical multi-agent architecture where a Party Director coordinates three specialized agents to create comprehensive party plans.

![Image](https://github.com/user-attachments/assets/894a66eb-a9f2-4f4e-b92b-d25259608621)

## **1. Agent Architecture Diagram**

<img width="1161" alt="Image" src="https://github.com/user-attachments/assets/2cb46a89-0661-4fe3-ac4a-ce06199a228c" />


## **2. Core Implementation**

### **2-1. Party Director (Orchestrator)**
The main agent coordinates specialists based on user requirements:

```python
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
```

### **2-2. Specialist Agents as Tools**
Each specialist is wrapped with the `@tool` decorator, making them callable by the orchestrator:

```python
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
```

### **2-3. Key Strands SDK Features Demonstrated**

- **Simple Agent Creation**: Strands SDK only requires a model, prompt, and tools - no complex setup needed
- **Agents as Tools**: Specialist agents wrapped with `@tool` decorator for hierarchical coordination
- **Intelligent Tool Selection**: Dynamic agent routing based on user requirements


## **3. Quick Start**

### **Prerequisites**
- Python 3.11+, Node.js 18+
- uv package manager: `pip install uv`
- AWS credentials for Strands Agents SDK

### **Installation**

1. **Clone and setup:**
```bash
git clone https://github.com/asakohayase/ai-party-planner.git
cd ai-party-planner
```

2. Create .env file in the root directory:
```bash
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
```

3. Backend setup:
```bash
cd backend
uv install
```

4. Frontend setup:
```bash
cd ../frontend
npm install
```

5. Create .env.local in the frontend directory:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
````

6. Run the applications:
Backend (terminal 1):
```bash
cd backend
uv run uvicorn app:app --reload --port 8000
```

7. Frontend (terminal 2):
```bash
cd frontend
npm run dev
```
Access: http://localhost:3000


## **4. Project Structure**
```
ai-party-planner/
├── backend/
│   ├── agents/
│   │   ├── party_director.py      # Main orchestrator agent
│   │   ├── food_specialist.py     # Specialized agent as tool
│   │   ├── theme_specialist.py    # Specialized agent as tool
│   │   └── activity_specialist.py # Specialized agent as tool
│   ├── tools/
│   │   └── time_calculator.py     # Calculator tool
│   ├── models/
│   │   └── party_request.py       # Pydantic models
│   ├── app.py                     # FastAPI server
│   ├── requirements.txt
│   └── pyproject.toml
└── frontend/
    ├── components/
    │   ├── ui/                   
    │   ├── party-form.tsx         # Input form
    │   └── party-plan-result.tsx  # Results display
    ├── types/
    │   └── party.ts               # TypeScript interfaces
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── globals.css
    ├── public/            
    ├── package.json
    ├── next.config.ts
    └── eslint.config.mjs
```

## **5. Extending the Demo**

We can easily add more agents or tools:
- **Venue Specialist** - website search tools, booking APIs
- **Music & Playlist Specialist** - Spotify search tool, playlist generation
- **Marketing Specialist** - social media content creation, email invitation tools, RSVP tracking

Other enhancements:
- Convert to conversational chat interface for follow-up questions and iterative planning
- Add agent memory for multi-turn conversations

## **6. Links**
- **Live Demo:** https://ai-party-planner.vercel.app
- **Strands Agents SDK:** https://docs.strands.ai  
- **Multi-Agent Examples:** https://github.com/strands-agents/docs/blob/main/docs/examples/

