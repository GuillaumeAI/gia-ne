FROM alexjc/neural-enhance
# FROM alexjc/neural-enhance

ENV DEBIAN_FRONTEND noninteractive

# Install requirements before copying project files
WORKDIR /ne

RUN wget -q "https://github.com/alexjc/neural-enhance/releases/download/v0.3/ne2x-photo-repair-0.3.pkl.bz2"
RUN wget -q "https://github.com/alexjc/neural-enhance/releases/download/v0.3/ne4x-photo-repair-0.3.pkl.bz2"


####--@TODO Migrate the script the enhance in this repo
#WORKDIR /work
#COPY ne.sh .
#ENTRYPOINT ["/bin/bash","ne.sh"]