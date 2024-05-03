import React, {useRef, useState} from 'react';
import Header from "./Header";
import {checkValidData} from "../utils/validate";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../utils/firebase";
import {useNavigate} from "react-router-dom";
import {updateProfile} from "firebase/auth";
import {useDispatch} from "react-redux";
import {addUser} from "../utils/userSlice";
import netflixBGImage from "../assets/netflix-background-image.jpg"


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
        //validate the form data
        // console.log(email.current.value)
        // console.log(password.current.value)
        const message = checkValidData(email.current.value, password.current.value)
        setErrorMessage(message)
        if (message) return;

        if (!showSignInForm) {
            //sign up
            createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value
            )
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value
                    }).then(() => {
                        const {uid, email, displayName} = auth.currentUser;
                        dispatch(addUser({uid: uid, email: email, displayName: displayName}))


                    }).catch((error) => {
                        setErrorMessage(error.message)
                        console.log(error)
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " - " + errorMessage)
                });
        } else {
            //sign in
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " - " + errorMessage)
                });
        }

    }

    return (
        <div className='relative  flex flex-col items-center justify-center h-screen bg-black'>
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img
                src={netflixBGImage}
                alt="background-image"
                className="absolute inset-0 object-cover w-full h-full opacity-60"
            />
            <div className="relative inset-0 flex flex-col justify-center items-center">
                <Header/>
                <form onSubmit={(e) => {
                    e.preventDefault()
                }} className='bg-black bg-opacity-50 rounded-lg shadow-lg flex flex-col p-8 w-96 text-white'>
                    <h1 className='text-3xl font-bold mb-4'>{showSignInForm ? "Sign In" : "Sign Up"}</h1>
                    {!showSignInForm && <input type="text" placeholder='Name' ref={name}
                                               className='bg-transparent border-b border-white focus:outline-none py-2 mb-4 placeholder-white'/>}
                    <input type="email" placeholder='Email' ref={email}
                           className='bg-transparent border-b border-white focus:outline-none py-2 mb-4 placeholder-white'/>
                    <input type="password" placeholder='Password' ref={password}
                           className='bg-transparent border-b border-white focus:outline-none py-2 mb-4 placeholder-white'/>
                    <p className='text-white p-2 rounded-lg mb-3'>{errorMessage}</p>
                    <button
                        className='bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700 transition-colors'
                        onClick={handleButtonClick}>{showSignInForm ? "Sign In" : "Sign Up"}</button>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <p className='text-sm mt-4'>{showSignInForm ? "Don't have an account?" : "Already have an account?"}
                        <a href="#" className='text-red-600'
                           onClick={toggleSignInForm}>{showSignInForm ? "Sign Up" : "Sign In"}</a></p>
                </form>
            </div>
        </div>
    );
};

export default Login;
