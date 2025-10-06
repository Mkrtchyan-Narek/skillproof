// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoxW3UHOMTpRoqMqrp7tjf4VbpPJSAitg",
  authDomain: "skillproof-9b680.firebaseapp.com",
  projectId: "skillproof-9b680",
  storageBucket: "skillproof-9b680.firebasestorage.app",
  messagingSenderId: "708535196877",
  appId: "1:708535196877:web:51bf9e5bb6ea3bc54b1d84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();