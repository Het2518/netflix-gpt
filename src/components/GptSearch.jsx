import React from 'react';
import GptSearchBar from "./GptSearchBar";
import GptSearchSuggestions from "./GptSearchSuggestions";

const GptSearch = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <GptSearchBar />
            <GptSearchSuggestions />
        </div>
    );
};

export default GptSearch;
