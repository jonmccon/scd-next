import React, { useState, useEffect } from 'react';

const LoadDirectory: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            setIsLoaded(true);
        }, 1000); // Adjust the timeout as needed
    }, []);
    return (
        <div className='loadDirectory'>
            <div className={`loadDirectoryBlock ${isLoaded ? 'loaded' : ''} animate-pulse`}></div>
            <div className={`loadDirectoryBlock ${isLoaded ? 'loaded' : ''} animate-pulse`}></div>
            <div className={`loadDirectoryBlock ${isLoaded ? 'loaded' : ''} animate-pulse`}></div>
            <div className={`loadDirectoryBlock ${isLoaded ? 'loaded' : ''} animate-pulse`}></div>
            <div className={`loadDirectoryBlock ${isLoaded ? 'loaded' : ''} animate-pulse`}></div>
            <div className={`loadDirectoryBlock ${isLoaded ? 'loaded' : ''} animate-pulse`}></div>
            <div className={`loadDirectoryBlock ${isLoaded ? 'loaded' : ''} animate-pulse`}></div>
            <div className={`loadDirectoryBlock ${isLoaded ? 'loaded' : ''} animate-pulse`}></div>
        </div>
    );
};

export default LoadDirectory;
