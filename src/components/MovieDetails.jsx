import React, { useState } from 'react';
import useFetchMovieDetails from '../hooks/useFetchMovieDetails';
import ReactPlayer from 'react-player';
import { FaPlay, FaPlus, FaShareAlt, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CommentSection from '../components/CommentSection';

const MovieDetails = ({ movieId }) => {
    const { movie, loading, error } = useFetchMovieDetails(movieId, 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZDI0Y2I5MDlkYTNjNjU2MGJiNzZmNTA5Yzc4ODQ3NSIsInN1YiI6IjY2MzJmZjllODEzY2I2MDEyNzg2YzQ4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bu0BdsQl6Sjm7gTyGOuuqET6QBLluwZtc1_QuOb8SNc');
    const [showTrailer, setShowTrailer] = useState(false);
    const navigate = useNavigate();

    if (loading) return <div className="flex justify-center items-center h-screen"><div className="w-16 h-16 border-4 border-red-600 border-double rounded-full animate-spin"></div></div>;

    if (error) return <div className="flex justify-center items-center h-screen text-white">Error: {error.message}</div>;

    const isTrailerAvailable = movie.videos && movie.videos.results && movie.videos.results.length > 0;

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between py-8">
                    <div className="md:w-1/2 lg:w-2/5">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="md:w-1/2 lg:w-3/5 md:pl-8 mt-8 md:mt-0">
                        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
                        <p className="text-gray-400 mb-4">{movie.tagline}</p>
                        <div className="mb-4">
                            <span className="bg-red-600 text-white px-2 py-1 rounded-full mr-2">
                                {movie.vote_average.toFixed(1)}
                            </span>
                            <span className="text-gray-400">
                                {movie.release_date.slice(0, 4)} · {movie.runtime} min ·{' '}
                                {movie.genres.map((genre) => genre.name).join(', ')}
                            </span>
                        </div>
                        <p className="text-gray-300 leading-relaxed mb-8">
                            {movie.overview}
                        </p>
                        <div className="flex items-center mb-8">
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4 flex items-center"
                                onClick={() => {
                                    if (isTrailerAvailable) {
                                        setShowTrailer(true);
                                    } else {
                                        navigate('/error'); // Navigate to error page
                                    }
                                }}
                            >
                                <FaPlay className="mr-2" /> Play Trailer
                            </button>
                            {/* Other buttons */}
                        </div>
                        <div className="flex items-center mb-8">
                            <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-4 flex items-center">
                                <FaPlus className="mr-2" /> Add to My List
                            </button>
                            <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded flex items-center">
                                <FaShareAlt className="mr-2" /> Share
                            </button>
                        </div>
                        <div className="flex items-center mb-8">
                            <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-4 flex items-center">
                                <FaThumbsUp className="mr-2" /> Like
                            </button>
                            <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded flex items-center">
                                <FaThumbsDown className="mr-2" /> Dislike
                            </button>
                        </div>
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Production Companies</h2>
                            <ul className="list-disc pl-5">
                                {movie.production_companies.map((company, index) => (
                                    <li key={index}>{company.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Production Countries</h2>
                            <ul className="list-disc pl-5">
                                {movie.production_countries.map((country, index) => (
                                    <li key={index}>{country.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4">Spoken Languages</h2>
                            <ul className="list-disc pl-5">
                                {movie.spoken_languages.map((language, index) => (
                                    <li key={index}>{language.english_name}</li>
                                ))}
                            </ul>
                        </div>
                        <CommentSection movieId={movieId} />
                        {showTrailer && (
                            <div className="mb-8">
                                <ReactPlayer
                                    url={`https://www.youtube.com/watch?v=${movie.videos.results[0].key}`}
                                    controls
                                    width="100%"
                                    height="500px"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;