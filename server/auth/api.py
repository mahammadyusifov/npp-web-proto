from comm.db import get_db_auto_close
from comm.model import TbMember, UserBase
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from utils.func import ResponseHandler

router = APIRouter(prefix="/auth")


@router.post("/login")
def user_login(user: UserBase, db: Session = Depends(get_db_auto_close)):
    response_handler = ResponseHandler()
    existing_user = (
        db.query(TbMember).filter(TbMember.user_email == user.email and TbMember.user_password == user.password).first()
    )

    if existing_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    response_handler.add_data({"user_email": user.email})

    return response_handler.get_response()


@router.post("/register")
def user_register(user: UserBase, db: Session = Depends(get_db_auto_close)):
    response_handler = ResponseHandler()
    existing_user = db.query(TbMember).filter(TbMember.user_email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    try:
        new_user = TbMember(user_email=user.email, user_password=user.password)
        db.add(new_user)
        db.commit()
        response_handler.add_data({"user_email": new_user.user_email})
    except Exception as e:
        response_handler.set_error_message(str(e))
        if db:
            db.rollback()

    return response_handler.get_response()
