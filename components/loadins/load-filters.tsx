import React from 'react';

const LoadFilters: React.FC = () => {
    return (
        <div className='filters'>
            <div className='tagSize loadFilters animate-pulse'><h5>SIZE</h5></div>
            <div className='tagSeattle loadFilters animate-pulse'><h5>SEATTLE BY NEIGHBORHOOD</h5></div>
            <div className='tagCity loadFilters animate-pulse'><h5>GREATER PNW</h5></div>
            <div className='allTags loadFilters animate-pulse'><h5>DISCIPLINE</h5></div>
        </div>
    );
};

export default LoadFilters;
