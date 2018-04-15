upstream takeover {
  ip_hash;
  server 127.0.0.1:8083;
  server 127.0.0.1:8084;
}
server {
        #listen 80 default_server;
        #listen [::]:80 default_server;

        ssl on;
        listen 443 ssl default_server;
        listen [::]:443 ssl default_server;
        ssl_certificate /etc/letsencrypt/live/bytday.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/bytday.com/privkey.pem;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # drop SSLv3 (POODLE vulnerabilit$
        ssl_session_cache shared:SSL:100m;
        ssl_session_timeout 100m;
        ssl_dhparam /etc/ssl/certs/dhparam.pem;
        # root /var/www/html;

        # Add index.php to the list if you are using PHP
        index index.html index.htm index.nginx-debian.html;

        server_name bytday.com;
        #rewrite ^(.*) https://$host$1 permanent;
        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                proxy_pass http://takeover;
                proxy_redirect off;
                proxy_set_header   X-Real-IP  $remote_addr;
                proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
                proxy_set_header   X-Forwarded-Proto  $scheme;
                proxy_set_header   Host  $http_host;
                proxy_set_header   X-NginX-Proxy  true;
                proxy_http_version 1.1;
                proxy_cache_key   "$scheme$host$request_method$request_uri";
        }
        #location /socket.io/ {
        #       proxy_pass http://takeover/socket.io/;
        #       proxy_redirect off;
        #       proxy_http_version 1.1;
        #       proxy_set_header Upgrade $http_upgrade;
        #       proxy_set_header Connection "upgrade";
        #       proxy_set_header X-Real-IP $remote_addr;
        #       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        #       proxy_set_header Host $http_host;
        #       proxy_set_header X-NginX-Proxy true;
        #}
        #location ~ /.well-known {
        #       allow all;
        #}
}
server {
        listen 80;
        listen [::]:80;
        server_name bytday.com;
        client_max_body_size 0;
        charset utf-8;
        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                proxy_pass http://takeover;
                proxy_redirect off;
                proxy_set_header   X-Real-IP  $remote_addr;
                proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
                proxy_set_header   X-Forwarded-Proto  $scheme;
                proxy_set_header   Host  $http_host;
                proxy_set_header   X-NginX-Proxy  true;
                proxy_http_version 1.1;
                proxy_cache_key   "$scheme$host$request_method$request_uri";
        }
}