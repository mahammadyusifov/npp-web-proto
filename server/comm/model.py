# server/model.py

from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class TbMember(Base):
    __tablename__ = "member"

    idx = Column(Integer, primary_key=True, index=True, autoincrement=True, comment="index")
    user_email = Column(String(100), unique=True, index=True, comment="email")
    user_password = Column(String(100), nullable=False, comment="password")


class UserBase(BaseModel):
    email: str
    password: str
