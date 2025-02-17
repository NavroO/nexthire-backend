from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from services.job_service import create_job, get_jobs, get_job, update_job, delete_job
from schemas.job import JobPostCreate
from database import get_db

router = APIRouter()

@router.post("/jobs/", status_code=status.HTTP_201_CREATED)
def create_job_endpoint(job: JobPostCreate, db: Session = Depends(get_db)):
    return create_job(db=db, job=job)

@router.get("/jobs/", response_model=List[JobPostCreate])
def get_jobs_endpoint(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return get_jobs(db=db, skip=skip, limit=limit)

@router.get("/jobs/{job_id}", response_model=JobPostCreate)
def get_job_endpoint(job_id: int, db: Session = Depends(get_db)):
    job = get_job(db=db, job_id=job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.put("/jobs/{job_id}")
def update_job_endpoint(job_id: int, job_data: JobPostCreate, db: Session = Depends(get_db)):
    job = update_job(db=db, job_id=job_id, job_data=job_data)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.delete("/jobs/{job_id}")
def delete_job_endpoint(job_id: int, db: Session = Depends(get_db)):
    job = delete_job(db=db, job_id=job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return {"message": "Job deleted successfully"}
