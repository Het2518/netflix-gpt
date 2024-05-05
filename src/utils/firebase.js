import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCsSRt2ApMFhkJ6UKlfN_8pdVjUllVlEAU",
    authDomain: "netflixgpt-2518.firebaseapp.com",
    projectId: "netflixgpt-2518",
    storageBucket: "netflixgpt-2518.appspot.com",
    messagingSenderId: "415892402362",
    appId: "1:415892402362:web:119a2e204c76eac63a9283",
    measurementId: "G-M9531CYL1E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize auth with the app instance
const db = getFirestore(app); // Initialize Firestore with the app instance


export { auth, db }; // Export auth and Firestore instances
