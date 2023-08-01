// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getDatabase, ref, set, push } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCc2LB13SxcpIsuiiVWn1GZNj7kPLuwfzM",
  authDomain: "floss-wars.firebaseapp.com",
  databaseURL: "https://floss-wars-default-rtdb.firebaseio.com/",
  projectId: "floss-wars",
  storageBucket: "floss-wars.appspot.com",
  messagingSenderId: "83554067501",
  appId: "1:83554067501:web:631a9f5533412f1857c4a4",
  measurementId: "G-TEPPY3D2HK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app);

export { auth, database, firestore, ref, set };

export default app;