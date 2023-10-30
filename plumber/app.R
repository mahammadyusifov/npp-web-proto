# app.R
library("plumber")

pr("./plumber/plumber.R") %>%
  pr_run(debug = TRUE, port = 8000)
