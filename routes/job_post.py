from fastapi import APIRouter
from schemas import JobPost

router = APIRouter()

job_posts = [
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

@router.get("/")
def read_root():
    return job_posts

@router.get("/{job_post_id}")
def read_job_post(job_post_id: int):
    return {"job_post_id": job_post_id}

@router.post("/")
def create_job_post(job_post: JobPost):
    job_posts.append(job_post.dict())
    return job_post
