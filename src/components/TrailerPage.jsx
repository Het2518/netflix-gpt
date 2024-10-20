import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import {
    Play,
    Pause,
    Film,
    Calendar,
    Share2,
    Info,
    Loader
} from 'lucide-react';

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
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US&api_key=c0e031fd04b79db5624e2fd057284926`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch trailers');
                }
                const data = await response.json();
                setTrailers(data.results);
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
            setTrailerStates(prev => ({ ...prev, [trailers[0].id]: false }));
        }
    }, [trailers, selectedTrailer]);

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 0,
            modestbranding: 1,
            rel: 0,
        },
    };

    const handleVideoStateChange = (event, trailerId) => {
        setTrailerStates(prev => ({ ...prev, [trailerId]: event.data === 1 }));
    };

    const handleShare = async (trailer) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: trailer.name,
                    url: `https://www.youtube.com/watch?v=${trailer.key}`
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            // Fallback for browsers that don't support Web Share API
            navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${trailer.key}`);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
                <div className="flex flex-col items-center gap-4">
                    <Loader className="w-12 h-12 text-red-600 animate-spin" />
                    <p className="text-white text-lg">Loading trailers...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
                <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full text-center">
                    <Info className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h2>
                    <p className="text-gray-400">{error}</p>
                </div>
            </div>
        );
    }

    if (!trailers || trailers.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
                <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full text-center">
                    <Film className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">No Trailers Available</h2>
                    <p className="text-gray-400">Sorry, we couldn't find any trailers for this movie.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">
                        {selectedTrailer ? selectedTrailer.name : 'Trailers'}
                    </h1>
                    {selectedTrailer && (
                        <button
                            onClick={() => handleShare(selectedTrailer)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            <Share2 className="w-4 h-4" />
                            <span>Share</span>
                        </button>
                    )}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Video Player Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {selectedTrailer && (
                            <>
                                <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-800 shadow-xl">
                                    <YouTube
                                        videoId={selectedTrailer.key}
                                        opts={opts}
                                        onStateChange={(event) => handleVideoStateChange(event, selectedTrailer.id)}
                                        className="w-full h-full"
                                    />
                                </div>
                                <div className="bg-gray-800/50 rounded-xl p-6">
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex items-center gap-2">
                                            <Film className="w-5 h-5 text-blue-400" />
                                            <span>{selectedTrailer.type}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-5 h-5 text-green-400" />
                                            <span>{new Date(selectedTrailer.published_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Trailer List Section */}
                    <div className="bg-gray-800/50 rounded-xl p-6">
                        <h2 className="text-xl font-semibold mb-4">All Trailers</h2>
                        <div className="space-y-4 max-h-[calc(100vh-24rem)] overflow-y-auto custom-scrollbar">
                            {trailers.map((trailer) => (
                                <div
                                    key={trailer.id}
                                    onClick={() => setSelectedTrailer(trailer)}
                                    className={`p-4 rounded-lg cursor-pointer transition-all duration-200 
                    ${selectedTrailer && selectedTrailer.id === trailer.id
                                        ? 'bg-gray-700 ring-2 ring-blue-500'
                                        : 'bg-gray-800/50 hover:bg-gray-700'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-medium line-clamp-1">{trailer.name}</h4>
                                        {selectedTrailer && trailer.id === selectedTrailer.id ? (
                                            trailerStates[trailer.id] ? (
                                                <Pause className="w-5 h-5 text-blue-400" />
                                            ) : (
                                                <Play className="w-5 h-5 text-blue-400" />
                                            )
                                        ) : (
                                            <Play className="w-5 h-5 text-blue-400" />
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-3 text-sm text-gray-300">
                    <span className="flex items-center gap-1">
                      <Film className="w-4 h-4 text-blue-400" />
                        {trailer.type}
                    </span>
                                        <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-green-400" />
                                            {new Date(trailer.published_at).toLocaleDateString()}
                    </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrailerPage;