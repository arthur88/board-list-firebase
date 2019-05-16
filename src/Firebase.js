import * as firebase from 'firebase';

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyCQZD9XSODumcmEuT9ZQjp9ye6XqZz9xL4",
    authDomain: "boardlist-dbf1e.firebaseapp.com",
    databaseURL: "https://boardlist-dbf1e.firebaseio.com",
    projectId: "boardlist-dbf1e",
    storageBucket: "boardlist-dbf1e.appspot.com",
    messagingSenderId: "406307769096",
    appId: "1:406307769096:web:7a88b1dca8e2089e"
};

firebase.initializeApp(config);
firebase.firestore().settings(settings);

export default firebase;