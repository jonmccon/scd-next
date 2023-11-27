'use client'
import React, { useEffect, useState } from 'react'
import { useFilters } from '../FilterContext';  // Import your FilterContext
import chroma from 'chroma-js'
import axios from 'axios'

// add interface for filterContext type
type FilterContextType = {
  sizes: string[];
  neighborhoods: string[];
  cities: string[];
  tags: string[];
  selectedSizes: string[];
  selectedNeighborhoods: string[];
  selectedCities: string[];
  selectedTags: string[];
  addFilter: (filter: string, type: string) => void;
  removeFilter: (filter: string, type: string) => void;
  isFilterSelected: (filter: string, type: string) => boolean;
  clearFilters: () => void;
};
const FilterContext = React.createContext<FilterContextType | undefined>(undefined);

export default function Filters() {
  const [data, setData] = useState(null);
  const { sizes, neighborhoods, cities, tags, selectedSizes, selectedNeighborhoods, selectedCities, selectedTags, addFilter, removeFilter, clearFilters, isFilterSelected } = useFilters();
  
  const handleFilterClick = (filter: string, type: string) => {
    if (isFilterSelected(filter, type)) {
      removeFilter(filter, type);
    } else {
      addFilter(filter, type);
    }
  };

  useEffect(() => {
    axios.get('/api/filters')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }
  
  
  return (
      <div className="filters">
        {/* <ul>
          {selectedSizes.map(filter => (
            <li key={filter}>{filter}</li>
          ))}
          {selectedNeighborhoods.map(filter => (
            <li key={filter}>{filter}</li>
          ))}
          {selectedCities.map(filter => (
            <li key={filter}>{filter}</li>
          ))}
          {selectedTags.map(filter => (
            <li key={filter}>{filter}</li>
          ))}
        </ul>
        <button onClick={clearFilters}>Clear All Filters</button> */}

      <div className="tagSize">
      <h5>SIZE</h5>
        <div className='tagSizeContainer'>
        {sizes.map((size: string ) => (
          <div
            key={size}
            className="filter-tag-container"
            style={{ backgroundColor: selectedSizes.includes(size) ? chroma.scale('YlGnBu').colors(5)[2] : 'transparent' }}
          >
          <a 
            className="filter-tag--attr"
            onClick={() => handleFilterClick(size, 'size')} 
          >
            {size}
          </a>
          </div>
        ))}
        </div>
      </div>


      <div className="tagSeattle">
      <h5>SEATTLE BY NEIGHBORHOOD</h5>
        <div className='tagSeattleContainer'>
        {neighborhoods.map(( neighborhood: string ) => (
          <div
            key={neighborhood}
            className="filter-tag-container"
            style={{ backgroundColor: selectedNeighborhoods.includes(neighborhood) ? chroma.scale('YlGnBu').colors(5)[2] : 'transparent' }}
          >
          <a 
            className="filter-tag--attr"
            onClick={() => handleFilterClick(neighborhood, 'neighborhood')} 
          >
            {neighborhood}
          </a>
          </div>
        ))}
        </div>
      </div>

      <div className="tagCity">
      <h5>GREATER PNW</h5>
        <div className='tagCityContainer'>
        {cities.map(( city: string ) => (
          <div
            key={city}
            className="filter-tag-container"
            style={{ backgroundColor: selectedCities.includes(city) ? chroma.scale('YlGnBu').colors(5)[2] : 'transparent' }}
          >
          <a 
            className="filter-tag--attr"
            onClick={() => handleFilterClick(city, 'city')} 
          >
            {city}
          </a>
          </div>
        ))}
        </div>
      </div>

      <div className="allTags">
      <h5>DISCIPLINE</h5>
        <div className='allTagsContainer'>
        {tags.map(( tag: string ) => (
          <div
            key={tag}
            className="filter-tag-container"
            style={{ backgroundColor: selectedTags.includes(tag) ? chroma.scale('YlGnBu').colors(5)[2] : 'transparent' }}
          >
          <a 
            className="filter-tag--attr"
            onClick={() => handleFilterClick(tag, 'tag')} 
          >
            {tag}
          </a>
          </div>
        ))} 
        </div>
      </div>    

    </div>

  )
}
