// Header.jsx
import React, {useEffect} from 'react';
import watchingUserLogo from '../assets/watchingUserLogo.png';
import netflixLogo from '../assets/netflix-logo.svg';
import {auth} from '../utils/firebase';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addUser, removeUser} from "../utils/userSlice";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {toggleGptSearchView} from "../utils/gptSlice";
import {SUPPORTED_CONST} from "../utils/constants";
import language from "../utils/language";
import {changeLanguage} from "../utils/configSlice";


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    const showGptSearch = useSelector(state => state.gpt.showGptSearch);

    const handleGptSearchClick = () => {
        dispatch(toggleGptSearchView())
    }
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                // An error happened.
                navigate('/error');
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const {uid, email, displayName} = user;
                dispatch(addUser({uid, email, displayName}));
                navigate('/browse');
            } else {
                dispatch(removeUser());
                navigate('/');
            }
        });

        return () => unsubscribe(); // Clean up the observer on unmount
    }, [dispatch]);
    const handleChangeLanguage = (e) => {
        dispatch(changeLanguage(e.target.value))
    }

    return (
        <div
            className="flex justify-between items-center px-8 fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black">
            <img className='w-36' src={netflixLogo} alt="Netflix Logo"/>
            {user && (
                <div className="flex items-center space-x-4">
                    {showGptSearch && <select className="p-2 rounded-lg bg-transparent border border-white text-red-700 "
                             onChange={handleChangeLanguage}>
                        {SUPPORTED_CONST.map((language) => (
                            <option key={language.identifier} value={language.identifier}>{language.identifier}</option>
                        ))}
                    </select>}
                    <p className="text-white">{`Hello, ${user.displayName}`}</p>
                    <img className="w-10 h-10 rounded-full" src={watchingUserLogo} alt="User Logo"/>
                    <div className="flex items-center space-x-4">
                        <button
                            className="bg-transparent border border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition duration-300"
                            onClick={handleGptSearchClick}
                        >
                            <FontAwesomeIcon icon={faSearch} className="text-2xl pr-1"/>
                            {showGptSearch ? "Home Page" : "GPT Page"}
                        </button>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="bg-transparent border border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition duration-300"

                    >
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
