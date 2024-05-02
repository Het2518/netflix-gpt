import React, {useEffect} from 'react';
import watchingUserLogo from '../assets/watchingUserLogo.png';
import netflixLogo from '../assets/netflix-logo.svg';
import {auth} from '../utils/firebase';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addUser, removeUser} from "../utils/userSlice";

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            navigate('/error')
        });

    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const {uid, email, displayName} = user;
                dispatch(addUser({uid, email, displayName}));
                navigate('/browse');
            } else {
                dispatch(removeUser());
                navigate('/')
            }
        });

        return () => unsubscribe(); // Clean up the observer on unmount
    }, [dispatch]);
    return (
        <div className="flex justify-between items-center px-8 py-4  bg-gradient-to-b from-black w-screen">
            <img className='w-36' src={netflixLogo} alt="Netflix Logo"/>
            {user && <div className="flex items-center space-x-4">
                <img className="w-10 h-10 rounded-full" src={watchingUserLogo} alt="User Logo"/>
                <button
                    onClick={handleSignOut}
                    className="bg-transparent border border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition duration-300">Sign
                    Out
                </button>
            </div>}
        </div>
    );
};

export default Header;
