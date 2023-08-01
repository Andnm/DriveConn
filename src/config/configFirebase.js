// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9G2aKUIdKV2lsUy_RO9uxWPJwVYQTm4M",
  authDomain: "vehicle-rental-app-34efb.firebaseapp.com",
  projectId: "vehicle-rental-app-34efb",
  storageBucket: "vehicle-rental-app-34efb.appspot.com",
  messagingSenderId: "646178805601",
  appId: "1:646178805601:web:3b15b33b86e840a1b81720",
  measurementId: "G-D48XX22SR0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();
const storage = getStorage(app);
const providerFacebook = new FacebookAuthProvider();
const db = getFirestore();

export { auth, providerGoogle, providerFacebook, storage, db };
