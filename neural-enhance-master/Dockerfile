FROM alexjc/neural-enhance


RUN python3 --version
# Install requirements before copying project files
WORKDIR /ne

COPY requirements.txt .
RUN /opt/conda/bin/conda install -q -y conda numpy scipy pip pillow
RUN /opt/conda/bin/python3 -m pip install -q -r "requirements.txt"

# Copy only required project files
COPY enhance.py .

# Get a pre-trained neural networks, non-commercial & attribution.
RUN wget -q "https://github.com/alexjc/neural-enhance/releases/download/v0.3/ne1x-photo-deblur-0.3.pkl.bz2"
RUN wget -q "https://github.com/alexjc/neural-enhance/releases/download/v0.3/ne1x-photo-repair-0.3.pkl.bz2"
RUN wget -q "https://github.com/alexjc/neural-enhance/releases/download/v0.3/ne4x-photo-default-0.3.pkl.bz2"
RUN wget -q "https://github.com/alexjc/neural-enhance/releases/download/v0.3/ne2x-photo-default-0.3.pkl.bz2"



RUN apt-get update && apt-get install -y imagemagick

COPY ne2x.sh .
COPY ne4x.sh .
COPY ne.sh .
RUN chmod 777 ne*
COPY bash_aliases.txt  /root/.bash_aliases

# Set an entrypoint to the main enhance.py script
ENTRYPOINT ["/opt/conda/bin/python3", "enhance.py", "--device=cpu"]
#ENTRYPOINT ["/bin/bash"]