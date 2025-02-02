import React, { useState, useEffect } from 'react';
import Header from './Header';
import useNowPlayingMovie from "../hooks/useNowPlayingMovie";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";
import { X, MessageCircle, Maximize2, Minimize2, ArrowLeft } from 'lucide-react';

const Browse = () => {
    const showGptSearch = useSelector(state => state.gpt.showGptSearch);
    const [showChat, setShowChat] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [chatMode, setChatMode] = useState('minimized'); // minimized, expanded, fullscreen

    useNowPlayingMovie();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleChatToggle = () => {
        setShowChat(!showChat);
        document.body.style.overflow = !showChat ? 'hidden' : 'auto';
        setChatMode(isMobile ? 'expanded' : 'minimized');
    };

    const toggleChatMode = () => {
        setChatMode(prev => 
            prev === 'minimized' ? 'expanded' : 
            prev === 'expanded' ? 'fullscreen' : 'minimized'
        );
    };

    const getChatContainerClasses = () => {
        const baseClasses = "fixed transition-all duration-300 bg-white shadow-xl z-[60] ";
        
        switch (chatMode) {
            case 'minimized':
                return baseClasses + "bottom-4 right-4 w-[380px] h-[500px] rounded-lg";
            case 'expanded':
                return baseClasses + "bottom-0 right-0 w-full md:w-[420px] h-[80vh] rounded-t-xl";
            case 'fullscreen':
                return baseClasses + "inset-0 w-full h-full";
            default:
                return baseClasses;
        }
    };

    return (
        <div className="relative min-h-screen bg-black">
            <Header />
            
            <div className={showChat ? 'h-screen overflow-hidden' : ''}>
                {showGptSearch ? (
                    <GptSearch />
                ) : (
                    <>
                        <MainContainer />
                        <SecondaryContainer />
                    </>
                )}
            </div>

            {/* Chat Toggle Button */}
            {!showChat && (
                <button 
                    onClick={handleChatToggle}
                    className="fixed bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg z-50 flex items-center gap-2 transition-transform hover:scale-105"
                >
                    <MessageCircle className="w-6 h-6" />
                    <span className="hidden md:inline font-medium">Chat Support</span>
                </button>
            )}

            {/* Chat Interface */}
            {showChat && (
                <>
                    {/* Backdrop for mobile */}
                    <div 
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={handleChatToggle}
                    />

                    {/* Chat Container */}
                    <div className={getChatContainerClasses()}>
                        {/* Chat Header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-red-600 text-white rounded-t-lg">
                            <div className="flex items-center gap-3">
                                {isMobile && (
                                    <button
                                        onClick={handleChatToggle}
                                        className="p-1 hover:bg-red-700 rounded-lg"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                    </button>
                                )}
                                <h3 className="font-semibold">MovieMingle Chat</h3>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={toggleChatMode}
                                    className="p-1 hover:bg-red-700 rounded-lg transition-colors"
                                >
                                    {chatMode === 'fullscreen' ? (
                                        <Minimize2 className="w-5 h-5" />
                                    ) : (
                                        <Maximize2 className="w-5 h-5" />
                                    )}
                                </button>
                                {!isMobile && (
                                    <button
                                        onClick={handleChatToggle}
                                        className="p-1 hover:bg-red-700 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Chat Content */}
                        <div className="w-full h-[calc(100%-56px)]">
                            <iframe
                                src="https://app.vectorshift.ai/chatbots/deployed/679f527e0cf40518b77e3364"
                                className="w-full h-full"
                                style={{
                                    border: 'none',
                                    borderRadius: '0 0 8px 8px'
                                }}
                                allow="clipboard-read; clipboard-write; microphone"
                                title="MovieMingle Chat"
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Browse;