'use client'
import React, { useEffect, useState } from 'react'
import { useFilters } from '../FilterContext';  // Import your FilterContext
import chroma from 'chroma-js'

// add interface for filterContext type
type FilterContextType = {
  selectedSizes: string[];
  selectedNeighborhoods: string[];
  selectedCities: string[];
  selectedDisciplines: string[];
  addFilter: (filter: string, type: string) => void;
  removeFilter: (filter: string, type: string) => void;
  isFilterSelected: (filter: string, type: string) => boolean;
  clearFilters: () => void;
};


export default function Filters() {

  const { selectedSizes, selectedNeighborhoods, selectedCities, selectedDisciplines, addFilter, removeFilter, clearFilters } = useFilters();

  const handleFilterClick = (filter: string, type: string) => {
    switch (type) {
      case 'size':
        if (selectedSizes.includes(filter)) {
          removeFilter(filter, type);
        } else {
          addFilter(filter, type);
        }
        break;
      case 'neighborhood':
        if (selectedNeighborhoods.includes(filter)) {
          removeFilter(filter, type);
        } else {
          addFilter(filter, type);
        }
        break;
      case 'city':
        if (selectedCities.includes(filter)) {
          removeFilter(filter, type);
        } else {
          addFilter(filter, type);
        }
        break;
      case 'discipline':
        if (selectedDisciplines.includes(filter)) {
          removeFilter(filter, type);
        } else {
          addFilter(filter, type);
        }
        break;
      default:
        break;
    }
  }

  const [sizes, setSizes] = useState([])
  const [neighborhoods, setNeighborhoods] = useState([])
  const [cities, setCities] = useState([])
  const [_, setDisciplines] = useState([])  
  
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
          setDisciplines(data.disciplines)
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
          {selectedDisciplines.map(filter => (
            <li key={filter}>{filter}</li>
          ))}
        </ul>
        <button onClick={clearFilters}>Clear All Filters</button> */}

      <div className="tagSize">
      <h5>SIZE</h5>
        <div className='tagSizeContainer'>
        {sizes.map((size: { size: string; }) => (
          <div
            key={size.size}
            className="filter-tag-container"
            style={{ backgroundColor: selectedSizes.includes(size.size) ? chroma.scale('YlGnBu').colors(5)[2] : 'transparent' }}
          >
          <a 
            className="filter-tag--attr"
            onClick={() => handleFilterClick(size.size, 'size')} 
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
            style={{ backgroundColor: selectedNeighborhoods.includes(neighborhood.neighborhood) ? chroma.scale('YlGnBu').colors(5)[2] : 'transparent' }}
          >
          <a 
            className="filter-tag--attr"
            onClick={() => handleFilterClick(neighborhood.neighborhood, 'neighborhood')} 
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
            style={{ backgroundColor: selectedCities.includes(city.city) ? chroma.scale('YlGnBu').colors(5)[2] : 'transparent' }}
          >
          <a 
            className="filter-tag--attr"
            onClick={() => handleFilterClick(city.city, 'city')} 
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
            style={{ backgroundColor: selectedDisciplines.includes(discipline) ? chroma.scale('YlGnBu').colors(5)[2] : 'transparent' }}
          >
          <a 
            className="filter-tag--attr"
            onClick={() => handleFilterClick(discipline, 'discipline')} 
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
