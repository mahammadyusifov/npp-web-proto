# server/db.py

from sqlalchemy import *
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os


load_dotenv()

DB_URL = f'mysql+pymysql://{os.getenv("DB_USER")}:{os.getenv("DB_PW")}@127.0.0.1:3306/{os.getenv("DB_NAME")}'


class MySQLEngine:
    def __init__(self):
        self.engine = create_engine(DB_URL, pool_recycle=500)

    def session(self):
        _session = sessionmaker(bind=self.engine)
        session = _session()
        return session

    def dispose(self):
        self.engine.dispose()

    def connection(self):
        conn = self.engine.connect()
        return conn
