import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// Optionally import the services that you want to use
// import {...} from "firebase/database";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDHpzdznKRxO1ex63PoE3o7axsNk9F2ESo",
    authDomain: "simple-todo-app-56012.firebaseapp.com",
    projectId: "simple-todo-app-56012",
    storageBucket: "simple-todo-app-56012.appspot.com",
    messagingSenderId: "852277027055",
    appId: "1:852277027055:web:7ea4e7f06ff5b2a9567b1a",
    measurementId: "G-CYDJJ8X48H"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
