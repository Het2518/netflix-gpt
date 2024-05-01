import { getAuth } from 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
export const auth = getAuth();