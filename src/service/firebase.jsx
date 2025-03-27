// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2NwSkf3qR6_q7KqQo3mJKQ4zmvhqeuwo",
  authDomain: "supersimpleaction-a64a0.firebaseapp.com",
  databaseURL: "https://supersimpleaction-a64a0.firebaseio.com",
  projectId: "supersimpleaction-a64a0",
  storageBucket: "supersimpleaction-a64a0.firebasestorage.app",
  messagingSenderId: "425074904604",
  appId: "1:425074904604:web:5f84795e8e9b1afb7fd9d9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 