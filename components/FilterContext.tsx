'use client'
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

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
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([]);
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    React.useEffect(() => {
      const fetchFilters = async () => {
        try {
          const sizesResponse = await axios.get('/api/sizes');
          const neighborhoodsResponse = await axios.get('/api/neighborhoods');
          const citiesResponse = await axios.get('/api/cities');
          const tagsResponse = await axios.get('/api/tags');
  
          setSizes(sizesResponse.data);
          setNeighborhoods(neighborhoodsResponse.data);
          setCities(citiesResponse.data);
          setTags(tagsResponse.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchFilters();
    }, []);

    type FilterType = 'size' | 'neighborhood' | 'city' | 'tag';

    const addFilter = (filter: Tag | string, type: FilterType) => {
      switch (type) {
        case 'size':
          const sizeFilter = filter as string;
          setSelectedSizes(prevSizes => [...prevSizes, sizeFilter]);
          break;
        case 'neighborhood':
          const neighborhoodFilter = filter as string;
          setSelectedNeighborhoods(prevNeighborhoods => [...prevNeighborhoods, neighborhoodFilter]);
          break;
        case 'city':
          const cityFilter = filter as string;
          setSelectedCities(prevCities => [...prevCities, cityFilter]);
          break;
        case 'tag':
          const tagFilter = filter as Tag;
          setSelectedTags(prevTags => [...prevTags, tagFilter]);
          break;
        default:
          break;
      }
    };

    const removeFilter = (filter: Tag | string, type: FilterType) => {
      switch (type) {
        case 'size':
          const sizeFilter = filter as string;
          setSelectedSizes(prevSizes => prevSizes.filter(size => size !== sizeFilter));
          break;
        case 'neighborhood':
          const neighborhoodFilter = filter as string;
          setSelectedNeighborhoods(prevNeighborhoods => prevNeighborhoods.filter(neighborhood => neighborhood !== neighborhoodFilter));
          break;
        case 'city':
          const cityFilter = filter as string;
          setSelectedCities(prevCities => prevCities.filter(city => city !== cityFilter));
          break;
        case 'tag':
          const tagFilter = filter as Tag;
          setSelectedTags(prevTags => prevTags.filter(tag => tag.id !== tagFilter.id));
          break;
        default:
          break;
      }
    };

    const isFilterSelected = (filter: Tag | string, type: FilterType) => {
      switch (type) {
        case 'size':
          const sizeFilter = filter as string;
          return selectedSizes.includes(sizeFilter);
        case 'neighborhood':
          const neighborhoodFilter = filter as string;
          return selectedNeighborhoods.includes(neighborhoodFilter);
        case 'city':
          const cityFilter = filter as string;
          return selectedCities.includes(cityFilter);
        case 'tag':
          const tagFilter = filter as Tag;
          return selectedTags.some(tag => tag.id === tagFilter.id);
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
