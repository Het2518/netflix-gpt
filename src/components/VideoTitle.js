// VideoTitle.jsx
import React from 'react';
import {FaPlay, FaInfoCircle} from "react-icons/fa";

const VideoTitle = ({ title, overview }) => {
    return (
        <div className="absolute bottom-0 left-0 w-full top-48 px-8 py-12 text-white z-10">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-lg mb-8 w-1/4">{overview}</p>
            <div className="flex space-x-4">
                <button className="bg-white text-black p-4 px-12 text-xl rounded-lg hover:bg-opacity-80">
                    <FaPlay className="inline-block mr-2" /> Play
                </button>
                <button className="bg-gray-500 px-12 p-4 rounded-lg text-xl bg-opacity-50">
                    <FaInfoCircle className="inline-block mr-2" /> More Info
                </button>
            </div>
        </div>
    );
};

export default VideoTitle;
