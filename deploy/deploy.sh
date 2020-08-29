#!/bin/bash
#ssh do-user@coolworld.cloud "source /home/do-user/.bashrc; rm -rf /opt/corp/pwa; cd /opt/corp; mkdir pwa;"
LOCAL="/Users/davdwaynegriffith/Code/corp-app-pwa/www/*"
REMOTE="/opt/corp/pwa/*"
scp -r "$LOCAL" do-user@dev.halotales.com:"$REMOTE"


#sudo nano /etc/nginx/nginx.conf
#sudo nano /etc/nginx/sites-enabled/dev.halotales.com
#sudo systemctl restart nginx
#sudo nginx -t
#sudo nginx -T


scp -r "${PWD}"../dist/* do-user@coolworld.cloud:/opt/corp/pwa




