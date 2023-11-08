'use client'
import React, { useEffect, useState } from 'react'
import { useFilters } from '../FilterContext';  // Import your FilterContext
import chroma from 'chroma-js'

// add interface for filterContext type
interface FilterContextType {
  selectedFilters: string[];
  addFilter: (filter: string) => void;
  removeFilter: (filter: string) => void;
};


export default function Filters() {

    // Add a new piece of state to hold the selected filter
    const { selectedFilters, addFilter, removeFilter, clearFilters } = useFilters();  // Get the selected filters and functions from the context

    // This function will be called when a filter link is clicked
    const handleFilterClick = (filter: string) => {
      if (selectedFilters.includes(filter)) {
        removeFilter(filter);
      } else {
        addFilter(filter);
      }
    }

    const [sizes, setSizes] = useState([])
    const [neighborhoods, setNeighborhoods] = useState([])
    const [cities, setCities] = useState([])
  
    useEffect(() => {
      fetch('/api/filters')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setSizes(data.sizes)
          setNeighborhoods(data.neighborhoods)
          setCities(data.cities)
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation: ', error);
        });
    }, [])

const disciplines: Array<string> = [
  "THREE DIMENSIONAL", "ADVERTISING", "ARCHITECTURE", "BRANDING", "COMMUNITY", "DEVELOPMENT", "ECOMMERCE", "ENGINEERING", "ENVIRONMENTAL", 
  "EVENTS", "EXHIBITION", "EXPERIENCE", "EXPERIENTIAL", "GAMING", "ILLUSTRATION", "INDUSTRIAL", "INHOUSE", "INTERACTIVE", "INTERIOR",
  "MARKETING", "MOTION", "NAMING", "PACKAGING", "PHOTOGRAPHY", "PRESENTATION", "PRESS", "PRINT", "PRINTER", "PRODUCT", "PUBLIC RELATIONS",
  "RECRUITER", "RESEARCH", "SCHOOL", "SOUND", "STRATEGY", "TYPOGRAPHY", "UX_UI", "VFX", "VIDEO", "VOICE"
];

  return (
    <div className="filters">
      <ul>
        {selectedFilters.map(filter => (
          <li key={filter}>{filter}</li>  // Render each selected filter as a list item
        ))}
      </ul>
      <button onClick={clearFilters}>Clear All Filters</button>

      <div className="tagSize">
      <h5>SIZE</h5>
        <div className='tagSizeContainer'>
        {sizes.map((size: { size: string; }) => (
          <div
            key={size.size}
            className="filter-tag-container"
            style={{ backgroundColor: selectedFilters.includes(size.size) ? chroma.scale('YlGnBu').colors(5)[2] : 'transparent' }}
          >
          <a 
            className="filter-tag--attr"
            onClick={() => handleFilterClick(size.size)} 
          >
            {size.size}
          </a>
          </div>
        ))}
        </div>
      </div>


      <div className="tagSeattle">
      <h5>SEATTLE BY NEIGHBORHOOD</h5>
        <div className='tagSeattleContainer'>
        {neighborhoods.map((neighborhood: { neighborhood: string; }) => (
          <div
            key={neighborhood.neighborhood}
            className="filter-tag-container"
            style={{ backgroundColor: selectedFilters.includes(neighborhood.neighborhood) ? chroma.scale('YlGnBu').colors(5)[2] : 'transparent' }}
          >
          <a 
            className="filter-tag--attr"
            onClick={() => handleFilterClick(neighborhood.neighborhood)} 
          >
            {neighborhood.neighborhood}
          </a>
          </div>
        ))}
        </div>
      </div>

      <div className="tagCity">
      <h5>GREATER PNW</h5>
        <div className='tagCityContainer'>
        {cities.map((city: { city: string; }) => (
          <div
            key={city.city}
            className="filter-tag-container"
            style={{ backgroundColor: selectedFilters.includes(city.city) ? chroma.scale('YlGnBu').colors(5)[2] : 'transparent' }}
          >
          <a 
            className="filter-tag--attr"
            onClick={() => handleFilterClick(city.city)} 
          >
            {city.city}
          </a>
          </div>
        ))}
        </div>
      </div>

      <div className="allTags">
      <h5>DISCIPLINE</h5>
        <div className='allTagsContainer'>
        {disciplines.map((discipline, index) => (
          <div
            key={index}
            className="filter-tag-container"
            style={{ backgroundColor: selectedFilters.includes(discipline) ? chroma.scale('YlGnBu').colors(5)[2] : 'transparent' }}
          >
          <a 
            className="filter-tag--attr"
            onClick={() => handleFilterClick(discipline)} 
          >
            {discipline}
          </a>
          </div>
        ))} 
        </div>
      </div>    

    </div>

  )
}
