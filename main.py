from fastapi import FastAPI
from routes import users
from routes import job_post

app = FastAPI()

app.include_router(job_post.router, prefix="/job_post", tags=["Job Posts"])
app.include_router(users.router, prefix="/users", tags=["Users"])

@app.get("/")
def home():
    return {"message": "Welcome to the API"}
