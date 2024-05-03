// components/MovieList.jsx
import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies,title }) => {
    return (
        <div className="p-4 text-white">
            <h1 className="text-4xl font-bold mb-6">{title}</h1>
            <div className="flex overflow-x-scroll space-x-4 no-scrollbar">
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default MovieList;
