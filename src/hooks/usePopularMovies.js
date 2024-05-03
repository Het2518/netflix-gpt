import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {options} from "../utils/constants";
import {addPopularMovies} from "../utils/moviesSlice";

const usePopularMovies = () => {
    const dispatch = useDispatch();
    const getPopularMovies = async () => {
        try {
            const response = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', options);
            const json = await response.json();
            // console.log(json.results);
            dispatch(addPopularMovies(json.results));
        } catch (error) {
            console.error('Error fetching now playing movies:', error);
        }
    };

    useEffect(() => {
        getPopularMovies()
    }, []);
};

export default usePopularMovies;