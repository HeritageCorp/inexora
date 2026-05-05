import React from 'react';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Welcome to Inexora V2</h1>
            <p className="text-lg text-center mb-8">
                Transforming your experience with real-time features and a seamless interface.
            </p>
            <a href="/feed" className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-2 px-4 rounded shadow-lg hover:shadow-xl transition-shadow duration-300">
                Go to Feed
            </a>
        </div>
    );
};

export default HomePage;