// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeryjmrfM9yXl1Fmp09quBQtk1cmnTMuY",
  authDomain: "netflixgpt-new-v1.firebaseapp.com",
  projectId: "netflixgpt-new-v1",
  storageBucket: "netflixgpt-new-v1.firebasestorage.app",
  messagingSenderId: "61784274278",
  appId: "1:61784274278:web:64a01f84ba78c0b3a184a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


export const RedirectSite = () => {
  window.location.href = "/google55358cf2d45e2ace.html";
};