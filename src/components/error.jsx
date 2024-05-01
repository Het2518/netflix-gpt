import React from 'react';
import errorImage from '../assets/error.svg';

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            <image src={errorImage} alt="Error Image" className="w-64 mb-8" />
            <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
            <p className="text-lg mb-8">We're sorry, but it looks like there was an error.</p>
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:bg-red-700">
                Go Home
            </button>
        </div>
    );
};

export default ErrorPage;
