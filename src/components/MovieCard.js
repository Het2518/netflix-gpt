// MovieCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    return (
        <Link to={`/movie/${movie.id}`}>
            <div className="flex-shrink-0 group">
                <div className="relative overflow-hidden rounded-lg shadow-lg transition duration-300 transform group-hover:scale-105">
                    <img
                        alt='Movie Card'
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                    <div className="absolute bottom-0 left-0 p-4 text-white opacity-0 group-hover:opacity-100 transition duration-300">
                        <h2 className="text-lg md:text-xl font-semibold mb-2">{movie.title}</h2>
                        <p className="text-sm md:text-base">{movie.release_date.slice(0, 4)}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;