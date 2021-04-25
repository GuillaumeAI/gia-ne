#!/bin/bash
full=$1
lf=input/$full
fb=${full%.*}
export ext_target=jpg
#export qual=100

echo "----------------">> /ne/input/log.txt
echo "$(date)">> /ne/input/log.txt


export zoomFactor=2
# export ne2xScript="/ne/ne2x.sh"
# export ne4xScript="/ne/ne4x.sh"
# currentScript=$ne2xScript
# Test if we specified a 4 as Zoom Factor and changes the exec script accordingly
if [ "$2" == 4 ];then
	zoomFactor=4
fi
echo "-Zoom Factor: $zoomFactor">> /ne/input/log.txt

export nextag='ne'$zoomFactor'x'
export ext_ne='_'$nextag
currentScript='/ne/'$nextag'.sh'


export nefbname=${full%.*}
#echo $nefbname

export ne_file_src=$nefbname$ext_ne.png
export ne_file_target=$nefbname$ext_ne.$ext_target

echo "Processing $full at zoomfactor of : $zoomFactor"
echo "Converted $ne_file_src to $ne_file_target"
sleep 1
echo "--Running $currentScript $lf ---"
sleep 1



echo "--Running $currentScript $lf ---" >> /ne/input/log.txt
source $currentScript $lf &&\
convert input/$ne_file_src input/$ne_file_target && rm input/$ne_file_src ||\
echo "FAILED TO CONVERT"

echo "convert $full $fb.jpg" >> /ne/input/log.txt

