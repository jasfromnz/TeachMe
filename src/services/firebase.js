import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAGw-7kDQQDe64koBPgLuzPXez7vSKbqD0",
    authDomain: "teachme-d2c7d.firebaseapp.com",
    projectId: "teachme-d2c7d",
    storageBucket: "teachme-d2c7d.appspot.com",
    messagingSenderId: "418980229001",
    appId: "1:418980229001:web:a201aca01280704aa8fb58",
    measurementId: "G-SQF61874B6"
};

firebase.initializeApp(config);

const googleProvider = new firebase.auth.GoogleAuthProvider();

function login() {
    firebase.auth().signInWithPopup(googleProvider);
}

function logout() {
    firebase.auth().signOut();
}

export { login, logout };