#!/bin/bash

echo Running: /opt/conda/bin/python3 enhance.py --device=cpu --zoom=$1 $3
/opt/conda/bin/python3 enhance.py --device=cpu --zoom=$1 $3

fname=$(basename $3)
fbnameTMP=${fname%.*}


#echo convert $fbnameTMP'_ne'$1'x.png' --quality $2 $fbnameTMP.jpg
#convert $fbnameTMP'_ne'$1'x.png' --quality $2 $fbnameTMP.jpg
echo "Convertion to JPG is currently bugged, skipping..."