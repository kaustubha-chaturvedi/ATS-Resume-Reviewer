import os
from crewai import Crew, Process, crews
from langchain_groq import ChatGroq
from tasks import get_tasks, get_agents
from utils import read_all_pdf_pages

# Configuration
os.environ["SERPER_API_KEY"] = os.getenv("SERPER_API_KEY")
os.environ["GROQ_API_KEY"] = os.getenv("GROQ_API_KEY")

# Load the llm
llm = ChatGroq(model="llama3-8b-8192", temperature=1, max_tokens=1024)

# Provided the inputs
resume = read_all_pdf_pages("data/resume.pdf")
job_desire = input()

# Creating agents and tasks
job_requirements_researcher, resume_swot_analyser = get_agents(llm)

research, resume_swot_analysis = get_tasks(llm, job_desire, resume)

# Building crew and kicking it off
crew = Crew(
    agents=[job_requirements_researcher, resume_swot_analyser],
    tasks=[research, resume_swot_analysis],
    verbose=0,
    process=Process.sequential
)

result = crew.kickoff()

with open("resume-report/result.md", "w") as f:
    f.write(str(result))