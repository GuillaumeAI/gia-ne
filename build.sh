export container_tag=guillaumeai/ne:latest

docker build -t $container_tag .
docker push $container_tag


