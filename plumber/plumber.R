# api.R
library("plumber")
library("jsonlite")
# library("R2WinBUGS")
library("R2OpenBUGS")

#* Estimate using WinBUGS
#* @post /content/common
#* @param req
function(req) {
  print(">>>>>> api call")
  parsed_data <- fromJSON(req$postBody, flatten = TRUE)

  cur_dir <- getwd()
  model_dir <- "/R2WinBUGS_Combined_Model.txt"
  concat_dir <- paste(cur_dir, model_dir, sep = "")
  model.file <- concat_dir
  source("data.R")

  parameters <- c(
    "SR_DevH_post",
    "SR_DevM_post",
    "SR_DevL_post",
    "SR_VVH_post",
    "SR_VVM_post",
    "SR_VVL_post",
    "SR_Total_Remained_Defect",
    "SR_Defect_introduced_in_current",
    "SD_DevH_post",
    "SD_DevM_post",
    "SD_DevL_post",
    "SD_VVH_post",
    "SD_VVM_post",
    "SD_VVL_post",
    "SD_Total_Remained_Defect",
    "SD_Defect_introduced_in_current",
    "IM_DevH_post",
    "IM_DevM_post",
    "IM_DevL_post",
    "IM_VVH_post",
    "IM_VVM_post",
    "IM_VVL_post",
    "IM_Total_Remained_Defect",
    "IM_Defect_introduced_in_current",
    "ST_DevH_post",
    "ST_DevM_post",
    "ST_DevL_post",
    "ST_VVH_post",
    "ST_VVM_post",
    "ST_VVL_post",
    "ST_Total_Remained_Defect",
    "ST_Defect_introduced_in_current",
    "IC_DevH_post",
    "IC_DevM_post",
    "IC_DevL_post",
    "IC_VVH_post",
    "IC_VVM_post",
    "IC_VVL_post",
    "IC_Total_Remained_Defect",
    "IC_Defect_introduced_in_current",
    "generic_FSD",
    "PFD"
  )


  FP <- as.numeric(parsed_data$`FP`$`FP Input`)
  data$SR_FP <- FP
  data$SD_FP <- FP
  data$IM_FP <- FP
  data$ST_FP <- FP
  data$IC_FP <- FP

  data$SR_SDP_state <- as.numeric(parsed_data$`Requirement Dev`$`Software Development Planning`)
  data$SR_CD_state <- as.numeric(parsed_data$`Requirement Dev`$`Development of Concept`)
  data$SR_SRS_state <- as.numeric(parsed_data$`Requirement Dev`$`Development of SRS`)
  data$SR_TA_state <- as.numeric(parsed_data$`Requirement Dev`$`Traceability Analysis`)
  data$SR_CA_state <- as.numeric(parsed_data$`Requirement Dev`$`Criticality Analysis`)
  data$SR_HA_state <- as.numeric(parsed_data$`Requirement Dev`$`Hazard Analysis`)
  data$SR_SA_state <- as.numeric(parsed_data$`Requirement Dev`$`Security Analysis`)
  data$SR_RA_state <- as.numeric(parsed_data$`Requirement Dev`$`Risk Analysis`)
  data$SR_SQTPG_state <- as.numeric(parsed_data$`Requirement Dev`$`System Sofware Quanlification`)
  data$SR_SATPG_state <- as.numeric(parsed_data$`Requirement Dev`$`System Software Acceptance`)
  data$SR_CM_state <- as.numeric(parsed_data$`Requirement Dev`$`Configuration Management`)
  data$SR_RaA_state <- as.numeric(parsed_data$`Requirement Dev`$`Review and Audit`)

  data$SR_SVVP_state <- as.numeric(parsed_data$`Requirement V&V`$`Software Planning`)
  data$SR_CDE_state <- as.numeric(parsed_data$`Requirement V&V`$`Concpet Documentation Evaluation`)
  data$SR_HRAA_state <- as.numeric(parsed_data$`Requirement V&V`$`Sofware User Requirement Allocation Analysis`)
  data$SR_SRE_state <- as.numeric(parsed_data$`Requirement V&V`$`Sofware Requirement Evaluation`)
  data$SR_IAVV_state <- as.numeric(parsed_data$`Requirement V&V`$`Interface Analysis`)
  data$SR_TAVV_state <- as.numeric(parsed_data$`Requirement V&V`$`Traceability Analysis`)
  data$SR_CAVV_state <- as.numeric(parsed_data$`Requirement V&V`$`Criticality Analysis`)
  data$SR_HAVV_state <- as.numeric(parsed_data$`Requirement V&V`$`Hazard Analysis`)
  data$SR_SAVV_state <- as.numeric(parsed_data$`Requirement V&V`$`Security Analysis`)
  data$SR_RAVV_state <- as.numeric(parsed_data$`Requirement V&V`$`Risk Analysis`)
  data$SR_VVSQTPG_state <- as.numeric(parsed_data$`Requirement V&V`$`System Sofware Quanlification`)
  data$SR_VVSATPG_state <- as.numeric(parsed_data$`Requirement V&V`$`System Software Acceptance`)
  data$SR_CMA_state <- as.numeric(parsed_data$`Requirement V&V`$`Configuration Management`)
  data$SR_RaAVV_state <- as.numeric(parsed_data$`Requirement V&V`$`Review and Audit`)
  data$SR_VVASRG_state <- as.numeric(parsed_data$`Requirement V&V`$`Acitivity Summary Report`)

  data$SD_SAD_state <- as.numeric(parsed_data$`Design Dev`$`Development Sofware Architecture`)
  data$SD_SDD_state <- as.numeric(parsed_data$`Design Dev`$`Development Sofware Design`)
  data$SD_TA_state <- as.numeric(parsed_data$`Design Dev`$`Traceability Analysis`)
  data$SD_CA_state <- as.numeric(parsed_data$`Design Dev`$`Criticality Analysis`)
  data$SD_HA_state <- as.numeric(parsed_data$`Design Dev`$`Hazard Analysis`)
  data$SD_SA_state <- as.numeric(parsed_data$`Design Dev`$`Security Analysis`)
  data$SD_RA_state <- as.numeric(parsed_data$`Design Dev`$`Risk Analysis`)
  data$SD_SCTPG_state <- as.numeric(parsed_data$`Design Dev`$`Sofware Component Test Plan`)
  data$SD_SITPG_state <- as.numeric(parsed_data$`Design Dev`$`Software Integration Test Plan`)
  data$SD_SCTDG_state <- as.numeric(parsed_data$`Design Dev`$`Software Component Test Design`)
  data$SD_SITDG_state <- as.numeric(parsed_data$`Design Dev`$`Software Integration Test Design`)
  data$SD_SQTDG_state <- as.numeric(parsed_data$`Design Dev`$`System Software Quanlification`)
  data$SD_SATDG_state <- as.numeric(parsed_data$`Design Dev`$`System Software Acceptance`)
  data$SD_CM_state <- as.numeric(parsed_data$`Design Dev`$`Configuration Management`)
  data$SD_RaA_state <- as.numeric(parsed_data$`Design Dev`$`Review and Audit`)

  data$SD_DE_state <- as.numeric(parsed_data$`Design V&V`$`Design Evaluation`)
  data$SD_IAVV_state <- as.numeric(parsed_data$`Design V&V`$`Interface Analysis`)
  data$SD_TAVV_state <- as.numeric(parsed_data$`Design V&V`$`Traceability Analysis`)
  data$SD_CAVV_state <- as.numeric(parsed_data$`Design V&V`$`Criticality Analysis`)
  data$SD_HAVV_state <- as.numeric(parsed_data$`Design V&V`$`Hazard Analysis`)
  data$SD_SAVV_state <- as.numeric(parsed_data$`Design V&V`$`Security Analysis`)
  data$SD_RAVV_state <- as.numeric(parsed_data$`Design V&V`$`Risk Analysis`)
  data$SD_VVSCTPG_state <- as.numeric(parsed_data$`Design V&V`$`Software Component Test Plan`)
  data$SD_VVSITPG_state <- as.numeric(parsed_data$`Design V&V`$`Software Integration Test Plan`)
  data$SD_VVSCTDG_state <- as.numeric(parsed_data$`Design V&V`$`Software Component Test Design`)
  data$SD_VVSITDG_state <- as.numeric(parsed_data$`Design V&V`$`Software Integration Test Design`)
  data$SD_VVSQTDG_state <- as.numeric(parsed_data$`Design V&V`$`System Sofware Quanlification`)
  data$SD_VVSATDG_state <- as.numeric(parsed_data$`Design V&V`$`System Software Acceptance`)
  data$SD_CMVV_state <- as.numeric(parsed_data$`Design V&V`$`Configuration Management`)
  data$SD_RaAVV_state <- as.numeric(parsed_data$`Design V&V`$`Review and Audit`)
  data$SD_VVASRG_state <- as.numeric(parsed_data$`Design V&V`$`Acitivity Summary Report`)

  data$IM_SCaSCDG_state <- as.numeric(parsed_data$`Implementation Dev`$`Source Code Document`)
  data$IM_TA_state <- as.numeric(parsed_data$`Implementation Dev`$`Traceability Analysis`)
  data$IM_CA_state <- as.numeric(parsed_data$`Implementation Dev`$`Criticality Analysis`)
  data$IM_HA_state <- as.numeric(parsed_data$`Implementation Dev`$`Hazard Analysis`)
  data$IM_SA_state <- as.numeric(parsed_data$`Implementation Dev`$`Security Analysis`)
  data$IM_RA_state <- as.numeric(parsed_data$`Implementation Dev`$`Risk Analysis`)
  data$IM_CTCG_state <- as.numeric(parsed_data$`Implementation Dev`$`Sofware Component Test Case`)
  data$IM_SITCG_state <- as.numeric(parsed_data$`Implementation Dev`$`Software Integration Test Case`)
  data$IM_SQTCG_state <- as.numeric(parsed_data$`Implementation Dev`$`Sofware Acceptance Test Case`)
  data$IM_SATCG_state <- as.numeric(parsed_data$`Implementation Dev`$`Sofware Acceptance Test Case`)
  data$IM_SCTPG_state <- as.numeric(parsed_data$`Implementation Dev`$`Software Component Test Procedure`)
  data$IM_SITPG_state <- as.numeric(parsed_data$`Implementation Dev`$`Software Integration Test Procedure`)
  data$IM_SQTPG_state <- as.numeric(parsed_data$`Implementation Dev`$`System Software Quanlification`)
  data$IM_CM_state <- as.numeric(parsed_data$`Implementation Dev`$`Configuration Management`)
  data$IM_RaA_state <- as.numeric(parsed_data$`Implementation Dev`$`Review and Audit`)
  data$IM_SCTE_state <- as.numeric(parsed_data$`Implementation Dev`$`System Software Component Test Execution`)

  data$IM_SCaSCDE_state <- as.numeric(parsed_data$`Implementation V&V`$`Source Code Document`)
  data$IM_IAVV_state <- as.numeric(parsed_data$`Implementation V&V`$`Interface Analysis`)
  data$IM_TAVV_state <- as.numeric(parsed_data$`Implementation V&V`$`Traceability Analysis`)
  data$IM_CAVV_state <- as.numeric(parsed_data$`Implementation V&V`$`Criticality Analysis`)
  data$IM_HAVV_state <- as.numeric(parsed_data$`Implementation V&V`$`Hazard Analysis`)
  data$IM_SAVV_state <- as.numeric(parsed_data$`Implementation V&V`$`Security Analysis`)
  data$IM_RAVV_state <- as.numeric(parsed_data$`Implementation V&V`$`Risk Analysis`)
  data$IM_VVSCTCG_state <- as.numeric(parsed_data$`Implementation V&V`$`Sofware Component Test Case`)
  data$IM_VVSITCG_state <- as.numeric(parsed_data$`Implementation V&V`$`Software Integration Test Case`)
  data$IM_VVSQTCG_state <- as.numeric(parsed_data$`Implementation V&V`$`Software Qualification Test Case`)
  data$IM_VVSATCG_state <- as.numeric(parsed_data$`Implementation V&V`$`Sofware Acceptance Test Case`)
  data$IM_VVSCTPG_state <- as.numeric(parsed_data$`Implementation V&V`$`Software Component Test Procedure`)
  data$IM_VVSITPG_state <- as.numeric(parsed_data$`Implementation V&V`$`Software Integration Test Procedure`)
  data$IM_VVSQTPG_state <- as.numeric(parsed_data$`Implementation V&V`$`System Software Quanlification Test Procedure`)
  data$IM_VVSCTE_state <- as.numeric(parsed_data$`Implementation V&V`$`System Software Component Test Execution`)
  data$IM_CMVV_state <- as.numeric(parsed_data$`Implementation V&V`$`Configuration Management`)
  data$IM_RaAVV_state <- as.numeric(parsed_data$`Implementation V&V`$`Review and Audit`)
  data$IM_VVASRG_state <- as.numeric(parsed_data$`Implementation V&V`$`Acitivity Summary Report`)

  data$ST_SITE_state <- as.numeric(parsed_data$`Test Dev`$`System Sofware Integration Test Execution`)
  data$ST_SQTE_state <- as.numeric(parsed_data$`Test Dev`$`System Sofware Quanlification Test Execution`)
  data$ST_SAPG_state <- as.numeric(parsed_data$`Test Dev`$`System Sofware Acceptance Procedure Generation`)
  data$ST_SATE_state <- as.numeric(parsed_data$`Test Dev`$`System Software Acceptance Test Execution`)
  data$ST_TA_state <- as.numeric(parsed_data$`Test Dev`$`Traceability Analysis`)
  data$ST_HA_state <- as.numeric(parsed_data$`Test Dev`$`Hazard Analysis`)
  data$ST_SA_state <- as.numeric(parsed_data$`Test Dev`$`Security Analysis`)
  data$ST_RA_state <- as.numeric(parsed_data$`Test Dev`$`Risk Analysis`)
  data$ST_CM_state <- as.numeric(parsed_data$`Test Dev`$`Configuration Management`)
  data$ST_RaA_state <- as.numeric(parsed_data$`Test Dev`$`Review and Audit`)

  data$ST_VVSITE_state <- as.numeric(parsed_data$`Test V&V`$`Traceability Analysis`)
  data$ST_VVSQTE_state <- as.numeric(parsed_data$`Test V&V`$`System Sofware Quanlification Test Execution`)
  data$ST_VVSAPG_state <- as.numeric(parsed_data$`Test V&V`$`System Sofware Acceptance Procedure Generation`)
  data$ST_VVSATE_state <- as.numeric(parsed_data$`Test V&V`$`System Software Acceptance Test Execution`)
  data$ST_TAVV_state <- as.numeric(parsed_data$`Test V&V`$`System Software Acceptance Test Execution`)
  data$ST_HAVV_state <- as.numeric(parsed_data$`Test V&V`$`Hazard Analysis`)
  data$ST_SAVV_state <- as.numeric(parsed_data$`Test V&V`$`Security Analysis`)
  data$ST_RAVV_state <- as.numeric(parsed_data$`Test V&V`$`Risk Analysis`)
  data$ST_CMVV_state <- as.numeric(parsed_data$`Test V&V`$`Configuration Management`)
  data$ST_RaAVV_state <- as.numeric(parsed_data$`Test V&V`$`Review and Audit`)
  data$ST_VVASRG_state <- as.numeric(parsed_data$`Test V&V`$`Acitivity Summary Report`)

  data$IC_IPG_state <- as.numeric(parsed_data$`Installlation and Checkout Dev`$`Installation Procedure Generation`)
  data$IC_IaC_state <- as.numeric(parsed_data$`Installlation and Checkout Dev`$`Installation and Checkout`)
  data$IC_HA_state <- as.numeric(parsed_data$`Installlation and Checkout Dev`$`Hazard Analysis`)
  data$IC_SA_state <- as.numeric(parsed_data$`Installlation and Checkout Dev`$`Security Analysis`)
  data$IC_RA_state <- as.numeric(parsed_data$`Installlation and Checkout Dev`$`Risk Analysis`)

  data$IC_ICAVV_state <- as.numeric(parsed_data$`Installlation and Checkout V&V`$`Installation Procedure Generation`)
  data$IC_ICVV_state <- as.numeric(parsed_data$`Installlation and Checkout V&V`$`Installation and Checkout`)
  data$IC_HAVV_state <- as.numeric(parsed_data$`Installlation and Checkout V&V`$`Hazard Analysis`)
  data$IC_SAVV_state <- as.numeric(parsed_data$`Installlation and Checkout V&V`$`Security Analysis`)
  data$IC_RAVV_state <- as.numeric(parsed_data$`Installlation and Checkout V&V`$`Risk Analysis`)
  data$IC_VVASRG_state <- as.numeric(parsed_data$`Installlation and Checkout V&V`$`Acitivity Summary Report`)
  data$IC_VVFRG_state <- as.numeric(parsed_data$`Installlation and Checkout V&V`$`Final Report Generation`)

  # print(data$SR_CD_state)

  # return(list("success"))
  nChains <- as.numeric(parsed_data$`settings`$`nChains`)
  nIter  <- as.numeric(parsed_data$`settings`$`nIter`)
  nBurnin  <- as.numeric(parsed_data$`settings`$`nBurnin`)
  nThin  <- as.numeric(parsed_data$`settings`$`nThin`)
  autoCloseWinBugs  <- as.logical(parsed_data$`settings`$`autoCloseWinBugs`)
  computeDIC  <- as.logical(parsed_data$`settings`$`computeDIC`)
  winBugsExecutableDir  <- parsed_data$`settings`$`winBugsExecutableDir`
  workingDir  <- parsed_data$`settings`$`workingDir`
  
  print("This is parsed_data[settings] : ")
  print(parsed_data$`settings`)
  model.sim <- bugs(data, inits=NULL, parameters, model.file,
                    n.chains=nChains, n.iter=nIter, n.burnin=nBurnin, debug=autoCloseWinBugs, DIC=computeDIC, n.thin=nThin,
                    OpenBUGS.pgm = "C:/Program Files (x86)/OpenBUGS/OpenBUGS323/OpenBUGS.exe",
                    useWINE = FALSE,
                    working.directory=workingDir)

  defect_introduced <- model.sim[["sims.list"]][["IC_Defect_introduced_in_current"]]

  df.defect_introduced <- data.frame(value=defect_introduced, defect.type="introduced")
  df.defect_introduced$iteration <- 1:nrow(df.defect_introduced)

  defect_remained <- model.sim[["sims.list"]][["IC_Total_Remained_Defect"]]

  df.defect_remained <- data.frame(value=defect_remained, defect.type="remained")
  df.defect_remained$iteration <- 1:nrow(df.defect_remained)

  generic_fsd <- model.sim[["sims.list"]][["generic_FSD"]]

  df.generic_fsd <- data.frame(value=generic_fsd, defect.type="generic_FSD")
  df.generic_fsd$iteration <- 1:nrow(df.generic_fsd)

  pfd <- model.sim[["sims.list"]][["PFD"]]

  df.pfd <- data.frame(value=pfd, defect.type="PFD")
  df.pfd$iteration <- 1:nrow(df.pfd)


  print(model.sim)

  print("===============================")

  print(model.sim[["mean"]])


  df <- rbind(df.defect_introduced, df.defect_remained)

  df2 <- rbind(df.generic_fsd, df.pfd)

  return(list(df, df2, model.sim[["mean"]][["IC_Total_Remained_Defect"]], model.sim[["mean"]][["PFD"]]))
}


#* Test API
#* @get /content/common2
function(req) {
  for (i in 1:10) {
    Sys.sleep(1)
    print(i)
  }

  return(list("message" = "success"))
}