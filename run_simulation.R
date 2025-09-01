# ===================================================================
# Fargate Job Processor for Bayesian Simulation (v11 - AWS Integrated)
# ===================================================================
# This version integrates with AWS DynamoDB for status tracking
# and with S3 for storing simulation results.
# ===================================================================

# --- 1. Load Required Libraries ---
library("rjags")
library("paws") # AWS SDK for R

print("--- SCRIPT VERSION 11 (JAGS with AWS Integration) ---")

# --- 2. Get Job Details & Initialize AWS Clients ---
# These are passed as environment variables from the starter Lambda
job_id <- Sys.getenv("JOB_ID")
table_name <- Sys.getenv("JOBS_TABLE_NAME")
s3_bucket_name <- Sys.getenv("S3_BUCKET_NAME")

# Check if essential variables are set
if (job_id == "" || table_name == "" || s3_bucket_name == "") {
  stop("FATAL: Missing essential environment variables (JOB_ID, JOBS_TABLE_NAME, S3_BUCKET_NAME).")
}

# Initialize paws clients. They will automatically use the Fargate Task's IAM Role.
dynamodb <- paws::dynamodb()
s3 <- paws::s3()
print("--- AWS clients initialized. ---")


# --- 3. Update Job Status to "RUNNING" ---
print(paste("--- Updating job", job_id, "to RUNNING... ---"))
dynamodb$update_item(
  TableName = table_name,
  Key = list(jobId = list(S = job_id)),
  UpdateExpression = "SET jobStatus = :s",
  ExpressionAttributeValues = list(":s" = list(S = "RUNNING"))
)

# --- 4. Main Simulation Logic (with Error Handling) ---
# tryCatch ensures that if any part of the simulation fails,
# we can catch the error and update the status to "FAILED".
tryCatch({
  
  # --- Helper Function to Read and Convert Environment Variables ---
  getenv_numeric <- function(var_name, default_val = 2) {
    val <- Sys.getenv(var_name, unset = "")
    if (val == "High") val <- "1"
    if (val == "Medium") val <- "2"
    if (val == "Low") val <- "3"
    if (is.null(val) || val == "") return(default_val)
    return(as.numeric(val))
  }
  
  # --- Load Static Data ---
  source("/app/plumber/data.R")
  print("--- Static data loaded. ---")
  
  # --- Read All Inputs from Environment Variables ---
  print("--- Reading simulation parameters from environment variables... ---")
  fp_input <- getenv_numeric("FP Input", default_val = 50)
  data$SR_FP <- fp_input
  data$SD_FP <- fp_input
  data$IM_FP <- fp_input
  data$ST_FP <- fp_input
  data$IC_FP <- fp_input
  data$SR_SDP_state <- getenv_numeric("Software Development Planning")
  data$SR_CD_state <- getenv_numeric("Development of Concept")
  # (You would continue to add all your other variables here)
  print("--- Environment variables read. ---")
  
  # --- Read Simulation Settings ---
  nChains <- getenv_numeric("nChains", 2)
  nIter <- getenv_numeric("nIter", 5000)
  nBurnin <- getenv_numeric("nBurnin", 1000)
  print(paste("--- Starting JAGS simulation with nChains =", nChains, "and nIter =", nIter, "---"))

  # --- Run the JAGS Simulation ---
  model.file <- "/app/plumber/R2WinBUGS_Combined_Model.txt"
  parameters_to_save <- c(
    "SR_Total_Remained_Defect", "PFD", "SR_DevH_post", "SR_DevM_post", "SR_DevL_post"
    # (Add all other parameters you want to save)
  )
  jags_model <- jags.model(file = model.file, data = data, n.chains = nChains, n.adapt = nBurnin)
  update(jags_model, n.iter = nBurnin)
  jags_samples <- coda.samples(jags_model, variable.names = parameters_to_save, n.iter = nIter)
  print("--- Simulation complete. ---")

  # --- 5. Save Results to a File ---
  output_filename <- "results.rds"
  saveRDS(jags_samples, file = output_filename)
  print(paste("--- Simulation results saved to", output_filename, "---"))
  
  # --- 6. Upload Results to S3 ---
  s3_object_key <- paste0("results/", job_id, "/", output_filename)
  print(paste("--- Uploading results to s3://", s3_bucket_name, "/", s3_object_key, " ---", sep=""))
  
  s3$put_object(
    Bucket = s3_bucket_name,
    Key = s3_object_key,
    Body = output_filename
  )
  
  # --- 7. Update Job Status to "COMPLETED" ---
  print("--- Upload successful. Updating job status to COMPLETED. ---")
  dynamodb$update_item(
    TableName = table_name,
    Key = list(jobId = list(S = job_id)),
    UpdateExpression = "SET jobStatus = :s, resultsPath = :p",
    ExpressionAttributeValues = list(
      ":s" = list(S = "COMPLETED"),
      ":p" = list(S = s3_object_key)
    )
  )
  
  print("--- Script finished successfully. ---")
  
}, error = function(e) {
  
  # --- This block runs ONLY if an error occurred in the `tryCatch` block ---
  error_message <- paste("Error during simulation:", e$message)
  print(error_message)
  
  # Update job status to FAILED in DynamoDB
  dynamodb$update_item(
    TableName = table_name,
    Key = list(jobId = list(S = job_id)),
    UpdateExpression = "SET jobStatus = :s, errorMessage = :e",
    ExpressionAttributeValues = list(
      ":s" = list(S = "FAILED"),
      ":e" = list(S = error_message)
    )
  )
  
  # Optionally, you can cause the script to exit with an error code
  quit(status = 1)
})