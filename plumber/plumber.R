# api.R
library("plumber")


#* @post /content/common
function(request){
  # BUGS model file location
  model.file <- "./plumber/R2WinBUGS_Combined_Model.txt"
  #file.show(model.file)

  # variable
  FP <- 56

  # node probability tables and input data
  source("data.R")

  # parameters to be monitored
  parameters <- c("SR_DevH_post","SR_DevM_post","SR_DevL_post","SR_VVH_post","SR_VVM_post","SR_VVL_post",
                  "SR_Total_Remained_Defect", "SR_Defect_introduced_in_current",
                  "SD_DevH_post","SD_DevM_post","SD_DevL_post","SD_VVH_post","SD_VVM_post","SD_VVL_post",
                  "SD_Total_Remained_Defect", "SD_Defect_introduced_in_current",
                  "IM_DevH_post","IM_DevM_post","IM_DevL_post","IM_VVH_post","IM_VVM_post","IM_VVL_post",
                  "IM_Total_Remained_Defect", "IM_Defect_introduced_in_current",
                  "ST_DevH_post","ST_DevM_post","ST_DevL_post","ST_VVH_post","ST_VVM_post","ST_VVL_post",
                  "ST_Total_Remained_Defect", "ST_Defect_introduced_in_current",
                  "IC_DevH_post","IC_DevM_post","IC_DevL_post","IC_VVH_post","IC_VVM_post","IC_VVL_post",
                  "IC_Total_Remained_Defect", "IC_Defect_introduced_in_current")

  # run WinBUGS
  model.sim <- bugs(data, inits=NULL, parameters, model.file,
                    n.chains=1, n.iter=20000, n.burnin=500, debug=FALSE, DIC=FALSE, n.thin=1,
                    bugs.directory="c:/WinBUGS14/",
                    working.directory="c:/WinBUGS14/bbn_Routput")

  # output results
  print(model.sim, digits.summary = 3)
}