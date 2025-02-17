from sqlalchemy.orm import Session
from models.job import JobModel
from schemas.job import JobPostCreate
from typing import List

def create_job(db: Session, job: JobPostCreate):
    db_job = JobModel(
        title=job.title,
        description=job.description,
        salary=job.salary,
        location=job.location
    )
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job

def get_jobs(db: Session, skip: int = 0, limit: int = 10) -> List[JobModel]:
    return db.query(JobModel).offset(skip).limit(limit).all()

def get_job(db: Session, job_id: int) -> JobModel:
    return db.query(JobModel).filter(JobModel.id == job_id).first()

def update_job(db: Session, job_id: int, job_data: JobPostCreate) -> JobModel:
    job = db.query(JobModel).filter(JobModel.id == job_id).first()
    if job:
        job.title = job_data.title
        job.description = job_data.description
        job.salary = job_data.salary
        job.location = job_data.location
        db.commit()
        db.refresh(job)
    return job

def delete_job(db: Session, job_id: int):
    job = db.query(JobModel).filter(JobModel.id == job_id).first()
    if job:
        db.delete(job)
        db.commit()
    return job
