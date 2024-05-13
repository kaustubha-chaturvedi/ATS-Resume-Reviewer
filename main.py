import os
import uuid
from fastapi import FastAPI, UploadFile, File, Form, BackgroundTasks
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from crewai import Crew, Process
from langchain_groq import ChatGroq
from tasks import get_tasks, get_agents
from utils import read_all_pdf_pages
import uvicorn

# api_server.py

app = FastAPI()

# Configuration
os.environ["SERPER_API_KEY"] = os.getenv("SERPER_API_KEY")
os.environ["GROQ_API_KEY"] = os.getenv("GROQ_API_KEY")

# In-memory storage for job status and results
jobs = {}

class JobStatus(BaseModel):
    status: str
    result: str = None

@app.post("/upload/")
async def upload_and_process_resume(background_tasks: BackgroundTasks, job_desire: str = Form(...), file: UploadFile = File(...)):
    job_id = str(uuid.uuid4())
    jobs[job_id] = JobStatus(status="processing")
    
    background_tasks.add_task(run_analysis, job_id, job_desire, file)
    
    return {"job_id": job_id}

@app.get("/job_status/{job_id}")
async def job_status(job_id: str):
    if job_id in jobs:
        return jobs[job_id]
    else:
        return JSONResponse(status_code=404, content={"message": "Job not found"})

def run_analysis(job_id: str, job_desire: str, file: UploadFile):
    print(f"Processing job {job_id}")
    try:
        # Load the llm
        llm = ChatGroq(model="llama3-8b-8192", temperature=1, max_tokens=1024)

        # Provided the inputs
        resume = read_all_pdf_pages(file.file)

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
        jobs[job_id] = JobStatus(status="completed", result=str(result))
    except Exception as e:
        jobs[job_id] = JobStatus(status="failed", result=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
