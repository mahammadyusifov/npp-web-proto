# server/bbn_inference/api.py

from fastapi import APIRouter
from pydantic import BaseModel
import os
import json

from bbn_inference.sensitivity_analysis import (
    get_number_of_required_demand,
    filter_outsiders,
    get_confidence,
    demand_model_func
)
from bbn_inference.examples.example_for_composite_model import run_example_for_composite_model
from bbn_inference.bbn_utils import run_sampling

router = APIRouter()

class AnalysisInput(BaseModel):
    pfd_goal: float
    confidence_goal: float
    failures: int

@router.post("/full-analysis")
def run_full_analysis(input: AnalysisInput):
    pfd_goal = input.pfd_goal
    confidence_goal = input.confidence_goal
    failures = input.failures

    trace = run_example_for_composite_model()

    demand_required = get_number_of_required_demand(trace, pfd_goal=pfd_goal, confidence_goal=confidence_goal)
    filtered_pfd_trace = filter_outsiders(trace.posterior["PFD"])
    prior_mean = trace.posterior["PFD"].mean().item()
    prior_conf = get_confidence(data=trace.posterior["PFD"], goal=pfd_goal)

    # 반복 분석
    demand_list = list(range(500, int(demand_required) + 500, 500))
    pfd_output = []
    for demand in demand_list:
        model = demand_model_func(demand=demand, observed_failures=failures, pfd_trace=filtered_pfd_trace)
        updated_trace = run_sampling(model, draws=2000, tune=500)
        updated_mean = updated_trace.posterior["pfd_prior"].mean().item()
        conf = get_confidence(data=updated_trace.posterior["pfd_prior"], goal=pfd_goal)
        pfd_output.append([str(demand), updated_mean])

    result_json = {
        "input": {
            "parameter": {
                "test_count": demand_required,
                "target": pfd_goal,
                "prior": {
                    "distribution": "trace",
                    "mean": prior_mean,
                    "confidence": prior_conf
                },
                "observed_failures": failures
            }
        },
        "output": {
            "pfd": pfd_output,
            "confidence": conf
        }
    }

    # 저장
    result_dir = "result_json"
    os.makedirs(result_dir, exist_ok=True)
    filepath = os.path.join(result_dir, "updated_pfd_result.json")
    with open(filepath, "w") as f:
        json.dump(result_json, f, indent=2)

    return {
        "message": "Analysis complete",
        "filepath": filepath,
        "result": result_json
    }