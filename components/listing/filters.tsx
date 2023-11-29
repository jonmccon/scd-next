'use client'
import React, { useEffect, useState } from 'react'
import { useFilters } from '../FilterContext';  // Import your FilterContext
import chroma from 'chroma-js'

type Tag = {
  id: string;
  name: string;
};

type FilterContextType = {
  sizes: string[];
  neighborhoods: string[];
  cities: string[];
  tags: Tag[];
  selectedSizes: string[];
  selectedNeighborhoods: string[];
  selectedCities: string[];
  selectedTags: Tag[];
  addFilter: (filter: string, type: string) => void;
  removeFilter: (filter: string, type: string) => void;
  isFilterSelected: (filter: string, type: string) => boolean;
  clearFilters: () => void;
};

const FilterContext = React.createContext<FilterContextType | undefined>(undefined);

export default function Filters() {
  const { sizes, neighborhoods, cities, tags, selectedSizes, selectedNeighborhoods, selectedCities, selectedTags, addFilter, removeFilter, clearFilters, isFilterSelected } = useFilters();

  type FilterType = 'size' | 'neighborhood' | 'city' | 'tag';

  const handleFilterClick = (filter: Tag | string, type: FilterType) => {
    if (type === 'tag') {
      const tagFilter = filter as Tag;
      if (isFilterSelected(tagFilter, type)) {
        removeFilter(tagFilter, type);
      } else {
        addFilter(tagFilter, type);
      }
    } else {
      const stringFilter = filter as string;
      if (isFilterSelected(stringFilter, type)) {
        removeFilter(stringFilter, type);
      } else {
        addFilter(stringFilter, type);
      }
    }
  };

  
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
            <li key={filter.id}>{filter.name}</li>
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
        {tags.map( tag => (
          <div
            key={tag.id}
            className="filter-tag-container"
            style={{ backgroundColor: selectedTags.some(selectedTag => selectedTag.id === tag.id) ? chroma.scale('YlGnBu').colors(5)[2] : 'transparent' }}
          >
          <a 
            className="filter-tag--attr"
            onClick={() => handleFilterClick(tag, 'tag')} 
          >
            {tag.name}
          </a>
          </div>
        ))} 
        </div>
      </div>    

    </div>

  )
}
