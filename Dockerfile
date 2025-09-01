# ===================================================================
# Dockerfile for Fargate Batch Job (JAGS Simulation - Final v11)
# ===================================================================
# This version switches to a faster package mirror to speed up installation.
# ===================================================================

# Start from the official rocker/r-base image
FROM rocker/r-base

# --- OPTIMIZATION ---
# Switch to the main Debian CDN mirror to speed up package downloads
RUN echo "deb http://deb.debian.org/debian stable main" > /etc/apt/sources.list

# Install JAGS and system dependencies required for devtools and paws
# This step will now be much faster.
RUN apt-get update && apt-get install -y --no-install-recommends \
    jags \
    libcurl4-openssl-dev \
    libssl-dev \
    libxml2-dev \
 && rm -rf /var/lib/apt/lists/*

# Install the required R packages
RUN R -e "install.packages(c('rjags', 'devtools'), repos='https://cloud.r-project.org')"

# Install paws from GitHub using devtools
RUN R -e "devtools::install_github('paws-r/paws')"

# --- VERIFICATION STEP ---
RUN R -e "if (!require('paws')) quit(status = 1)"

# Set the working directory
WORKDIR /app

# Copy your R project files into the container
COPY . /app/

# The command to run when the container starts
CMD ["Rscript", "/app/run_simulation.R"]