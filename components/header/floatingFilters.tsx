'use client'
import React, { useState } from 'react'
import { useFilters } from '../FilterContext'; 
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

  const toggleMenu = () => setIsOpen(!isOpen);

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

  if (sizes.length === 0 || neighborhoods.length === 0 || cities.length === 0 || tags.length === 0) {
    return <LoadFilters />;
  }

  const activeFilters = selectedSizes.length + selectedNeighborhoods.length + selectedCities.length + selectedTags.length;

  const renderFilters = (items: any[], type: string) => (
    <div className="filter-grid">
      {items.map((item, index) => (
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
    if (selectedSizes.includes(filter as string)) return 'size';
    if (selectedNeighborhoods.includes(filter as string)) return 'neighborhood';
    if (selectedCities.includes(filter as string)) return 'city';
    if (selectedTags.some(tag => tag.name === filter)) return 'tag';
    return 'size'; // Default to 'size' if not found
  };

  return (
    <div className={`filter-menu ${isOpen ? "open" : "closed"}`}>
      <div className={`filter-menu-content ${isOpen ? "open" : "closed"}`}>
        <button className="filter-toggle-button" onClick={toggleMenu}>
          {isOpen ? "X" : "🏷️"}
        </button>

        {isOpen && (
          <div className="filter-content">
            <h2 className="filter-title">Filters</h2>
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
              Clear All Filters
            </button>
          </div>
        )}

        {!isOpen && activeFilters > 0 && (
          <div className="active-filters">
            <p className="active-filters-title">Active Filters:</p>
            <div className="active-filters-list">
              {[
                ...selectedSizes,
                ...selectedNeighborhoods,
                ...selectedCities,
                ...selectedTags.map((tag) => tag.name),
              ].map((filter, index) => (
                <span
                  key={index}
                  className="active-filter-item"
                  onClick={() => handleFilterClick(filter, getFilterType(filter))}
                >
                  {filter}
                </span>
              ))}
            </div>
            <button className="clear-filters-button" onClick={clearFilters}>
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(Filters);