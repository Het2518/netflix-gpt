import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {options} from "../utils/constants";
import {addNowPlayingMovies} from "../utils/moviesSlice";

const UseNowPlayingMovie = () => {
    const dispatch = useDispatch();
    const getNowPlayingMovies = async () => {
        try {
            const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options);
            const json = await response.json();
            // console.log(json.results);
            dispatch(addNowPlayingMovies(json.results));
        } catch (error) {
            console.error('Error fetching now playing movies:', error);
        }
    };

    useEffect(() => {
        getNowPlayingMovies()
    }, []);
};

export default UseNowPlayingMovie;