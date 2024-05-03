import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {options} from "../utils/constants";
import {addPopularMovies, addTopRatedMovies} from "../utils/moviesSlice";

const useTopRatedMovies = () => {
    const dispatch = useDispatch();
    const getTopRatedMovies = async () => {
        try {
            const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', options);
            const json = await response.json();
            // console.log(json.results);
            dispatch(addTopRatedMovies(json.results));
        } catch (error) {
            console.error('Error fetching now playing movies:', error);
        }
    };

    useEffect(() => {
        getTopRatedMovies()
    }, []);
};

export default useTopRatedMovies;