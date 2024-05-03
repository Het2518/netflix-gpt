import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    // Truncate the overview to 50 words


    return (
        <div className="w-64 pr-3 flex-shrink-0 cursor-pointer transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            <Link to={`/movie/${movie.id}`}>
                <div className="relative">
                    <img alt='Movie Card' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="w-full h-48 object-cover rounded-lg" />
                    <div className="absolute bottom-0 left-0 p-2 bg-black bg-opacity-50 text-white w-full">
                        <h2 className="text-sm font-semibold">{movie.title}</h2>

                    </div>
                </div>
            </Link>
        </div>
    );
};

export default MovieCard;
