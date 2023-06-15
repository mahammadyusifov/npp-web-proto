# Use the R base image
FROM r-base:latest

# Install necessary dependencies for WinBUGS
RUN apt-get update && apt-get install -y \
    wine \
    wget \
    libssl-dev \
    libcurl4-gnutls-dev


# Install WinBUGS
RUN wget https://www.mrc-bsu.cam.ac.uk/wp-content/uploads/2018/11/winbugs143_unrestricted.zip
RUN unzip winbugs143_unrestricted.zip
RUN cp -r -d winbugs14_full_patched/WinBUGS14/ /opt/

# Set up WINE for WinBUGS
RUN winecfg

# Install Plumber and R2WinBUGS
RUN R -e "install.packages('R2WinBUGS')"
RUN R -e "install.packages('plumber')"

COPY / /

# Expose the port that your Plumber API will run on
EXPOSE 8000

# Start the Plumber API
CMD ["Rscript", "/app/api.R"]
