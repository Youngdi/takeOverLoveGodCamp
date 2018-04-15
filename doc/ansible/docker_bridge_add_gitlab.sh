apt-get install bridge-utils
#install Docker from official shell script
curl -sSL https://get.docker.com/ | sh
#stop docker service and change inner ip
service docker stop
sudo ip link set dev docker0 down
echo 'DOCKER_OPTS="--fixed-cidr=10.0.0.1/26 --bip=10.0.0.1/24"' >> /etc/default/docker 
service docker start
#install docker-compose
curl -L "https://github.com/docker/compose/releases/download/1.11.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
# download docker-compose.yaml of gitlab
wget https://www.dropbox.com/s/p71x4ngor379oyv/docker-compose.yaml
docker-compose up -d