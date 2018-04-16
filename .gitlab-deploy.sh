#!/bin/bash
#Get servers list
set -f
string=$DEPLOY_SERVER
array=(${string//,/ })
#Iterate servers for deploy and pull last commit
for i in "${!array[@]}"
do
  echo "Deploy project on server ${array[i]}"
  ssh youngdi@${array[i]} 'sudo docker-compose down &&\
  sudo sed -i "s~registry.gitlab.com\/youngdi\/takeover.*~"'$CI_REGISTRY_IMAGE'":"'$CI_COMMIT_TAG'"~g" docker-compose.yml &&\
  cat docker-compose.yml &&\
  sudo docker-compose up -d &&\
  sudo docker system prune -f
  '
done
