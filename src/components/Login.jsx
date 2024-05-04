import React, { useRef, useState } from 'react';
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase"; // Assuming you have a db instance exported from your Firebase setup
import netflixBGImage from "../assets/netflix-background-image.jpg";

const Login = () => {
    const [showSignInForm, setShowSignInForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const dispatch = useDispatch();

    const toggleSignInForm = () => {
        setShowSignInForm(!showSignInForm);
    }

    const handleButtonClick = () => {
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);
        if (message) return;

        if (!showSignInForm) {
            // Sign up
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value
                    }).then(() => {
                        // Store the user's name in Firestore
                        setDoc(doc(db, "users", user.uid), {
                            name: name.current.value,
                            email: user.email,
                            uid: user.uid
                        }).then(() => {
                            const { uid, email, displayName } = auth.currentUser;
                            dispatch(addUser({ uid, email, displayName }));
                        }).catch((error) => {
                            setErrorMessage(error.message);
                            console.log(error);
                        });
                    }).catch((error) => {
                        setErrorMessage(error.message);

                        console.log(error);
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " - " + errorMessage);
                });
        } else {
            // Sign in
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    // Retrieve the user's name from Firestore
                    const docRef = doc(db, "users", user.uid);
                    getDoc(docRef).then((docSnap) => {
                        if (docSnap.exists()) {
                            const userData = docSnap.data();
                            const { uid, email, displayName } = user;
                            dispatch(addUser({ uid, email, displayName, name: userData.name }));
                        } else {
                            console.log("No such document!");
                        }
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " - " + errorMessage);
                });
        }
    }

    return (
        <div className='relative flex flex-col items-center justify-center h-screen bg-black'>
            <img
                src={netflixBGImage}
                alt="background-image"
                className="absolute inset-0 object-cover w-full h-full opacity-60"
            />
            <div className="relative inset-0 flex flex-col justify-center items-center">
                <Header />
                <form onSubmit={(e) => {
                    e.preventDefault()
                }} className='bg-black bg-opacity-50 rounded-lg shadow-lg flex flex-col p-8 w-96 text-white'>
                    <h1 className='text-3xl font-bold mb-4'>{showSignInForm ? "Sign In" : "Sign Up"}</h1>
                    {!showSignInForm && <input type="text" placeholder='Name' ref={name}
                        className='bg-transparent border-b border-white focus:outline-none py-2 mb-4 placeholder-white' />}
                    <input type="email" placeholder='Email' ref={email}
                        className='bg-transparent border-b border-white focus:outline-none py-2 mb-4 placeholder-white' />
                    <input type="password" placeholder='Password' ref={password}
                        className='bg-transparent border-b border-white focus:outline-none py-2 mb-4 placeholder-white' />
                    <p className='text-white p-2 rounded-lg mb-3'>{errorMessage}</p>
                    <button
                        className='bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700 transition-colors'
                        onClick={handleButtonClick}>{showSignInForm ? "Sign In" : "Sign Up"}</button>
                    <p className='text-sm mt-4'>{showSignInForm ? "Don't have an account?" : "Already have an account?"}
                        <button
                            className='text-red-600 cursor-pointer'
                            onClick={toggleSignInForm}>
                            {showSignInForm ? "Sign Up" : "Sign In"}
                        </button></p>
                </form>
            </div>
        </div>
    );
};

export default Login;
