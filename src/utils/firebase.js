// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAAAMmKtUAPF-kHIjG70HWaYSXLFqpEYw",
  authDomain: "netflixgpt-3fbb0.firebaseapp.com",
  projectId: "netflixgpt-3fbb0",
  storageBucket: "netflixgpt-3fbb0.firebasestorage.app",
  messagingSenderId: "55607160398",
  appId: "1:55607160398:web:c4dd832eb8eb60cc245d1f",
  measurementId: "G-ED4VDSWGSE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


export const RedirectSite = () => {
  window.location.href = "/google55358cf2d45e2ace.html";
};