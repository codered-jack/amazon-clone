import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAhol5nGK-9FpXLTJ3ctbnhf_89ribc2w",
  authDomain: "clone-fb9f7.firebaseapp.com",
  databaseURL: "https://clone-fb9f7.firebaseio.com",
  projectId: "clone-fb9f7",
  storageBucket: "clone-fb9f7.appspot.com",
  messagingSenderId: "36720147603",
  appId: "1:36720147603:web:a0cf7a39c189fc7965e166",
  measurementId: "G-E6VV6VD6WJ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };