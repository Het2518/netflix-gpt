import React, {useRef} from 'react';
import netflixBGImage from "../assets/netflix-background-image.jpg";
import language from "../utils/language";
import {useSelector} from "react-redux";
import openai from "../utils/openai";

const GptSearchBar = () => {
    const languageKey = useSelector(store => store.config.language)
    const searchText = useRef(null)
    const handleGptSearchClick = async () => {
        console.log(searchText.current.value);

        const gptSearchResult = await openai.chat.completions.create({
            messages: [{role: 'user', content: searchText.current.value}],
            model: 'gpt-3.5-turbo',
        });
        console.log(gptSearchResult.choices)
    };
    return (
        <div className="w-full max-w-md mx-auto bg-black rounded-lg shadow-xl overflow-hidden">
            <img
                src={netflixBGImage}
                alt="Netflix Background"
                className="absolute inset-0 object-cover w-full h-full opacity-80"
            />
            <form className="relative flex items-center justify-between px-6 py-4 gap-4" onSubmit={(e) =>
                e.preventDefault()
            }>
                <input
                    className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    type="text" placeholder={language[languageKey].gptSearchBarPlaceholder} ref={searchText}/>
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-150 ease-in-out"
                    type="submit"
                    onClick={handleGptSearchClick}
                >
                    {language[languageKey].search}
                </button>
            </form>
        </div>
    );
};

export default GptSearchBar;
