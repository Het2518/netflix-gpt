import React from 'react';

const GptSearchSuggestions = () => {
    const movieSuggestions = ['Inception', 'The Dark Knight', 'Interstellar', 'Joker', 'The Prestige'];

    return (
        <div className="w-full max-w-md mx-auto mt-8 bg-black rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4">
                <h3 className="text-lg font-semibold text-white">Movie Suggestions</h3>
            </div>
            <ul className="divide-y divide-gray-800">
                {movieSuggestions.map((movie, index) => (
                    <li key={index} className="flex items-center px-6 py-4 hover:bg-gray-800">
                        <span className="text-white">{movie}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GptSearchSuggestions;
