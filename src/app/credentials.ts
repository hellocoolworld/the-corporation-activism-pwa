// Initialize Firebase
// For instruction, please go to https://ionic-pwa-template.firebaseapp.com/getstarted

export const firebaseConfig = {
    apiKey: 'AIzaSyAPV1PHB6GHEqOlW9JktLtgjhFlwhUNGtU',
    authDomain: 'halo-take-pwa-74b10.firebaseapp.com',
    databaseURL: 'https://halo-take-pwa-74b10.firebaseio.com',
    projectId: 'halo-take-pwa-74b10',
    storageBucket: 'halo-take-pwa-74b10.appspot.com',
    messagingSenderId: '379314173961'
};

// News Feed from NewsApi.org
// Please sign-up and get your apiKey from 
// https://newsapi.org/docs/get-started
export const newsConfig = {
    apiKey  : "",
    newsURL : 'https://newsapi.org/v2/top-headlines'
};

// Google API to retrieve Google Map
// Please sign-up and get your apiKey from 
// https://developers.google.com/maps/documentation/javascript/get-api-key
export const googleConfig = {
    apiKey    : "",
    mapURL    : 'https://maps.googleapis.com/maps/api/geocode/json',
    nearbyURL : 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
};
