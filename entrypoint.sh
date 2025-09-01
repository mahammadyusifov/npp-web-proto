#!/bin/sh
# This script acts as the container's entrypoint.

# Start the virtual framebuffer on display :99 in the background
Xvfb :99 -screen 0 1024x768x24 &

# Set the DISPLAY environment variable to point to the virtual screen
export DISPLAY=:99

# Add a short delay to ensure Xvfb is fully initialized before proceeding
sleep 2

# Execute the main command (the R script)
exec Rscript /app/run_simulation.R