### Installation One Time Only
sudo apt-get install sshpass

### Copy Deploy File (One Tine only)
sshpass -p $ROOT_PASSWORD_CW scp ./deploy_pwa.sh do-user@coolworld.cloud:/opt/deploy/deploy_pwa.sh

### Prepare the API Build (Execute in Local)
npm run build
export ROOT_PASSWORD_CW="green7"

### Prepare the compress copy
tar -zcvf ../pwa-dev.tar.gz --exclude='node_modules' --exclude='.git' .

### Copy dist & other required files into the DO
sshpass -p $ROOT_PASSWORD_CW scp ../pwa-dev.tar.gz do-user@coolworld.cloud:/opt/build/pwa-dev.tar.gz

### Execute the Deploy Script (PWA)
sshpass -p "$ROOT_PASSWORD_CW" ssh do-user@coolworld.cloud "sh /opt/deploy/deploy_pwa.sh dev development pwa"

### ENVs (Testing purpose only)
export CODE=dev
export NODE_ENV=development