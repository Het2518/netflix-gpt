// Browse.js
import React from 'react';
import Header from './Header';
import useNowPlayingMovie from "../hooks/useNowPlayingMovie";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
    useNowPlayingMovie()
    return (
        <div>
            <Header/>
            <MainContainer/>
            <SecondaryContainer/>
            {/* Render your nowPlayingMovies here */}
        </div>
    );
};

export default Browse;
