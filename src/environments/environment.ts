// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  shell: {
    debug: false,
    networkDelay: 2000
  },
  apiUrl: 'http://localhost:1337',
  hosting: 'http://localhost:8100',
  firebaseConfig: {
    apiKey: 'AIzaSyBj0pEH4_R60noIX9eFbMCQH73gTHK5K-c',
    authDomain: 'the-corporation-app.firebaseapp.com',
    databaseURL: 'https://the-corporation-app.firebaseio.com',
    projectId: 'the-corporation-app',
    storageBucket: 'the-corporation-app.appspot.com',
    messagingSenderId: '959919978472',
    appId: '1:959919978472:web:40a61040e897da3a58565d',
    measurementId: 'G-7E388GX2JZ'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
