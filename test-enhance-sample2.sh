#!/bin/bash

containertag=docker.io/guillaumeai/ne:210419
(cd tests;docker run --rm -v /home/jgi/src/gia-ne:/ne/input $containertag --zoom=2 input/sample2-1024x.jpg)

