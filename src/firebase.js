// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXU-MyFawZpo351y75TdGRI-WH6NbIZVE",
  authDomain: "tz-react-20645.firebaseapp.com",
  projectId: "tz-react-20645",
  storageBucket: "tz-react-20645.appspot.com",
  messagingSenderId: "21428142969",
  appId: "1:21428142969:web:1511f097a1c238b2be25a8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
