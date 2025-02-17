from pydantic import BaseModel
from typing import List

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
    tech_stack: List[str]
    location: Location
    company: Company
