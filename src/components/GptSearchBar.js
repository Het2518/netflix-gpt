import React from 'react';
import netflixBGImage from "../assets/netflix-background-image.jpg";
import language from "../utils/language";
import {useSelector} from "react-redux";

const GptSearchBar = () => {
    const languageKey = useSelector(store => store.config.language)
    return (
        <div className="w-full max-w-md mx-auto bg-black rounded-lg shadow-xl overflow-hidden">
            <img
                src={netflixBGImage}
                alt="Netflix Background"
                className="absolute inset-0 object-cover w-full h-full opacity-80"
            />
            <div className="relative flex items-center justify-between px-6 py-4 gap-4">
                <input
                    className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    type="text" placeholder={language[languageKey].gptSearchBarPlaceholder}/>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-150 ease-in-out"
                    type="submit">
                    {language[languageKey].search}
                </button>
            </div>
        </div>
    );
};

export default GptSearchBar;
