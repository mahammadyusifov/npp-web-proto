# server/main.py

import os
import urllib3
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from auth.api import router as auth_router
from content.api import router as content_router
from bbn_inference.api import router as full_analysis_router

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------ result_json 정적 제공 ------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))         # server
RESULT_DIR = os.path.join(BASE_DIR, "result_json")            # server/result_json
os.makedirs(RESULT_DIR, exist_ok=True)
app.mount("/result_json", StaticFiles(directory=RESULT_DIR), name="result_json")

# ------ 라우터 ------
app.include_router(auth_router)
app.include_router(content_router)
app.include_router(full_analysis_router, prefix="/api")
