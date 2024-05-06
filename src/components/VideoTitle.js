// VideoTitle.jsx
import React from 'react';
import { FaPlay, FaInfoCircle } from "react-icons/fa";

const VideoTitle = ({ title, overview }) => {
    return (
        <div className="absolute bottom-0 left-0 w-full px-4 py-8 md:px-8 md:py-12 text-white z-10">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">{title}</h1>
            <p className="text-sm md:text-lg mb-4 md:mb-8 w-full md:w-1/4">{overview}</p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <button className="bg-white text-black py-2 px-6 md:py-4 md:px-12 text-sm md:text-xl rounded-lg hover:bg-opacity-80 flex items-center">
                    <FaPlay className="inline-block mr-2" /> Play
                </button>
                <button className="bg-gray-500 py-2 px-6 md:px-12 rounded-lg text-sm md:text-xl bg-opacity-50 flex items-center">
                    <FaInfoCircle className="inline-block mr-2" /> More Info
                </button>
            </div>
        </div>
    );
};

export default VideoTitle;