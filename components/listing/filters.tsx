'use client'
import React, { useEffect, useState } from 'react'
import chroma from 'chroma-js'



export default function Filters() {
 

  const [sizes, setSizes] = useState([])
  const [neighborhoods, setNeighborhoods] = useState([])
  const [cities, setCities] = useState([])
  const [tags, setTags] = useState([])  
  
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
          setTags(data.tags)
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation: ', error);
        });
    }, [])

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
        {sizes.map((size: { size: string; }) => (
          <div
            key={size.size}
            className="filter-tag-container"
          >
          <a 
            className="filter-tag--attr"
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
        {tags.map((tag: { name: string; }) => (
          <div
            key={tag.name}
            className="filter-tag-container"
            
          >
          <a 
            className="filter-tag--attr"
            
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
