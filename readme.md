1.  Platform Setup

    Step 1 - Node.js
        Make sure you have an up-to-date version of Node.js installed on your system. 
        If you don't have Node.js installed, you can install it from

        https://nodejs.org/en/download


    Step 2 - ionic

        Open a terminal window (Mac) or a command window (Windows), and install Ionic:

            > npm install -g ionic

        On a Mac, you may have to use sudo depending on your system configuration:

            > sudo npm install -g cordova ionic

        If you already have Ionic installed on your computer, make sure you update 
        to the latest version:

            > npm update -g ionic

        OR

            > sudo npm update -g cordova ionic

    
    Step 3 - Code editor

        Install your code editor such as Visual Studio Code or Atom

        Visual Studio Code
        https://code.visualstudio.com/download

        Atom
        https://atom.io/


************************************************************************************

2.  Install and Set-up Template

    Step 1 - Unzip the Template file to your project directory

        Open a terminal window (Mac) or a command window (Windows), and navigate 
        to the project directory.


    Step 2 - Install the server dependencies:

        > npm install


    Step 3 - Open your project
    
        Open your project using Visual Studio Code or Atom

        Open your Firebase Configuration file at src/apps/credentials.ts

        Follow the instruction in the credentials.ts file


************************************************************************************

3.  Set-up Firebase

   
    Step 1- Sign-up for Firebase

        https://firebase.google.com/

        Go to Firebase Console

        https://console.firebase.google.com


    Step 2 - Add your Project

        Get you Firebase configuration file

        Go to Project Settings/General and click Add Firebase to your Website icon

        Copy the configuration file and paste in your 
        src/apps/credentials.ts file 

            apiKey: "your api key",
            authDomain: "your domain",
            databaseURL: "https://xxx",
            projectId: "project name",
            storageBucket: "xxx.appspot.com",
            messagingSenderId: "xxx"


    Step 3 - Set-up Firestore
        
        For more information, go to
        https://firebase.google.com/docs/firestore/quickstart



    Step 4 - Set-up Authentication

        Go to Authentication/Sign-in method

        Enable Google
        For Google authentication, it will be setup automatically.

        Enable Facebook
        Go to Facebook Developer page to get your App ID and App Secret

        https://developers.facebook.com/apps/

        Add the OAuth redirect URI (from Firebase) to your Facebook app configuration.

        For information on how to setup your facebook apps please refer to:

        https://developers.facebook.com/docs/apps/


        Update your facebook App ID and App Secret in firebase


***********************************************************************************

4.  Test it in your browser.

    > ionic serve

    If you follow all the Steps from 1 - 3, your apps will be displayed in your browser.


***********************************************************************************

5.  Host it on Firebase Hosting

    Step 1 - Install the Firebase CLI.

        > npm install -g firebase-tools


    Step 2 - Initialize your site

        > firebase init

        Answer as follows :
        ? What do you want to use as your public directory? www
        ? Configure as a single-page app (rewrite all urls to /index.html)? Yes
        ? File www/index.html already exists. Overwrite? No

        On subsequent build and deploy, you do not need to do the above 2 steps.


    Step 3 - Build your project

        > npm run www


    Step 4 - Deploy your site. 

        > firebase deploy

        Upon completion, go to the URL provided.


        CONGRATULATION

        You Apps is now LIVE.












