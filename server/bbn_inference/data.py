from .bbn_data_model import State, BayesianData

def generic_data():
    genericData = BayesianData()
    genericData.set_function_point(50)
    for key in genericData.attr_states.keys():
        genericData.attr_states[key] = State.Medium
    return genericData

def nrc_report_data():
    nrcReportData = BayesianData()
    nrcReportData.set_function_point(56)

    nrcReportData.attr_states["SR_SDP_state"] = State.Medium
    nrcReportData.attr_states["SR_CD_state"] = State.Medium
    nrcReportData.attr_states["SR_SRS_state"] = State.Medium
    nrcReportData.attr_states["SR_TA_state"] = State.Medium
    nrcReportData.attr_states["SR_CA_state"] = State.Low
    nrcReportData.attr_states["SR_HA_state"] = State.Medium
    nrcReportData.attr_states["SR_SA_state"] = State.Low
    nrcReportData.attr_states["SR_RA_state"] = State.Low
    nrcReportData.attr_states["SR_SQTPG_state"] = State.Medium
    nrcReportData.attr_states["SR_SATPG_state"] = State.Medium
    nrcReportData.attr_states["SR_CM_state"] = State.Medium
    nrcReportData.attr_states["SR_RaA_state"] = State.Medium

    nrcReportData.attr_states["SR_SVVP_state"] = State.Medium
    nrcReportData.attr_states["SR_CDE_state"] = State.Medium
    nrcReportData.attr_states["SR_HRAA_state"] = State.Low
    nrcReportData.attr_states["SR_SRE_state"] = State.Medium
    nrcReportData.attr_states["SR_IAVV_state"] = State.Medium
    nrcReportData.attr_states["SR_TAVV_state"] = State.Medium
    nrcReportData.attr_states["SR_CAVV_state"] = State.Low
    nrcReportData.attr_states["SR_HAVV_state"] = State.Low
    nrcReportData.attr_states["SR_SAVV_state"] = State.Low
    nrcReportData.attr_states["SR_RAVV_state"] = State.Low
    nrcReportData.attr_states["SR_VVSQTPG_state"] = State.Low
    nrcReportData.attr_states["SR_VVSATPG_state"] = State.Low
    nrcReportData.attr_states["SR_CMA_state"] = State.Medium
    nrcReportData.attr_states["SR_RaAVV_state"] = State.Low
    nrcReportData.attr_states["SR_VVASRG_state"] = State.Medium

    nrcReportData.attr_states["SD_SAD_state"] = State.Medium
    nrcReportData.attr_states["SD_SDD_state"] = State.Medium
    nrcReportData.attr_states["SD_TA_state"] = State.Medium
    nrcReportData.attr_states["SD_CA_state"] = State.Low
    nrcReportData.attr_states["SD_HA_state"] = State.Medium
    nrcReportData.attr_states["SD_SA_state"] = State.Low
    nrcReportData.attr_states["SD_RA_state"] = State.Low
    nrcReportData.attr_states["SD_SCTPG_state"] = State.Medium
    nrcReportData.attr_states["SD_SITPG_state"] = State.Medium
    nrcReportData.attr_states["SD_SCTDG_state"] = State.Medium
    nrcReportData.attr_states["SD_SITDG_state"] = State.Medium
    nrcReportData.attr_states["SD_SQTDG_state"] = State.Medium
    nrcReportData.attr_states["SD_SATDG_state"] = State.Medium
    nrcReportData.attr_states["SD_CM_state"] = State.Medium
    nrcReportData.attr_states["SD_RaA_state"] = State.Medium

    nrcReportData.attr_states["SD_DE_state"] = State.Medium
    nrcReportData.attr_states["SD_IAVV_state"] = State.Medium
    nrcReportData.attr_states["SD_TAVV_state"] = State.Medium
    nrcReportData.attr_states["SD_CAVV_state"] = State.Low
    nrcReportData.attr_states["SD_HAVV_state"] = State.Low
    nrcReportData.attr_states["SD_SAVV_state"] = State.Low
    nrcReportData.attr_states["SD_RAVV_state"] = State.Low
    nrcReportData.attr_states["SD_VVSCTPG_state"] = State.Low
    nrcReportData.attr_states["SD_VVSITPG_state"] = State.Low
    nrcReportData.attr_states["SD_VVSCTDG_state"] = State.Low
    nrcReportData.attr_states["SD_VVSITDG_state"] = State.Low
    nrcReportData.attr_states["SD_VVSQTDG_state"] = State.Low
    nrcReportData.attr_states["SD_VVSATDG_state"] = State.Low
    nrcReportData.attr_states["SD_CMVV_state"] = State.Medium
    nrcReportData.attr_states["SD_RaAVV_state"] = State.Medium
    nrcReportData.attr_states["SD_VVASRG_state"] = State.Medium

    nrcReportData.attr_states["IM_SCaSCDG_state"] = State.Low
    nrcReportData.attr_states["IM_TA_state"] = State.Medium
    nrcReportData.attr_states["IM_CA_state"] = State.Low
    nrcReportData.attr_states["IM_HA_state"] = State.Low
    nrcReportData.attr_states["IM_SA_state"] = State.Low
    nrcReportData.attr_states["IM_RA_state"] = State.Low
    nrcReportData.attr_states["IM_CTCG_state"] = State.Medium
    nrcReportData.attr_states["IM_SITCG_state"] = State.Medium
    nrcReportData.attr_states["IM_SQTCG_state"] = State.Medium
    nrcReportData.attr_states["IM_SATCG_state"] = State.Medium
    nrcReportData.attr_states["IM_SCTPG_state"] = State.Medium
    nrcReportData.attr_states["IM_SITPG_state"] = State.Medium
    nrcReportData.attr_states["IM_SQTPG_state"] = State.Medium
    nrcReportData.attr_states["IM_CM_state"] = State.Medium
    nrcReportData.attr_states["IM_RaA_state"] = State.Medium
    nrcReportData.attr_states["IM_SCTE_state"] = State.Medium

    nrcReportData.attr_states["IM_SCaSCDE_state"] = State.Low
    nrcReportData.attr_states["IM_IAVV_state"] = State.Medium
    nrcReportData.attr_states["IM_TAVV_state"] = State.Medium
    nrcReportData.attr_states["IM_CAVV_state"] = State.Low
    nrcReportData.attr_states["IM_HAVV_state"] = State.Low
    nrcReportData.attr_states["IM_SAVV_state"] = State.Low
    nrcReportData.attr_states["IM_RAVV_state"] = State.Low
    nrcReportData.attr_states["IM_VVSCTCG_state"] = State.Low
    nrcReportData.attr_states["IM_VVSITCG_state"] = State.Low
    nrcReportData.attr_states["IM_VVSQTCG_state"] = State.Low
    nrcReportData.attr_states["IM_VVSATCG_state"] = State.Low
    nrcReportData.attr_states["IM_VVSCTPG_state"] = State.Low
    nrcReportData.attr_states["IM_VVSITPG_state"] = State.Low
    nrcReportData.attr_states["IM_VVSQTPG_state"] = State.Low
    nrcReportData.attr_states["IM_VVSCTE_state"] = State.Low
    nrcReportData.attr_states["IM_CMVV_state"] = State.Medium
    nrcReportData.attr_states["IM_RaAVV_state"] = State.Medium
    nrcReportData.attr_states["IM_VVASRG_state"] = State.Low

    nrcReportData.attr_states["ST_SITE_state"] = State.Medium
    nrcReportData.attr_states["ST_SQTE_state"] = State.Medium
    nrcReportData.attr_states["ST_SAPG_state"] = State.Medium
    nrcReportData.attr_states["ST_SATE_state"] = State.Medium
    nrcReportData.attr_states["ST_TA_state"] = State.Medium
    nrcReportData.attr_states["ST_HA_state"] = State.Low
    nrcReportData.attr_states["ST_SA_state"] = State.Low
    nrcReportData.attr_states["ST_RA_state"] = State.Low
    nrcReportData.attr_states["ST_CM_state"] = State.Medium
    nrcReportData.attr_states["ST_RaA_state"] = State.Medium

    nrcReportData.attr_states["ST_VVSITE_state"] = State.Low
    nrcReportData.attr_states["ST_VVSQTE_state"] = State.Low
    nrcReportData.attr_states["ST_VVSAPG_state"] = State.Low
    nrcReportData.attr_states["ST_VVSATE_state"] = State.Low
    nrcReportData.attr_states["ST_TAVV_state"] = State.Low
    nrcReportData.attr_states["ST_HAVV_state"] = State.Low
    nrcReportData.attr_states["ST_SAVV_state"] = State.Low
    nrcReportData.attr_states["ST_RAVV_state"] = State.Low
    nrcReportData.attr_states["ST_CMVV_state"] = State.Low
    nrcReportData.attr_states["ST_RaAVV_state"] = State.Low
    nrcReportData.attr_states["ST_VVASRG_state"] = State.Low

    nrcReportData.attr_states["IC_IPG_state"] = State.Medium
    nrcReportData.attr_states["IC_IaC_state"] = State.Medium
    nrcReportData.attr_states["IC_HA_state"] = State.Medium
    nrcReportData.attr_states["IC_SA_state"] = State.Medium
    nrcReportData.attr_states["IC_RA_state"] = State.Medium

    nrcReportData.attr_states["IC_ICAVV_state"] = State.Medium
    nrcReportData.attr_states["IC_ICVV_state"] = State.Medium
    nrcReportData.attr_states["IC_HAVV_state"] = State.Medium
    nrcReportData.attr_states["IC_SAVV_state"] = State.Medium
    nrcReportData.attr_states["IC_RAVV_state"] = State.Medium
    nrcReportData.attr_states["IC_VVASRG_state"] = State.Medium
    nrcReportData.attr_states["IC_VVFRG_state"] = State.Medium
    return nrcReportData
