# app.R
library("plumber")

pr("./plumber/plumber.R") %>%
  pr_run(port=3000)
