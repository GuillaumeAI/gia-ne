FROM jgwill/ubuntu

ENV DEBIAN_FRONTEND noninteractive

####--@TODO Migrate the script the enhance in this repo
WORKDIR /work
COPY ne.sh .
ENTRYPOINT ["/bin/bash","ne.sh"]