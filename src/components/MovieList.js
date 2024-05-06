// MovieList.jsx
import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, title }) => {
    return (
        <div className="text-white md:pl-8 pl-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">{title}</h2>
            <div className="flex overflow-x-auto space-x-4 no-scrollbar">
                {movies.map(movie => (
                    <div className="w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 flex-shrink-0">
                        <MovieCard key={movie.id} movie={movie} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieList;