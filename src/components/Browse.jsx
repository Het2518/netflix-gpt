// Browse.js
import React from 'react';
import Header from './Header';
import useNowPlayingMovie from "../hooks/useNowPlayingMovie";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";

const Browse = () => {
    useNowPlayingMovie()
    usePopularMovies()
    useTopRatedMovies()
    useUpcomingMovies()

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
