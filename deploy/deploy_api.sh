#!/bin/bash
# Args
CODE="$1"
NODE_ENV="$2"

# Take the backup of existing directory
mkdir -p /opt/cw/api/"$CODE"
cd /opt/cw/api/"$CODE"
tar zcf /opt/cw/backups/api-"$CODE".tar.gz .
echo "Backup Current Client Complete."

# Unzip the Folder of the App into the Temp Folder
mkdir -p /opt/cw/api/"$CODE".build
cd /opt/cw/api/"$CODE".build
tar zxf /opt/build/api-"$CODE".tar.gz
echo "Temp Build Folder Populated with Latest Code."

# Switch to dist folder, NPM install
export NODE_ENV="$NODE_ENV"
npm install --quiet
echo "Dist Copy Built"

# Switch to client folder, Remove current client (we backed it up already), Rename build to client
cd /opt/cw/api
rm -r /opt/cw/api/"$CODE"
mv /opt/cw/api/"$CODE".build /opt/cw/api/"$CODE"
echo "Removed Old codebase and Replaced with New Client."

# Set NODE_ENV, del, start, describe client
cd /opt/cw/api/"$CODE"
export NODE_ENV="$NODE_ENV"
pm2 delete "$CODE"-api
pm2 start dist/main.js --name "$CODE"-api
pm2 describe "$CODE"-api
pm2 logs "$CODE"-api --nostream
echo "PM2 Redeployed"