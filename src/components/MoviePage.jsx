// MoviePage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import MovieDetails from './MovieDetails'; // Ensure this import path is correct

const MoviePage = () => {
    const { movieId } = useParams();
    return <MovieDetails movieId={movieId} />;
};

export default MoviePage;
