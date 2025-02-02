import React, { useState } from 'react';
import Header from './Header';
import useNowPlayingMovie from "../hooks/useNowPlayingMovie";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

const Browse = () => {
    const showGptSearch = useSelector(state => state.gpt.showGptSearch)
    const [showChat, setShowChat] = useState(false);
    
    useNowPlayingMovie()
    usePopularMovies()
    useTopRatedMovies()
    useUpcomingMovies()

    return (
        <div className="relative">
            <Header/>
            {
                showGptSearch ? <GptSearch/> :
                    (
                        <>
                            <MainContainer/>
                            <SecondaryContainer/>
                        </>
                    )
            }

            {/* Chat Button */}
            <button 
                onClick={() => setShowChat(!showChat)}
                className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg z-50"
            >
                <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    {showChat ? (
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M6 18L18 6M6 6l12 12"
                        />
                    ) : (
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                    )}
                </svg>
            </button>

            {/* Chat Interface */}
            {showChat && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 ">
                    <div className="bg-white rounded-lg shadow-xl w-full h-full md:w-3/4 md:h-5/6 relative">
                        <iframe
                            src="https://app.vectorshift.ai/chatbots/deployed/679f527e0cf40518b77e3364"
                            className="w-full h-full rounded-lg"
                            allow="clipboard-read; clipboard-write; microphone"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Browse;