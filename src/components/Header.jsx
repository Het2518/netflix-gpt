// Header.jsx
import React, {useEffect, useState, useCallback} from 'react';
import watchingUserLogo from '../assets/watchingUserLogo.png';
import movieLogo from '../assets/moviemingle-high-resolution-logo-transparent.svg';
import {auth} from '../utils/firebase';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addUser, removeUser} from "../utils/userSlice";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars, faSearch} from '@fortawesome/free-solid-svg-icons';
import {toggleGptSearchView} from "../utils/gptSlice";
import {SUPPORTED_CONST} from "../utils/constants";
import {changeLanguage} from "../utils/configSlice";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    const showGptSearch = useSelector(state => state.gpt.showGptSearch);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleGptSearchClick = useCallback(() => {
        dispatch(toggleGptSearchView());
    }, [dispatch]);

    const handleSignOut = useCallback(() => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
            })
            .catch(() => {
                // Handle error and navigate to error page
                navigate('/error');
            });
    }, [navigate]);

    const handleHomePage = useCallback(() => {
        navigate('/browse');
    }, [navigate]);

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
    }, [dispatch, navigate]);

    const handleChangeLanguage = useCallback((e) => {
        dispatch(changeLanguage(e.target.value));
    }, [dispatch]);

    return (
        <header className="bg-gradient-to-b from-black fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
                {/* Logo Section */}
                <img
                    className="w-20 md:w-24 cursor-pointer"
                    src={movieLogo}
                    alt="Movie Logo"
                    onClick={handleHomePage}
                />
                {/* Desktop Menu */}
                {user && (
                    <div className="hidden md:flex items-center space-x-4">
                        {showGptSearch && (
                            <select
                                className="p-2 rounded-lg bg-transparent border border-white text-red-700 text-sm md:text-base"
                                onChange={handleChangeLanguage}
                            >
                                {SUPPORTED_CONST.map((language) => (
                                    <option key={language.identifier} value={language.identifier}>
                                        {language.identifier}
                                    </option>
                                ))}
                            </select>
                        )}
                        <p className="text-white">{`Hello, ${user.displayName}`}</p>
                        <img
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full cursor-pointer"
                            src={watchingUserLogo}
                            alt="User Logo"
                        />
                        <div className="flex items-center space-x-2 md:space-x-4">
                            <button
                                className="bg-transparent border border-white text-white px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-white hover:text-black transition duration-300"
                                onClick={handleGptSearchClick}
                            >
                                <FontAwesomeIcon icon={faSearch} className="text-lg md:text-2xl pr-1"/>
                                {showGptSearch ? "Home Page" : "GPT Page"}
                            </button>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="bg-transparent border border-white text-white px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-white hover:text-black transition duration-300"
                        >
                            Sign Out
                        </button>
                    </div>
                )}
                {/* Mobile Menu */}
                {user && (
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-white focus:outline-none"
                        >
                            <FontAwesomeIcon icon={faBars} className="text-2xl"/>
                        </button>
                    </div>
                )}
            </div>
            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && user && (
                <div className="md:hidden bg-black/80 backdrop-blur-lg py-4">
                    <div className="px-4 py-2 flex flex-col items-center">
                        {showGptSearch && (
                            <select
                                className="w-full p-2 rounded-lg bg-transparent border border-white text-red-700 text-sm mb-2"
                                onChange={handleChangeLanguage}
                            >
                                {SUPPORTED_CONST.map((language) => (
                                    <option key={language.identifier} value={language.identifier}>
                                        {language.identifier}
                                    </option>
                                ))}
                            </select>
                        )}
                        <p className="text-white mb-2">{`Hello, ${user.displayName}`}</p>
                        <img className="w-16 h-16 rounded-full mb-4" src={watchingUserLogo} alt="User Logo"/>
                        <div className="flex flex-col items-center space-y-2 w-full mb-4">
                            <button
                                className="w-full bg-transparent border border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition duration-300"
                                onClick={handleGptSearchClick}
                            >
                                <FontAwesomeIcon icon={faSearch} className="text-lg pr-1"/>
                                {showGptSearch ? "Home Page" : "GPT Page"}
                            </button>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="w-full bg-transparent border border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition duration-300 mb-4"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
