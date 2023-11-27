'use client'
import React, { createContext, useContext, useState } from 'react';

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

const FilterContext = createContext<FilterContextType>({
  sizes: [],
  neighborhoods: [],
  cities: [],
  tags: [],
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
    const [sizes, setSizes] = useState<string[]>([]);
    const [neighborhoods, setNeighborhoods] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([]);
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    React.useEffect(() => {
      const fetchSizes = async () => {
        const response = await fetch('/api/sizes');
        const data = await response.json();
        return data;
      };
      const fetchNeighborhoods = async () => {
        const response = await fetch('/api/neighborhoods');
        const data = await response.json();
        return data;
      };
      const fetchCities = async () => {
        const response = await fetch('/api/cities');
        const data = await response.json();
        return data;
      };
      const fetchTags = async () => {
        const response = await fetch('/api/tags');
        const data = await response.json();
        return data;
      };
      fetchSizes().then(setSizes);
      fetchNeighborhoods().then(setNeighborhoods);
      fetchCities().then(setCities);
      fetchTags().then(setTags);
    }, []);

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
      <FilterContext.Provider
        value={{
          sizes,
          neighborhoods,
          cities,
          tags,
          selectedSizes,
          selectedNeighborhoods,
          selectedCities,
          selectedTags,
          addFilter,
          removeFilter,
          isFilterSelected,
          clearFilters,
        }}
      >
        {children}
      </FilterContext.Provider>
    );
}


// Use the Context
export function useFilters() {
    return useContext(FilterContext);
  }
