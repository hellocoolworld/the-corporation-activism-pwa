### Installation One Time Only
sudo apt-get install sshpass

### ENVs
export CODE=dev
export NODE_ENV=development

### PWA
export APP_NAME=pwa

### Copy Deploy File (One Tine only)
sshpass -p $ROOT_PASSWORD_CW scp ./deploy_"$APP_NAME".sh do-user@coolworld.cloud:/opt/deploy/deploy_"$APP_NAME".sh

### Prepare the API Build (Execute in Local)
npm run build
export ROOT_PASSWORD_CW="green7"

### Prepare the compress copy
tar -zcvf ../"$APP_NAME"-dev.tar.gz --exclude='node_modules' --exclude='.git' .

### Copy dist & other required files into the DO
sshpass -p $ROOT_PASSWORD_CW scp ../"$APP_NAME"-dev.tar.gz do-user@coolworld.cloud:/opt/build/"$APP_NAME"-dev.tar.gz

### Execute the Deploy Script (PWA)
sshpass -p "$ROOT_PASSWORD_CW" ssh do-user@coolworld.cloud "sh /opt/deploy/deploy_"$APP_NAME".sh dev development pwa"
