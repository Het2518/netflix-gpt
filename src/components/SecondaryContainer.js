import React from 'react';
import MovieList from "./MovieList";
import {useSelector} from "react-redux";

const SecondaryContainer = () => {
    const movies = useSelector(state => state.movies)
    return (
        movies.nowPlayingMovies.length > 0 && movies.popularMovies.length > 0 &&
        movies.topRatedMovies.length > 0 && movies.upcomingMovies.length > 0  &&
        (
            <div className='bg-black'>
                <div className='-mt-40 pl-4 z-20 relative'>
                    <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
                    <MovieList title={"Upcoming"} movies={movies.upcomingMovies}/>
                    <MovieList title={"Popular"} movies={movies.popularMovies}/>
                    <MovieList title={"Top Rated"} movies={movies.topRatedMovies}/>
                </div>
            </div>
        )
    );
};

export default SecondaryContainer;