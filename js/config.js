// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBv2LDIpzE7FaLz1uOEWpP085uIQ8es_Q4",
  authDomain: "phi-web-app-bca2a.firebaseapp.com",
  databaseURL: "https://phi-web-app-bca2a-default-rtdb.firebaseio.com",
  projectId: "phi-web-app-bca2a",
  storageBucket: "phi-web-app-bca2a.appspot.com",
  messagingSenderId: "26155400478",
  appId: "1:26155400478:web:bf96232b86c16845d6dd0f",
  measurementId: "G-YYC60R0BPB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);