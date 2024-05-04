// Browse.js
import React from 'react';
import Header from './Header';
import useNowPlayingMovie from "../hooks/useNowPlayingMovie";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
import {useSelector} from "react-redux";

const Browse = () => {
    const showGptSeacrch = useSelector(state => state.gpt.showGptSearch)
    useNowPlayingMovie()
    usePopularMovies()
    useTopRatedMovies()
    useUpcomingMovies()

    return (
        <div>
            <Header/>
            {
                showGptSeacrch ? <GptSearch/> :
                    (
                        <>
                            <MainContainer/>
                            <SecondaryContainer/>
                        </>
                    )
            }
            
            {/* Render your nowPlayingMovies here */}
        </div>
    );
};

export default Browse;
