import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {options} from "../utils/constants";
import {addPopularMovies, addUpcomingMovies} from "../utils/moviesSlice";

const useUpcomingMovies = () => {
    const dispatch = useDispatch();
    const getUpcomingMovies = async () => {
        try {
            const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', options);
            const json = await response.json();
            // console.log(json.results);
            dispatch(addUpcomingMovies(json.results));
        } catch (error) {
            console.error('Error fetching now playing movies:', error);
        }
    };

    useEffect(() => {
        getUpcomingMovies()
    }, []);
};

export default useUpcomingMovies;