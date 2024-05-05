// useMovieTrailer.js
import  { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { options } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";

const UseMovieTrailer = ({ movieId }) => {
    const dispatch = useDispatch();

    const getMovieVideos = async (movieId) => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options);
        const json = await data.json();
        // console.log("Movie video details:- ", json);

        const filterTrailer = json.results.filter(video => video.name === 'Official Trailer');
        const trailer = filterTrailer.length ? filterTrailer[0] : json.results[0];
        // console.log("Trailer:- ", trailer);
        dispatch(addTrailerVideo(trailer));
    }

    useEffect(() => {
        getMovieVideos(movieId);
    }, [movieId, getMovieVideos]); // Include the missing dependency

};

export default UseMovieTrailer;