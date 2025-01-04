'use client'
import React, { useEffect, useState } from 'react'
import { useFilters } from '../FilterContext'; 
import chroma from 'chroma-js'
import LoadFilters from '../loadins/load-filters';

type Tag = {
  id: string;
  name: string;
};

type FilterType = 'size' | 'neighborhood' | 'city' | 'tag';

type FilterContextType = {
  sizes: string[];
  neighborhoods: string[];
  cities: string[];
  tags: Tag[];
  selectedSizes: string[];
  selectedNeighborhoods: string[];
  selectedCities: string[];
  selectedTags: Tag[];
  addFilter: (filter: Tag | string, type: string) => void;
  removeFilter: (filter: Tag | string, type: string) => void;
  isFilterSelected: (filter: Tag | string, type: string) => boolean;
  clearFilters: () => void;
};

const FilterContext = React.createContext<FilterContextType | undefined>(undefined);

function Filters() {
  const { sizes, neighborhoods, cities, tags, selectedSizes, selectedNeighborhoods, selectedCities, selectedTags, addFilter, removeFilter, clearFilters, isFilterSelected } = useFilters();

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

  // console.log('Filters:', selectedSizes, selectedNeighborhoods, selectedCities, selectedTags);

  if (sizes.length === 0 || neighborhoods.length === 0 || cities.length === 0 || tags.length === 0) {
    return <LoadFilters />;
  }
        
  const activeFilters = selectedSizes.length + selectedNeighborhoods.length + selectedCities.length + selectedTags.length;

  return (
      <div className="filters">

      <div className="tagSize">
      <button className='clearFiltersButton' onClick={clearFilters}>Clear Filters {activeFilters}</button>  

        <div className='tagSizeContainer'>
        
          {sizes.map((size: string ) => (
              <button 
              className="filter-tag--attr"
              onClick={() => handleFilterClick(size, 'size')} 
              style={{ backgroundColor: selectedSizes.includes(size) ? chroma.scale(['805D93','FFD5BD']).colors(5)[1] : 'transparent' }}
              >
                <div
                  key={size}
                  className="filter-tag-container"
                >
                  {size}        
                </div>
            </button>
          ))}

        <div className='tagTitle'>
            <h5>SIZE</h5>
        </div>
        
        </div>


        
      </div>


      <div className="tagSeattle">
        <div className='tagSeattleContainer'>
          {neighborhoods.map(( neighborhood: string ) => (
              <button 
              className="filter-tag--attr"
              onClick={() => handleFilterClick(neighborhood, 'neighborhood')} 
              style={{ backgroundColor: selectedNeighborhoods.includes(neighborhood) ? chroma.scale(['805D93','FFD5BD']).colors(5)[2] : 'transparent' }}
              >
                <div
                  key={neighborhood}
                  className="filter-tag-container"
                >
                  {neighborhood}              
                </div>
            </button>
          ))}

      {/* <h5>SEATTLE BY NEIGHBORHOOD</h5> */}

        </div>
      </div>

      <div className="tagCity">
        <div className='tagCityContainer'>
        {cities.map(( city: string ) => (
          <button 
          className="filter-tag--attr"
          onClick={() => handleFilterClick(city, 'city')} 
          style={{ backgroundColor: selectedCities.includes(city) ? chroma.scale(['805D93','FFD5BD']).colors(5)[3] : 'transparent' }}
          >
            <div
              key={city}
              className="filter-tag-container"
            >

            {city}          
            </div>
          </button>
        ))}
      {/* <h5>GREATER PNW</h5> */}

        </div>
      </div>

      <div className="allTags">
        <div className='allTagsContainer'>
        {tags.map( tag => (
          <button 
          className="filter-tag--attr"
          onClick={() => handleFilterClick(tag, 'tag')} 
          style={{ backgroundColor: selectedTags.some(selectedTag => selectedTag.id === tag.id) ? chroma.scale(['805D93','FFD5BD']).colors(5)[4] : 'transparent' }}
          >
            <div
              key={tag.id}
              className="filter-tag-container"
            >
              {tag.name}
            
            </div>
          </button>
        ))} 
      {/* <h5>DISCIPLINE</h5> */}

        </div>
      </div>    

      {/* List selected filters for debugging */}
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
        </ul> */}

    </div>

  )
}

export default React.memo(Filters);