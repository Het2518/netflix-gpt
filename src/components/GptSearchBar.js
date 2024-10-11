import React, {useState, useEffect, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion';
import {Search, X, Loader2, Star, Calendar} from 'lucide-react';
import debounce from 'lodash/debounce';

const API_KEY = 'cd24cb909da3c6560bb76f509c788475';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieSearch = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const searchMovies = useCallback(async (searchText) => {
        if (!searchText.trim()) {
            setMovies([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchText}`
            );
            const data = await response.json();
            setMovies(data.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const debouncedSearch = useCallback(
        debounce((searchText) => {
            searchMovies(searchText);
        }, 300),
        [searchMovies]
    );

    useEffect(() => {
        debouncedSearch(query);
    }, [query, debouncedSearch]);

    const handleMovieSelect = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-black/90">
            <div className="absolute inset-0 -z-10">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-black"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1}}
                />
            </div>

            <div className="w-full max-w-3xl px-4">
                <motion.div
                    initial={{y: -20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{duration: 0.5}}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">
                        Discover Movies
                    </h1>
                </motion.div>

                <div className="rounded-lg border border-gray-800 bg-black/60 backdrop-blur-md shadow-xl">
                    <div className="flex items-center border-b border-gray-800 px-3">
                        <Search className="mr-2 h-4 w-4 shrink-0 text-gray-400"/>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search movies..."
                            className="flex h-14 w-full rounded-md bg-transparent py-3 text-lg text-white placeholder:text-gray-400 focus:outline-none"
                        />
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin text-gray-400"/>}
                        {query && !isLoading && (
                            <button onClick={() => setQuery('')} className="text-gray-400 hover:text-white">
                                <X className="h-4 w-4"/>
                            </button>
                        )}
                    </div>
                    <div className="max-h-[400px] overflow-y-auto hide-scrollbar">

                        {movies.length === 0 && query && !isLoading && (
                            <div className="py-6 text-center text-gray-400">
                                No movies found.
                            </div>
                        )}
                        <AnimatePresence>
                            {movies.map((movie) => (
                                <motion.div
                                    key={movie.id}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -20}}
                                    transition={{duration: 0.2}}
                                >
                                    <div
                                        onClick={() => handleMovieSelect(movie.id)}
                                        className="px-4 py-3 cursor-pointer hover:bg-gray-800/50"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0 h-16 w-12 overflow-hidden rounded">
                                                <img
                                                    src={movie.poster_path ? `${IMG_BASE_URL}${movie.poster_path}` : '/api/placeholder/120/180'}
                                                    alt={movie.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-white truncate">
                                                    {movie.title}
                                                </p>
                                                <div className="flex items-center mt-1 space-x-2 text-xs text-gray-400">
                                                    <div className="flex items-center">
                                                        <Calendar className="mr-1 h-3 w-3"/>
                                                        <span>{movie.release_date?.split('-')[0] || 'N/A'}</span>
                                                    </div>
                                                    {movie.vote_average > 0 && (
                                                        <div className="flex items-center">
                                                            <Star
                                                                className="mr-1 h-3 w-3 fill-yellow-500 text-yellow-500"/>
                                                            <span>{movie.vote_average.toFixed(1)}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieSearch;