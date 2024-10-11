import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    return (
        <Link to={`/movie/${movie.id}`}>
            <div className="flex-shrink-0 group">
                <div className="relative overflow-hidden rounded-lg shadow-lg transition duration-300 transform group-hover:scale-105">
                    <img
                        alt={movie.title || 'Movie Poster'}
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder-image.jpg'}
                        className="w-full h-auto"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                    <div className="absolute bottom-0 left-0 p-4 text-white opacity-0 group-hover:opacity-100 transition duration-300">
                        <h2 className="text-lg md:text-xl font-semibold mb-2">{movie.title}</h2>
                        <p className="text-sm md:text-base">{movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}</p>
                        <div className="mt-2">
                            <span className="bg-red-600 text-white px-2 py-1 rounded-full text-sm">
                                {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;