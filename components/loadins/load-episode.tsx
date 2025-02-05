import React, { useState, useEffect } from 'react';

const LoadEpisode: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            setIsLoaded(true);
        }, 1000); // Adjust the timeout as needed
    }, []);
    return (
        <div id='showContainer'>
            <div className='podcast'>
                <div className={`loadEpisode ${isLoaded ? 'loaded' : ''} animate-pulse`}></div>
                <div className={`loadEpisode ${isLoaded ? 'loaded' : ''} animate-pulse`}></div>
                <div className={`loadEpisode ${isLoaded ? 'loaded' : ''} animate-pulse`}></div>
                <div className={`loadEpisode ${isLoaded ? 'loaded' : ''} animate-pulse`}></div>
                <div className={`loadEpisode ${isLoaded ? 'loaded' : ''} animate-pulse`}></div>
                <div className={`loadEpisode ${isLoaded ? 'loaded' : ''} animate-pulse`}></div>
                <div className={`loadEpisode ${isLoaded ? 'loaded' : ''} animate-pulse`}></div>
                <div className={`loadEpisode ${isLoaded ? 'loaded' : ''} animate-pulse`}></div>
            </div>
        </div>
    );
};

export default LoadEpisode;
