// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgmsGwMaLxKeOLpjrcnT-twFEnXBUvGm8",
  authDomain: "photofolio-app-54ae0.firebaseapp.com",
  projectId: "photofolio-app-54ae0",
  storageBucket: "photofolio-app-54ae0.appspot.com",
  messagingSenderId: "979505618318",
  appId: "1:979505618318:web:ddd8794cbf53731eba98df",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

