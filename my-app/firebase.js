// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxcQIqw8P5eZvlPlPfIouIyS0FErjIa-Q",
  authDomain: "lifelo-b17e2.firebaseapp.com",
  databaseURL: "https://lifelo-b17e2-default-rtdb.firebaseio.com/",
  projectId: "lifelo-b17e2",
  storageBucket: "lifelo-b17e2.appspot.com",
  messagingSenderId: "726012843896",
  appId: "1:726012843896:web:35f08c2f74655526bd5a8d",
  measurementId: "G-787BK86P7P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
