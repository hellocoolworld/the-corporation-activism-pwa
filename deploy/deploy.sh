#!/bin/bash
LOCAL="/Users/davdwaynegriffith/CodeRoot/halo-tales-pwa/www/"
REMOTE="/var/www/client/dev"
scp -r "$LOCAL" do-user@dev.halotales.com:"$REMOTE"


#sudo nano /etc/nginx/nginx.conf
#sudo nano /etc/nginx/sites-enabled/dev.halotales.com
#sudo systemctl restart nginx
#sudo nginx -t
#sudo nginx -T
  