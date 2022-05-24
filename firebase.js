import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTzp3QdDppU-Cr1Ar116Z1BrnzoX-QUUw",
  authDomain: "grocery-app-7a337.firebaseapp.com",
  projectId: "grocery-app-7a337",
  storageBucket: "grocery-app-7a337.appspot.com",
  messagingSenderId: "579883298935",
  appId: "1:579883298935:web:50f7fe84fc633e97b25672",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebase.firestore();

export { firebase, db };
