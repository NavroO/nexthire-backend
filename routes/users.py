import jwt
from fastapi import APIRouter, HTTPException, status, Depends
from schemas import UserCreate, User, Token
from typing import List
from datetime import timedelta, datetime
from passlib.context import CryptContext

router = APIRouter()

SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


fake_users_db: List[dict] = []
user_id_counter = 1

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.post("/register", response_model=User, status_code=status.HTTP_201_CREATED)
def register(user_create: UserCreate):
    global user_id_counter

    if any(user["email"] == user_create.email for user in fake_users_db):
        raise HTTPException(status_code=400, detail="Email już zarejestrowany")

    hashed_password = get_password_hash(user_create.password)
    user_dict = {
        "id": user_id_counter,
        "email": user_create.email,
        "hashed_password": hashed_password
    }
    fake_users_db.append(user_dict)
    user_id_counter += 1

    return {"id": user_dict["id"], "email": user_dict["email"]}

@router.post("/login", response_model=Token)
def login(user_create: UserCreate):
    user = next((u for u in fake_users_db if u["email"] == user_create.email), None)
    if not user:
        raise HTTPException(status_code=400, detail="Nieprawidłowe dane logowania")

    if not verify_password(user_create.password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Nieprawidłowe dane logowania")

    access_token = create_access_token(data={"sub": user["email"]})
    return {"access_token": access_token, "token_type": "bearer"}

