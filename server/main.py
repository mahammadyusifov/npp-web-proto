# main.py

import bcrypt
import urllib3
from db import MySQLEngine
from fastapi import Depends, FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from model import TbMember
from sqlalchemy.orm import Session

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

app = FastAPI()


origins = [
    "http://127.0.0.1:3000",
    "http://0.0.0.0:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = MySQLEngine()
    return db.session()


@app.post("/auth/login")
async def login(request: Request, db: Session = Depends(get_db)):
    body = await request.json()
    email = body["email"]
    password = body["password"].encode("utf-8")

    db_user = db.query(TbMember).filter(TbMember.user_email == email).first()

    if not db_user or not bcrypt.checkpw(password, db_user.user_password.encode("utf-8")):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password")

    return {"success": True}


@app.post("/auth/register")
async def register(request: Request, db: Session = Depends(get_db)):
    body = await request.json()

    email = body["email"]
    raw_password = body["password"].encode("utf-8")

    existing_user = db.query(TbMember).filter(TbMember.user_email == email).first()

    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    # Hash the password using bcrypt
    hashed_password = bcrypt.hashpw(raw_password, bcrypt.gensalt()).decode("utf-8")

    new_user = TbMember(user_email=email, user_password=hashed_password)
    db.add(new_user)
    db.commit()

    return {"success": True, "message": "User registered successfully"}
