import React, { useEffect } from 'react';
import Header from './Header';
import { options } from '../utils/constants';

const Browse = () => {
    const getNowPlayingMovies = async () => {
        try {
            const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options);
            const json = await response.json();
            console.log(json);
        } catch (error) {
            console.error('Error fetching now playing movies:', error);
        }
    };

    useEffect(() => {
        getNowPlayingMovies().then(() => console.log('API call Successful')).catch(e => console.log(e));
    }, []);

    return (
        <div>
            <Header />
        </div>
    );
};

export default Browse;
