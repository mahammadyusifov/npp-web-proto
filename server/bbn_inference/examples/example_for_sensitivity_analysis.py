from server.bbn_inference.sensitivity_analysis import *
from server.bbn_inference.examples.example_for_composite_model import run_example_for_composite_model
from server.bbn_inference.bbn_utils import run_sampling
import json
import os

def run_for_sensitivity_analysis():
    trace = run_example_for_composite_model()
    demands = get_number_of_required_demand(trace, pfd_goal=0.0001, confidence_goal=0.95)
    print("Number of required demands: ", demands)

def run_for_update_pfd():
    pfd_goal = 0.0001
    demand = 100000
    failures = 2

    trace = run_example_for_composite_model()
    filtered_pfd_trace = filter_outsiders(trace.posterior["PFD"])
    model = demand_model_func(demand=demand, observed_failures=failures, pfd_trace=filtered_pfd_trace)
    # TODO: might need to run sampling for a few times to stablize the results
    updated_trace = run_sampling(model, draws=19500, tune=500)

    print("Mean of prior PFD: ", trace.posterior["PFD"].mean().item())
    print("Mean of updated PFD: ", updated_trace.posterior["pfd_prior"].mean().item())
    print("PFD goal: ", pfd_goal)
    print("Before testing, confidence level: ", get_confidence(data=trace.posterior["PFD"], goal=pfd_goal))
    print(f"Testing results: #test cases: {demand}, #failures: {failures}")
    print("After testing, confidence level: ", get_confidence(data=updated_trace.posterior["pfd_prior"], goal=pfd_goal))

import os
import json

def run_full_analysis():
    # Sensitivity analysis
    trace = run_example_for_composite_model()
    pfd_goal = 0.0001
    confidence_goal = 0.95
    failures = 2

    demand_required = get_number_of_required_demand(trace, pfd_goal=pfd_goal, confidence_goal=confidence_goal)
    print("Number of required demands: ", demand_required)

    filtered_pfd_trace = filter_outsiders(trace.posterior["PFD"])
    prior_mean = trace.posterior["PFD"].mean().item()
    prior_conf = get_confidence(data=trace.posterior["PFD"], goal=pfd_goal)

    # 여러 demand 값에 대해 PFD 업데이트 반복 (500 단위로)
    demand_list = list(range(500, int(demand_required) + 500, 500))
    pfd_output = []

    for i, demand in enumerate(demand_list, start=1):
        model = demand_model_func(demand=demand, observed_failures=failures, pfd_trace=filtered_pfd_trace)
        updated_trace = run_sampling(model, draws=2000, tune=500)
        updated_mean = updated_trace.posterior["pfd_prior"].mean().item()
        conf = get_confidence(data=updated_trace.posterior["pfd_prior"], goal=pfd_goal)
        pfd_output.append([str(demand), updated_mean])

        print(f"[Demand: {demand}] PFD: {updated_mean}, Confidence: {conf}")

    # 마지막 updated confidence 사용
    last_updated_conf = conf

    # 결과 저장
    result_dir = r"C:\Users\jaehyuk\PycharmProjects\npp-web-proto\result_json"
    os.makedirs(result_dir, exist_ok=True)
    filepath = os.path.join(result_dir, "updated_pfd_result.json")

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
            "confidence": last_updated_conf
        }
    }

    with open(filepath, "w") as f:
        json.dump(result_json, f, indent=2)
    print(f"Saved result to {filepath}")


run_full_analysis()
