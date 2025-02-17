from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Company(BaseModel):
  name: str

class Location(BaseModel):
  name: str

class JobPost(BaseModel):
  name: str
  description: str
  is_published: bool
  salary: int
  type_of_work: str
  experience_level: str
  employment_type: str
  operating_mode: str
  tech_stack: list[str]
  location: Location
  company: Company

job_post = [
    {
        "name": "Software Engineer",
        "description": "Python Developer",
        "is_published": True,
        "salary": 100000,
        "type_of_work": "Full-time",
        "experience_level": "Senior",
        "employment_type": "Permanent",
        "operating_mode": "Remote",
        "tech_stack": ["Python", "Django", "Flask"],
        "location": {"name": "Remote"},
        "company": {"name": "Google"}
    },
    {
        "name": "Software Engineer",
        "description": "Python Developer",
        "is_published": True,
        "salary": 100000,
        "type_of_work": "Full-time",
        "experience_level": "Senior",
        "employment_type": "Permanent",
        "operating_mode": "Remote",
        "tech_stack": ["Python", "Django", "Flask"],
        "location": {"name": "Remote"},
        "company": {"name": "Google"}
    }
]


@app.get("/")
def read_root():
  return job_post

@app.get("/job_post/{job_post_id}")
def read_job_post(job_post_id: int):
  return {"job_post_id": job_post_id}

@app.post("/job_post/")
def create_job_post(job_post: JobPost):
  return job_post


