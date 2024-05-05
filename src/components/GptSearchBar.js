// GptSearchBar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import language from "../utils/language";
import netflixBGImage from "../assets/netflix-background-image.jpg";

const GptSearchBar = () => {
    const languageKey = useSelector(store => store.config.language);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            setIsSearching(true);
            if (searchText.trim() === '') {
                setSearchResults([]);
                setIsSearching(false);
                return;
            }
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=cd24cb909da3c6560bb76f509c788475&query=${searchText}`);
            const data = await response.json();
            setSearchResults(data.results);
            setIsSearching(false);
        };

        fetchMovies();
    }, [searchText]);

    return (
        <div className="relative h-full">
            <img
                src={netflixBGImage}
                alt="Background Image"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 flex justify-center items-center">
                <div className="w-full max-w-md">
                    <form className="flex items-center mb-4">
                        <input
                            className="w-full py-4 px-6 rounded-l-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                            type="text"
                            placeholder={language[languageKey].gptSearchBarPlaceholder}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            aria-label="Search Movies"
                        />
                        <button
                            className="bg-red-600 text-white py-4 px-6 rounded-r-full hover:bg-red-700 focus:outline-none focus:bg-red-700 transition duration-150 ease-in-out"
                            type="submit"
                            aria-label="Search"
                            disabled={isSearching}
                        >
                            {isSearching ? (
                                <svg className="w-6 h-6 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            )}
                        </button>
                    </form>
                    {searchResults.length > 0 && (
                        <div className="max-h-96 overflow-y-auto custom-scrollbar bg-gray-900 rounded-lg shadow-lg">
                            {searchResults.map((movie, index) => (
                                <div
                                    key={index}
                                    className="p-4 text-white hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
                                    onClick={() => navigate(`/movie/${movie.id}`)}
                                >
                                    <h3 className="text-xl font-semibold">{movie.title}</h3>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GptSearchBar;