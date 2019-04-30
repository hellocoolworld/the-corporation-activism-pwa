#!/bin/bash
CODE="$1"
NODE_ENV="$2"
cd /Users/davidwaynegriffith/CodeRoot/acqurate-admin-tool
tar -zcvf admin-"$CODE".tar.gz --exclude='node_modules' --exclude='.git' .
scp admin-"$CODE".tar.gz do-user@"$CODE".acqurate.com:/opt/acq/incoming/admin-"$CODE".tar.gz
ssh do-user@"$CODE".acqurate.com "/opt/acq/deploy/deploy_admin.sh "$CODE" "$NODE_ENV""
rm admin-"$CODE".tar.gz

npm i @ionic/angular@latest --save

