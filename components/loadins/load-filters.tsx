import React from 'react';

const LoadFilters: React.FC = () => {
    return (
        <div className='filters'>
            <div className='tagSize loadFilters animate-pulse'></div>
            <div className='tagSeattle loadFilters animate-pulse'></div>
            <div className='tagCity loadFilters animate-pulse'></div>
            <div className='allTags loadFilters animate-pulse'></div>
        </div>
    );
};

export default LoadFilters;
