# Cross Platform Neural Encement

CLI wrapper for Image Neurally Enhanced using containerized infrastructure

Vision: A Neural Enhancement for images encapsulated into a docker container and wrapped for multiplatform by nodeJS


# Run from directory where all your files are
```sh
gia-ne fileToEnhance.jpg
gia-ne fileToEnhance.jpg 4 # zoomFactor of 4 (default 2)

# It will start the docker container in bg to do its work
```
# Install

```sh
npm i gia-ne --g
docker pull guillaumeai/ne:latest
```

# Dependencies

* Docker
* NodeJS (obviously ;) )


----

# Further research

* Colorization Neural Enhancement

