import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoviePage from './MoviePage';
import Login from "./Login";
import Browse from "./Browse";
import ErrorPage from "./error";
import TrailerPage from "./TrailerPage";

const Body = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/error" element={<ErrorPage />} />
                <Route path="/movie/:movieId" element={<MoviePage />} /> {/* Correct route */}

                <Route path="/trailer/:movieId" element={<TrailerPage />} />
            </Routes>
        </Router>
    );
};

export default Body;
