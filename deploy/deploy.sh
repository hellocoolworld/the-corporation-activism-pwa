#!/bin/bash
ssh do-user@coolworld.cloud "source /home/do-user/.bashrc; rm -rf /opt/corp/pwa/*;"


#sudo nano /etc/nginx/nginx.conf
#sudo nano /etc/nginx/sites-enabled/dev.halotales.com
#sudo systemctl restart nginx
#sudo nginx -t
#sudo nginx -T
cd ..
ionic build --prod
ssh do-user@coolworld.cloud "source /home/do-user/.bashrc; rm -rf /opt/corp/pwa/*;"
scp -r "${PWD}"/dist/* do-user@coolworld.cloud:/opt/corp/pwa
