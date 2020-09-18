#!/bin/bash
# Args
CODE="$1"
NODE_ENV="$2"

# Take the backup of existing directory
mkdir -p /opt/corp/pwa/"$CODE"
cd /opt/corp/pwa/"$CODE"
tar zcf /opt/corp/backups/pwa-"$CODE".tar.gz .
echo "Backup Current Client Complete."

# Unzip the Folder of the App into the Temp Folder
mkdir -p /opt/corp/pwa/"$CODE".build
cd /opt/corp/pwa/"$CODE".build
tar zxf /opt/build/pwa-"$CODE".tar.gz
echo "Temp Build Folder Populated with Latest Code."

# Switch to dist folder, NPM install
export NODE_ENV="$NODE_ENV"
export NG_CLI_ANALYTICS=false
npm install --quiet
echo "Dist Copy Built"

# Switch to client folder, Remove current client (we backed it up already), Rename build to client
cd /opt/corp/pwa
rm -r /opt/corp/pwa/"$CODE"
mv /opt/corp/pwa/"$CODE".build /opt/corp/pwa/"$CODE"
echo "Removed Old codebase and Replaced with New Client."

# Set NODE_ENV, del, start, describe client
cd /opt/corp/pwa/"$CODE"
export NODE_ENV="$NODE_ENV"
pm2 delete "$CODE"-pwa
pm2 start --name "$CODE"-pwa "npm run serve:ssr"
pm2 describe "$CODE"-pwa
pm2 logs "$CODE"-pwa --nostream
echo "PM2 Redeployed"
