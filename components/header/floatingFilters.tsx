'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useFilters } from '../FilterContext'; 
import { IoClose } from "react-icons/io5";

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
  const [isOpen, setIsOpen] = useState(false);
  const { sizes, neighborhoods, cities, tags, selectedSizes, selectedNeighborhoods, selectedCities, selectedTags, addFilter, removeFilter, clearFilters, isFilterSelected } = useFilters();
  const dialogRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleFilterClick = (filter: Tag | string, type: FilterType) => {
    // console.log('handleFilterClick:', { filter, type });
    if (type === 'tag') {
      const tagFilter = filter as Tag;
      if (isFilterSelected(tagFilter, type)) {
        // console.log('Removing tag filter:', tagFilter);
        removeFilter(tagFilter, type);
      } else {
        // console.log('Adding tag filter:', tagFilter);
        addFilter(tagFilter, type);
      }
    } else {
      const stringFilter = filter as string;
      if (isFilterSelected(stringFilter, type)) {
        // console.log('Removing string filter:', stringFilter);
        removeFilter(stringFilter, type);
      } else {
        // console.log('Adding string filter:', stringFilter);
        addFilter(stringFilter, type);
      }
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    //   console.log('Clicked outside, closing menu');
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    //   console.log('Menu is open, added event listener');
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    //   console.log('Menu is closed, removed event listener');
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    //   console.log('Cleanup: removed event listener');
    };
  }, [isOpen]);

  if (sizes.length === 0 || neighborhoods.length === 0 || cities.length === 0 || tags.length === 0) {
    return <LoadFilters />;
  }

  const activeFilters = selectedSizes.length + selectedNeighborhoods.length + selectedCities.length + selectedTags.length;

  const renderFilters = (items: any[], type: string) => (
    <div className="filter-grid">
      {items.filter(item => item !== null && item !== undefined).map((item, index) => (
        <button
          key={type === "tag" ? item.id : item}
          className={`filter-tag--attr ${isFilterSelected(item, type as FilterType) ? 'selected' : ''}`}
          onClick={() => handleFilterClick(item, type as FilterType)}
        >
          <div className="filter-tag-container">
            {type === "tag" ? item.name : item}
          </div>
        </button>
      ))}
    </div>
  );

const getFilterType = (filter: Tag | string): FilterType => {
  if (typeof filter === 'string') {
    if (selectedSizes.includes(filter)) return 'size';
    if (selectedNeighborhoods.includes(filter)) return 'neighborhood';
    if (selectedCities.includes(filter)) return 'city';
    // console.log('Unknown string filter:', filter);
  } else {
    if (selectedTags.some(tag => tag.name === filter.name)) return 'tag';
    // console.log('Unknown tag filter:', filter.name);
  }
  return 'size'; // Default to 'size' if not found
};
  return (
    <div className={`filter-menu ${isOpen ? "open" : "closed"}`} ref={dialogRef}>
      <div className={`filter-menu-content ${isOpen ? "open" : "closed"}`}>
        <button className="filter-toggle-button" onClick={toggleMenu}>
          {isOpen ? <IoClose /> : "🏷️"}
        </button>

        {isOpen && (
          <div className="filter-content">
            {/* <h2 className="filter-title">Filters</h2> */}
            <div className="filter-sections">
              <div className="filter-section">
                <h3 className="filter-section-title">Size</h3>
                {renderFilters(sizes, "size")}
              </div>
              <div className="filter-section">
                <h3 className="filter-section-title">Neighborhood</h3>
                {renderFilters(neighborhoods, "neighborhood")}
              </div>
              <div className="filter-section">
                <h3 className="filter-section-title">City</h3>
                {renderFilters(cities, "city")}
              </div>
              <div className="filter-section">
                <h3 className="filter-section-title">Tags</h3>
                {renderFilters(tags, "tag")}
              </div>
            </div>
            <button className="clear-filters-button" onClick={clearFilters}>
              Clear All Filters {activeFilters > 0 && ` (${activeFilters})`}
            </button>
          </div>
        )}

        {!isOpen && activeFilters > 0 && (
          <div className="active-filters">
            {/* <p className="active-filters-title">Active Filters:</p> */}
            <div className="active-filters-list">
              {[
                ...selectedSizes,
                ...selectedNeighborhoods,
                ...selectedCities,
                ...selectedTags,
              ].map((filter: string | Tag, index) => (
                <span
                  key={index}
                  className="active-filter-item"
                  onClick={() => handleFilterClick(filter, getFilterType(filter))}
                >
                  {typeof filter === 'string' ? filter : filter.name}
                </span>
              ))}
            </div>
            <button className="clear-filters-button" onClick={clearFilters}>
              Clear All Filters {activeFilters > 0 && ` (${activeFilters})`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(Filters);