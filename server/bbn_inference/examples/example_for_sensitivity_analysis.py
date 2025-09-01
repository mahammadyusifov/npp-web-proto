# bbn_runner.py
from __future__ import annotations

import os
import json
from typing import Dict, Any, List, Tuple

from bbn_inference.sensitivity_analysis import (
    get_number_of_required_demand,
    filter_outsiders,
    get_confidence,
    demand_model_func,
)
from bbn_inference.examples.example_for_composite_model import run_example_for_composite_model
from bbn_inference.bbn_utils import run_sampling


# 1) Number of Tests 계산 (API: /sensitivity-analysis 와 동일 구조)
def run_sensitivity_analysis(pfd_goal: float, confidence_goal: float) -> Dict[str, Any]:
    """
    입력: pfd_goal (예: 1e-4), confidence_goal (예: 0.95)
    출력: num_tests, prior_mean, prior_confidence
    """
    trace = run_example_for_composite_model()

    num_tests = int(
        get_number_of_required_demand(
            trace, pfd_goal=pfd_goal, confidence_goal=confidence_goal
        )
    )
    prior_mean = trace.posterior["PFD"].mean().item()
    prior_conf = get_confidence(data=trace.posterior["PFD"], goal=pfd_goal)

    # === 터미널 출력 ===
    print("==== Sensitivity Analysis Result ====")
    print(f"PFD goal: {pfd_goal}")
    print(f"Confidence goal: {confidence_goal}")
    print(f"Calculated number of required tests: {num_tests}")
    print(f"Mean of prior PFD: {prior_mean}")
    print(f"Confidence of prior PFD (vs goal): {prior_conf}")
    print("=====================================")

    return {
        "num_tests": num_tests,
        "prior_mean": prior_mean,
        "prior_confidence": prior_conf,
    }


# 2) 관측 결과로 PFD 업데이트 (API: /update-pfd 와 동일 구조)
def run_update_pfd(
    pfd_goal: float,
    demand: int,
    failures: int,
    *,
    draws: int = 2000,
    tune: int = 500,
) -> Dict[str, Any]:
    """
    입력: pfd_goal, demand(시험수), failures(실패수)
    출력: updated_pfd, updated_confidence
    """
    trace = run_example_for_composite_model()
    filtered_pfd_trace = filter_outsiders(trace.posterior["PFD"])

    model = demand_model_func(
        demand=demand, observed_failures=failures, pfd_trace=filtered_pfd_trace
    )
    updated_trace = run_sampling(model, draws=draws, tune=tune)

    updated_pfd_mean = updated_trace.posterior["pfd_prior"].mean().item()
    updated_conf = get_confidence(
        data=updated_trace.posterior["pfd_prior"], goal=pfd_goal
    )

    # === 여기부터 터미널 로그 출력 ===
    print("==== Update PFD Result ====")
    print("Mean of prior PFD:", trace.posterior["PFD"].mean().item())
    print("Mean of updated PFD:", updated_pfd_mean)
    print("PFD goal:", pfd_goal)
    print(
        "Before testing, confidence level:",
        get_confidence(data=trace.posterior["PFD"], goal=pfd_goal),
    )
    print(f"Testing results: #test cases: {demand}, #failures: {failures}")
    print("After testing, confidence level:", updated_conf)
    print("============================")

    return {
        "updated_pfd": updated_pfd_mean,
        "updated_confidence": updated_conf,
    }

# 3) 전체 분석 + JSON 저장 (API: /full-analysis 와 동일 구조)
def run_full_analysis(
    pfd_goal: float,
    confidence_goal: float,
    failures: int,
    *,
    step: int = 500,
    draws: int = 2000,
    tune: int = 500,
    save_dir: str = "result_json",
    save_name: str = "updated_pfd_result.json",
) -> Tuple[str, Dict[str, Any]]:
    """
    입력: pfd_goal, confidence_goal, failures
    옵션: step(수요 증가 간격), draws/tune(PMC 샘플링 파라미터), save_dir/save_name(저장경로)
    출력: (filepath, result_json)
    """
    trace = run_example_for_composite_model()

    # 1) 필요한 시험 수 계산
    demand_required = int(
        get_number_of_required_demand(
            trace, pfd_goal=pfd_goal, confidence_goal=confidence_goal
        )
    )

    # 2) 여러 demand에서 업데이트(예: 500 단위)
    filtered_pfd_trace = filter_outsiders(trace.posterior["PFD"])
    prior_mean = trace.posterior["PFD"].mean().item()
    prior_conf = get_confidence(data=trace.posterior["PFD"], goal=pfd_goal)

    demand_list = list(range(step, demand_required + step, step))
    pfd_output: List[List[str | float]] = []
    last_conf = None

    for demand in demand_list:
        model = demand_model_func(
            demand=demand, observed_failures=failures, pfd_trace=filtered_pfd_trace
        )
        updated_trace = run_sampling(model, draws=draws, tune=tune)
        updated_mean = updated_trace.posterior["pfd_prior"].mean().item()
        last_conf = get_confidence(
            data=updated_trace.posterior["pfd_prior"], goal=pfd_goal
        )
        pfd_output.append([str(demand), updated_mean])

    result_json: Dict[str, Any] = {
        "input": {
            "parameter": {
                "test_count": demand_required,
                "target": pfd_goal,
                "prior": {
                    "distribution": "trace",
                    "mean": prior_mean,
                    "confidence": prior_conf,
                },
                "observed_failures": failures,
            }
        },
        "output": {"pfd": pfd_output, "confidence": last_conf},
    }

    os.makedirs(save_dir, exist_ok=True)
    filepath = os.path.join(save_dir, save_name)
    with open(filepath, "w") as f:
        json.dump(result_json, f, indent=2)

    return filepath, result_json


