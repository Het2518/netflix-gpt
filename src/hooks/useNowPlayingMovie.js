import { useEffect, useCallback } from 'react';
import { useDispatch } from "react-redux";
import { options } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovie = () => {
    const dispatch = useDispatch();

    const getNowPlayingMovies = useCallback(async () => {
        try {
            const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options);
            const json = await response.json();
            dispatch(addNowPlayingMovies(json.results));
        } catch (error) {
            console.error('Error fetching now playing movies:', error);
        }
    }, [dispatch]); // useCallback ensures the function is stable between renders

    useEffect(() => {
        getNowPlayingMovies(); // Fetch movies when the component mounts
    }, [getNowPlayingMovies]); // Added dependency on the callback function
};

export default useNowPlayingMovie;
