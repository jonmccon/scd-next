'use client'
import React, { useEffect, useState } from 'react'
import prisma from '@/lib/prisma'
import chroma from 'chroma-js'

// add interface for filterContext type
interface FilterContextType {
  selectedFilters: string[];
  addFilter: (filter: string) => void;
  removeFilter: (filter: string) => void;
};


export default function Filters() {

    // Add a new piece of state to hold the selected filter
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

    // This function will be called when a filter link is clicked
    const handleFilterClick = (filter: string) => {
      setSelectedFilter(filter);
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

console.log(selectedFilter)

  return (
    <div className="filters">

      <div className="tagSize">
      <h5>SIZE</h5>
        <div className='tagSizeContainer'>
        {sizes.map((size: { size: string; }) => (
          <div
            key={size.size}
            className="filter-tag-container"
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
