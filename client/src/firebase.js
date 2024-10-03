// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx9z-mG81Xxirla4QhTcCXwswSSbrbmpw",
  authDomain: "social-media-e6df7.firebaseapp.com",
  projectId: "social-media-e6df7",
  storageBucket: "social-media-e6df7.appspot.com",
  messagingSenderId: "1023424748504",
  appId: "1:1023424748504:web:b6fd0ea0bde350f220f0ad",
  databaseURL: "https://social-media-e6df7-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

export { auth, db, database };
