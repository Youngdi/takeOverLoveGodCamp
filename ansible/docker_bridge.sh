sudo apt-get install bridge-utils
#install Docker from official shell script
sudo curl -sSL https://get.docker.com/ | sh
#stop docker service and change inner ip
sudo service docker stop
sudo ip link set dev docker0 down
sudo echo 'DOCKER_OPTS="--fixed-cidr=10.0.0.1/26 --bip=10.0.0.1/24"' >> /etc/default/docker 
sudo service docker start