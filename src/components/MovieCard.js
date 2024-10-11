import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Calendar } from 'lucide-react';

const MovieCard = ({ movie }) => {
    return (
        <Link to={`/movie/${movie.id}`} className="block">
            <div className="group relative h-full">
                <div className="aspect-[2/3] overflow-hidden rounded-xl bg-gray-900 shadow-xl transition-all duration-300 ease-in-out group-hover:shadow-2xl">
                    <img
                        alt={movie.title || 'Movie Poster'}
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/api/placeholder/500/750'}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <h2 className="text-lg font-bold text-white line-clamp-2 md:text-xl">
                            {movie.title}
                        </h2>
                        <div className="mt-2 flex items-center gap-3 text-sm text-gray-300">
                            <div className="flex items-center">
                                <Calendar className="mr-1 h-4 w-4" />
                                <span>{movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}</span>
                            </div>
                            <div className="flex items-center">
                                <Star className="mr-1 h-4 w-4 fill-yellow-500 text-yellow-500" />
                                <span>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile-optimized overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-3 transition-opacity md:hidden">
                    <h2 className="text-sm font-semibold text-white line-clamp-1">
                        {movie.title}
                    </h2>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;