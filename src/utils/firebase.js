import firebase from "firebase/app";

import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBUAqYrjWKqXaiuW5GJUXcnN_xbTSZupdE",
    authDomain: "blog-project-client.firebaseapp.com",
    projectId: "blog-project-client",
    storageBucket: "blog-project-client.appspot.com",
    messagingSenderId: "575841102888",
    appId: "1:575841102888:web:486193d85677b06c49591d",
    measurementId: "G-NX2075CD9S"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

export const firestore = firebase.firestore();

export default firebase;