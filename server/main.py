# main.py

from fastapi import FastAPI, HTTPException, Depends, status
from db import MySQLEngine
from model import UserCreate, User, TbMember
from sqlalchemy.orm import Session
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import urllib3

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

# Dependency to get the database session
def get_db():
    db = MySQLEngine()
    session = db.session()
    try:
        yield session
    finally:
        session.close()
        db.dispose()


# Response and Error models
class SuccessResponse(BaseModel):
    success: bool


class ErrorResponse(BaseModel):
    code: str
    msg: str


@app.post("/auth/login", response_model=SuccessResponse)
def login(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(TbMember).filter(TbMember.user_email == user.user_email,
                                        TbMember.user_password == user.user_password).first()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=ErrorResponse(code="UNAUTHORIZED", msg="Incorrect email or password")
        )

    return {"success": True}


# Custom exception handler for more structured error responses
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc: HTTPException):
    return {
        "code": str(exc.status_code),
        "msg": exc.detail
    }
