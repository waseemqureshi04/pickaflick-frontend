import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCednddUmIEcvmk2-vTyzIoIJpp4Q4mln4",
  authDomain: "netflix-gpt-140a2.firebaseapp.com",
  projectId: "netflix-gpt-140a2",
  storageBucket: "netflix-gpt-140a2.firebasestorage.app",
  messagingSenderId: "190544435543",
  appId: "1:190544435543:web:c73b8410aeac30f52f8612",
  measurementId: "G-9VPTXXC6TL"
};

// Initialize Firebase
export const auth = getAuth(initializeApp(firebaseConfig));
