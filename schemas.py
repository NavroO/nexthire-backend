from pydantic import BaseModel, EmailStr
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

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

# Schemat dla tokena (przy logowaniu)
class Token(BaseModel):
    access_token: str
    token_type: str
