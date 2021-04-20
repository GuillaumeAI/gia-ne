export container_tag=guillaumeai/ne

docker build -t $container_tag .
docker push $container_tag
