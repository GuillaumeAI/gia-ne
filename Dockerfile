FROM jgwill/neuz
# FROM alexjc/neural-enhance

ENV DEBIAN_FRONTEND noninteractive

# Install requirements before copying project files
WORKDIR /ne

# RUN wget -q "https://github.com/alexjc/neural-enhance/releases/download/v0.3/ne2x-photo-repair-0.3.pkl.bz2"
# RUN wget -q "https://github.com/alexjc/neural-enhance/releases/download/v0.3/ne4x-photo-repair-0.3.pkl.bz2"

# made a local copy of the enhancement models
RUN rm -f *.bz2.1
#COPY files/* .


####--@TODO Migrate the script the enhance in this repo
#WORKDIR /work
#COPY ne.sh .
#ENTRYPOINT ["/bin/bash","ne.sh"]
# Set an entrypoint to the main enhance.py script
COPY ne-exec.sh .
COPY neural-enhance-master/ne.sh .
COPY neural-enhance-master/ne2x.sh .
COPY neural-enhance-master/ne4x.sh .
RUN chmod a+x *sh
#ENTRYPOINT []
#ENTRYPOINT ["/opt/conda/bin/python3.5", "enhance.py", "--device=cpu"]
ENTRYPOINT ["/bin/bash", "ne-exec.sh"]