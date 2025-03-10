# app.R
library("plumber")


# Define a function to add CORS headers
cors <- function(req, res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  res$setHeader("Access-Control-Allow-Credentials", "true")
  res$setHeader("Access-Control-Allow-Methods", "*")
  res$setHeader("Access-Control-Allow-Headers", "*")

  if (req$REQUEST_METHOD == "OPTIONS") {
    res$status <- 200
    return(list())
  }

  plumber::forward()
}


# Create a new Plumber router
pr <- pr("./plumber/plumber.R")

# Register the CORS middleware
pr$registerHooks(
  list(
    preroute = cors
  )
)

# Run the API with CORS enabled
pr_run(pr, debug = TRUE, port = 8888)