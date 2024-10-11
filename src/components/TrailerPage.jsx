import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import YouTube from 'react-youtube';
import { PlayIcon, PauseIcon, FilmIcon, CalendarIcon } from '@heroicons/react/24/solid';

const TrailerPage = () => {
    const { movieId } = useParams();
    const [trailers, setTrailers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTrailer, setSelectedTrailer] = useState(null);
    const [trailerStates, setTrailerStates] = useState({});

    useEffect(() => {
        const fetchTrailers = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US&api_key=c0e031fd04b79db5624e2fd057284926`);
                setTrailers(response.data.results);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching trailers:', err);
                setError(err.message);
                setLoading(false);
            }
        };
        fetchTrailers();
    }, [movieId]);

    useEffect(() => {
        if (trailers.length > 0 && !selectedTrailer) {
            setSelectedTrailer(trailers[0]);
            setTrailerStates(prev => ({...prev, [trailers[0].id]: false}));
        }
    }, [trailers, selectedTrailer]);

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
    };

    const handleVideoStateChange = (event, trailerId) => {
        setTrailerStates(prev => ({...prev, [trailerId]: event.data === 1}));
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
            <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-black text-white">
                <h2 className="text-3xl font-bold mb-4">Oops! Something went wrong</h2>
                <p className="text-gray-400">{error}</p>
            </div>
        );
    }

    if (!trailers || trailers.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-black text-white">
                <h2 className="text-3xl font-bold mb-4">No Trailers Available</h2>
                <p className="text-gray-400">Sorry, we couldn't find any trailers for this movie.</p>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
            <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
                <h1 className="text-4xl font-extrabold mb-8 text-center md:text-left">{selectedTrailer ? selectedTrailer.name : 'Trailers'}</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Trailer player section */}
                    <div className="md:col-span-2">
                        {selectedTrailer && (
                            <div className="aspect-w-16 aspect-h-9">
                                <YouTube videoId={selectedTrailer.key} opts={opts} onStateChange={(event) => handleVideoStateChange(event, selectedTrailer.id)} />
                            </div>
                        )}
                    </div>

                    {/* Trailer list section */}
                    <div className="space-y-8">
                        <div className="bg-gray-800 rounded-3xl p-8 shadow-2xl">
                            <h2 className="text-3xl font-semibold mb-6 border-b border-gray-700 pb-4 text-center sm:text-left">All Trailers</h2>
                            <div className="space-y-4 max-h-[calc(100vh-20rem)] overflow-y-auto hidden-scrollbar">
                                {trailers.map((trailer) => (
                                    <div
                                        key={trailer.id}
                                        onClick={() => setSelectedTrailer(trailer)}
                                        className={`p-4 rounded-lg cursor-pointer transition duration-300 ${
                                            selectedTrailer && selectedTrailer.id === trailer.id
                                                ? 'bg-gray-700 hover:bg-gray-600'
                                                : 'bg-gray-800 hover:bg-gray-700'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium">{trailer.name}</h4>
                                            {selectedTrailer && trailer.id === selectedTrailer.id ? (
                                                trailerStates[trailer.id] ? (
                                                    <PauseIcon className="w-5 h-5 mr-2 text-blue-400"/>
                                                ) : (
                                                    <PlayIcon className="w-5 h-5 mr-2 text-blue-400"/>
                                                )
                                            ) : (
                                                <PlayIcon className="w-5 h-5 mr-2 text-blue-400"/>
                                            )}
                                        </div>
                                        <div className="mt-2 text-sm text-gray-300">
                                            <p className="flex items-center">
                                                <FilmIcon className="w-5 h-5 mr-2 text-blue-400"/>
                                                {trailer.type}
                                            </p>
                                            <p className="flex items-center">
                                                <CalendarIcon className="w-5 h-5 mr-2 text-green-400"/>
                                                Published: {new Date(trailer.published_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrailerPage;
