#!/bin/sh
/opt/letsencrypt/certbot-auto renew --quiet --no-self-upgrade --post-hook "service nginx reload"