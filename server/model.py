# server/model.py

from pydantic import BaseModel
from sqlalchemy import Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class TbMember(Base):
    __tablename__ = "member"

    idx = Column(Integer, primary_key=True, index=True, autoincrement=True, comment="index")
    user_email = Column(String(100), primary_key=True, index=True, comment="email")
    user_password = Column(String(100), nullable=False, comment="password")


class UserBase(BaseModel):
    user_email: str
    user_password: str


class UserCreate(UserBase):
    pass


class User(UserBase):
    idx: int

    class Config:
        orm_mode = True