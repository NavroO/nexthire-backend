from fastapi import FastAPI
from routes import job_post

app = FastAPI()

app.include_router(job_post.router, prefix="/job_post", tags=["Job Posts"])

@app.get("/")
def home():
    return {"message": "Welcome to the API"}
