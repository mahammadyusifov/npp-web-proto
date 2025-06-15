from fastapi import APIRouter
from bbn_inference.examples.example_for_sensitivity_analysis import run_full_analysis

router = APIRouter()

@router.get("/run-analysis")
def run_analysis():
    run_full_analysis()
    return {"status": "Analysis completed!"}

@router.get("/bbn/run")
def run_model():
    run_full_analysis()
    return {"status": "done"}