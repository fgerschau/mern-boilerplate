#!/usr/bin/env bash
# See https://serverfault.com/questions/577370/how-can-i-use-environment-variables-in-nginx-conf
export DOLLAR='$'
envsubst < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
cat /etc/nginx/nginx.conf
nginx -g "daemon off;" -c /etc/nginx/nginx.conf
