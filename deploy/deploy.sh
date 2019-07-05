#!/bin/bash
ssh do-user@dev.halotales.com "source /home/do-user/.bashrc; rm -rf /var/www/client/backup/*; cp /var/www/client/dev/www /var/www/client/backup/; mkdir /var/www/client/dev/www;"
LOCAL="/Users/davdwaynegriffith/CodeRoot/halo-tales-pwa/www/"
REMOTE="/var/www/client/dev"
scp -r "$LOCAL" do-user@dev.halotales.com:"$REMOTE"


#sudo nano /etc/nginx/nginx.conf
#sudo nano /etc/nginx/sites-enabled/dev.halotales.com
#sudo systemctl restart nginx
#sudo nginx -t
#sudo nginx -T
  


