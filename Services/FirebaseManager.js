import firebase from 'firebase/app';
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCTWf4fGPvAhp8pGn3QMyUfSJkmA19B8Ec",
    authDomain: "gogeocaching-74e49.firebaseapp.com",
    databaseURL: "https://gogeocaching-74e49.firebaseio.com",
    projectId: "gogeocaching-74e49",
    storageBucket: "gogeocaching-74e49.appspot.com",
    messagingSenderId: "1052858569357",
    appId: "1:1052858569357:web:459625c14f6e8767b588c4"
};

if (firebase.apps.length === 0) {
firebase.initializeApp(firebaseConfig);
}
  
export const db = firebase.firestore();