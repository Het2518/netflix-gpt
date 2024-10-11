import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {
    doc, collection, setDoc, deleteDoc, onSnapshot
} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {db} from '../utils/firebase';
import {
    PlayIcon,
    PlusIcon,
    ShareIcon,
    HeartIcon,
    ClockIcon,
    CurrencyDollarIcon,
    LanguageIcon,
    StarIcon,
    GlobeAltIcon,
    FilmIcon,
    CalendarIcon,
    UserGroupIcon,
} from '@heroicons/react/24/solid';
import CommentSection from './CommentSection';
import useFetchMovieDetails from '../hooks/useFetchMovieDetails';

const MovieDetails = ({movieId}) => {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    const {
        movie,
        loading,
        error
    } = useFetchMovieDetails(movieId, "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMGUwMzFmZDA0Yjc5ZGI1NjI0ZTJmZDA1NzI4NDkyNiIsIm5iZiI6MTcyODU3MzcwNC42NDI3ODgsInN1YiI6IjY2MzI1ZmY4NjY1NjVhMDEyYzEzNGI5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2KP3_w6cqwroofHggXArvPhHwSGFkTl5hR07boaAYW8");

    useEffect(() => {
        if (!auth.currentUser) return;

        const likesRef = collection(doc(db, 'movies', movieId), 'likes');
        const unsubscribe = onSnapshot(likesRef, (snapshot) => {
            setLikes(snapshot.docs.length);
            setIsLiked(snapshot.docs.some(doc => doc.id === auth.currentUser.uid));
        });

        return () => unsubscribe();
    }, [movieId, auth.currentUser]);

    const handleLike = async () => {
        if (!auth.currentUser) {
            navigate('/signin');
            return;
        }

        const likeRef = doc(db, 'movies', movieId, 'likes', auth.currentUser.uid);

        if (isLiked) {
            await deleteDoc(likeRef);
        } else {
            await setDoc(likeRef, {
                userId: auth.currentUser.uid,
                timestamp: new Date()
            });
        }
    };


    const handleWatchTrailer = () => {
        navigate(`/trailer/${movieId}`);
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-black">
                <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-black text-white">
                <h2 className="text-3xl font-bold mb-4">Oops! Something went wrong</h2>
                <p className="text-gray-400">{error.message}</p>
            </div>
        );
    }

    if (!movie) return null;

    return (
        <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
            {/* Immersive Hero Section */}
            <div className="relative h-screen">
                <div className="absolute inset-0">
                    {movie.backdrop_path && (
                        <img
                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                        />
                    )}
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
                </div>


                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-4 animate-fade-in-up">{movie.title}</h1>
                        {movie.tagline && (
                            <p className="text-2xl md:text-3xl text-gray-300 mb-8 italic animate-fade-in-up animation-delay-300">"{movie.tagline}"</p>
                        )}
                        <div
                            className="flex flex-wrap justify-center gap-4 mb-8 animate-fade-in-up animation-delay-600">
                            <button
                                onClick={handleWatchTrailer}
                                className="flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full transition duration-300 transform hover:scale-105"
                            >
                                <PlayIcon className="w-5 h-5 mr-2"/>
                                Watch Trailer
                            </button>
                            <button
                                onClick={handleLike}
                                className={`flex items-center ${isLiked ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-700 hover:bg-gray-600'} text-white px-6 py-3 rounded-full transition duration-300 transform hover:scale-105`}
                            >
                                <HeartIcon className="w-5 h-5 mr-2"/>
                                {likes} {likes === 1 ? 'Like' : 'Likes'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-gray-900 to-transparent">
                    <div className="flex flex-wrap justify-center gap-8 text-sm md:text-base">
                        {movie.vote_average !== undefined && (
                            <div className="flex items-center">
                                <StarIcon className="w-5 h-5 mr-2 text-yellow-400"/>
                                <span>{movie.vote_average.toFixed(1)} Rating</span>
                            </div>
                        )}
                        {movie.runtime && (
                            <div className="flex items-center">
                                <ClockIcon className="w-5 h-5 mr-2 text-blue-400"/>
                                <span>{movie.runtime} min</span>
                            </div>
                        )}
                        {movie.release_date && (
                            <div className="flex items-center">
                                <CalendarIcon className="w-5 h-5 mr-2 text-green-400"/>
                                <span>{new Date(movie.release_date).getFullYear()}</span>
                            </div>
                        )}
                        {movie.original_language && (
                            <div className="flex items-center">
                                <LanguageIcon className="w-5 h-5 mr-2 text-purple-400"/>
                                <span>{movie.original_language.toUpperCase()}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        <div
                            className="bg-gray-800 rounded-3xl p-8 shadow-2xl mb-12 transform hover:scale-105 transition duration-300">
                            <h2 className="text-3xl font-semibold mb-6 border-b border-gray-700 pb-4">Overview</h2>
                            <p className="text-gray-300 leading-relaxed text-lg">{movie.overview}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            {movie.genres && movie.genres.length > 0 && (
                                <div
                                    className="bg-gray-800 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition duration-300">
                                    <h3 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-4">Genres</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {movie.genres.map((genre) => (
                                            <span key={genre.id} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {movie.production_companies && movie.production_companies.length > 0 && (
                                <div
                                    className="bg-gray-800 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition duration-300">
                                    <h3 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-4">Production</h3>
                                    <ul className="text-gray-300">
                                        {movie.production_companies.map((company) => (
                                            <li key={company.id} className="flex items-center mb-2">
                                                {company.logo_path && (
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                                                        alt={company.name}
                                                        className="w-8 h-8 object-contain mr-2"
                                                    />
                                                )}
                                                {company.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Comment Section */}
                        <div className="bg-gray-800 rounded-3xl p-8 shadow-2xl">
                            <h2 className="text-3xl font-semibold mb-6 border-b border-gray-700 pb-4">Comments</h2>
                            <CommentSection movieId={movieId}/>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {movie.poster_path && (
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full rounded-3xl shadow-2xl transform hover:scale-105 transition duration-300"
                            />
                        )}

                        <div
                            className="bg-gray-800 rounded-3xl p-6 shadow-2xl space-y-6 transform hover:scale-105 transition duration-300">
                            {movie.status && (
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 border-b border-gray-700 pb-2">Status</h3>
                                    <p className="text-gray-300 flex items-center">
                                        <FilmIcon className="w-5 h-5 mr-2 text-blue-400"/>
                                        {movie.status}
                                    </p>
                                </div>
                            )}

                            {movie.budget > 0 && (
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 border-b border-gray-700 pb-2">Budget</h3>
                                    <p className="text-gray-300 flex items-center">
                                        <CurrencyDollarIcon className="w-5 h-5 mr-2 text-green-400"/>
                                        {movie.budget.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
                                    </p>
                                </div>
                            )}

                            {movie.revenue > 0 && (
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 border-b border-gray-700 pb-2">Revenue</h3>
                                    <p className="text-gray-300 flex items-center">
                                        <CurrencyDollarIcon className="w-5 h-5 mr-2 text-green-400"/>
                                        {movie.revenue.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
                                    </p>
                                </div>
                            )}

                            {movie.popularity !== undefined && (
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 border-b border-gray-700 pb-2">Popularity</h3>
                                    <p className="text-gray-300 flex items-center">
                                        <StarIcon className="w-5 h-5 mr-2 text-yellow-400"/>
                                        {movie.popularity.toFixed(2)}
                                    </p>
                                </div>
                            )}

                            {movie.spoken_languages && movie.spoken_languages.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 border-b border-gray-700 pb-2">Languages</h3>
                                    <ul className="text-gray-300 grid grid-cols-2 gap-2">
                                        {movie.spoken_languages.map((language, index) => (
                                            <li key={index} className="flex items-center">
                                                <LanguageIcon className="w-5 h-5 mr-2 text-purple-400"/>
                                                {language.english_name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {movie.production_countries && movie.production_countries.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 border-b border-gray-700 pb-2">Countries</h3>
                                    <ul className="text-gray-300 grid grid-cols-2 gap-2">
                                        {movie.production_countries.map((country, index) => (
                                            <li key={index} className="flex items-center"><GlobeAltIcon
                                                className="w-5 h-5 mr-2 text-blue-400"/>
                                                {country.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {movie.homepage && (
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 border-b border-gray-700 pb-2">Official
                                        Website</h3>
                                    <a
                                        href={movie.homepage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300 flex items-center transform hover:translate-x-2 transition duration-300"
                                    >
                                        <GlobeAltIcon className="w-5 h-5 mr-2"/>
                                        Visit Website
                                    </a>
                                </div>
                            )}

                            {movie.imdb_id && (
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 border-b border-gray-700 pb-2">IMDB</h3>
                                    <a
                                        href={`https://www.imdb.com/title/${movie.imdb_id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-yellow-400 hover:text-yellow-300 flex items-center transform hover:translate-x-2 transition duration-300"
                                    >
                                        <img src="/imdb-logo.png" alt="IMDB Logo" className="w-8 h-8 mr-2"/>
                                        View on IMDB
                                    </a>
                                </div>
                            )}
                        </div>

                        {movie.belongs_to_collection && (
                            <div
                                className="bg-gray-800 rounded-3xl p-6 shadow-2xl transform hover:scale-105 transition duration-300">
                                <h3 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Part of
                                    Collection</h3>
                                <div className="relative">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.belongs_to_collection.poster_path}`}
                                        alt={movie.belongs_to_collection.name}
                                        className="w-full rounded-2xl mb-4"
                                    />
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent rounded-2xl"></div>
                                    <p className="absolute bottom-4 left-4 right-4 text-center font-semibold text-lg text-white">
                                        {movie.belongs_to_collection.name}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;