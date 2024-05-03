// hooks/useFetchMovieDetails.js
import { useState, useEffect } from 'react';

const useFetchMovieDetails = (movieId, token) => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const options = {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                };

                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options);
                const data = await response.json();
                setMovie(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieId, token]); // Dependency array includes movieId and token

    return { movie, loading, error };
};

export default useFetchMovieDetails;
