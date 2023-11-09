'use client'
// Create a Context
import React, { createContext, useContext, useState } from 'react';

type FilterContextType = {
  selectedSizes: string[];
  selectedNeighborhoods: string[];
  selectedCities: string[];
  selectedTags: string[];
  addFilter: (filter: string, type: string) => void;
  removeFilter: (filter: string, type: string) => void;
  isFilterSelected: (filter: string, type: string) => boolean;
  clearFilters: () => void;
};

const FilterContext = createContext<FilterContextType>({
  selectedSizes: [],
  selectedNeighborhoods: [],
  selectedCities: [],
  selectedTags: [],
  addFilter: () => {},
  removeFilter: () => {},
  isFilterSelected: () => false, 
  clearFilters: () => {}, 
});

export function FilterProvider({ children }: { children: React.ReactNode }) {
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([]);
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const addFilter = (filter: string, type: string) => {
      switch (type) {
        case 'size':
          setSelectedSizes(prevSizes => [...prevSizes, filter]);
          break;
        case 'neighborhood':
          setSelectedNeighborhoods(prevNeighborhoods => [...prevNeighborhoods, filter]);
          break;
        case 'city':
          setSelectedCities(prevCities => [...prevCities, filter]);
          break;
        case 'tag':
          setSelectedTags(prevTags => [...prevTags, filter]);
          break;
        default:
          break;
      }
    };

    const removeFilter = (filter: string, type: string) => {
      switch (type) {
        case 'size':
          setSelectedSizes(prevSizes => prevSizes.filter(size => size !== filter));
          break;
        case 'neighborhood':
          setSelectedNeighborhoods(prevNeighborhoods => prevNeighborhoods.filter(neighborhood => neighborhood !== filter));
          break;
        case 'city':
          setSelectedCities(prevCities => prevCities.filter(city => city !== filter));
          break;
        case 'tag':
          setSelectedTags(prevTags => prevTags.filter(tag => tag !== filter));
          break;
        default:
          break;
      }
    };

    const isFilterSelected = (filter: string, type: string) => {
      switch (type) {
        case 'size':
          return selectedSizes.includes(filter);
        case 'neighborhood':
          return selectedNeighborhoods.includes(filter);
        case 'city':
          return selectedCities.includes(filter);
        case 'tag':
          return selectedTags.includes(filter);
        default:
          return false;
      }
    };

    const clearFilters = () => {
      setSelectedSizes([]);
      setSelectedNeighborhoods([]);
      setSelectedCities([]);
      setSelectedTags([]);
    };

    return (
        <FilterContext.Provider value={{ selectedSizes, selectedNeighborhoods, selectedCities, selectedTags, addFilter, removeFilter, isFilterSelected, clearFilters }}>
            {children}
        </FilterContext.Provider>
    );
}


// Use the Context
export function useFilters() {
    return useContext(FilterContext);
  }
