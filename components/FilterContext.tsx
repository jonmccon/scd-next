'use client'
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import LoadEpisode from './loadins/load-episode';

type StateType = {
  sizes: string[];
  neighborhoods: string[];
  cities: string[];
  tags: Tag[];
  selectedSizes: string[];
  selectedNeighborhoods: string[];
  selectedCities: string[];
  selectedTags: Tag[];
};

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
  addFilter: (filter: Tag | string, type: FilterType) => void;
  removeFilter: (filter: Tag | string, type: FilterType) => void;
  isFilterSelected: (filter: Tag | string, type: FilterType) => boolean;
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

export const FilterProvider = React.memo(({ children }: { children: React.ReactNode }) => {
    FilterProvider.displayName = 'FilterProvider';
  
    // Define the initial state
    const initialState = {
      sizes: [],
      neighborhoods: [],
      cities: [],
      tags: [],
      selectedSizes: [],
      selectedNeighborhoods: [],
      selectedCities: [],
      selectedTags: [],
    };

    // Create a single state object
    const [state, setState] = useState<StateType>(initialState);

    React.useEffect(() => {
      const fetchFilters = async () => {
        try {
          const sizesResponse = await axios.get('/api/sizes---');
          const neighborhoodsResponse = await axios.get('/api/neighborhoods---');
          const citiesResponse = await axios.get('/api/cities---');
          const tagsResponse = await axios.get('/api/tags---');

          // Update all state variables at once
          setState({
            ...state,
            sizes: sizesResponse.data,
            neighborhoods: neighborhoodsResponse.data,
            cities: citiesResponse.data,
            tags: tagsResponse.data,
          });
        } catch (error) {
          console.error(error);
        }
      };

      fetchFilters();
    }, []);


    

    // Update the addFilter, removeFilter, isFilterSelected, and clearFilters functions to use the new state object

    type FilterType = 'size' | 'neighborhood' | 'city' | 'tag';

    const addFilter = React.useCallback((filter: Tag | string, type: FilterType) => {
      setState(prevState => {
        switch (type) {
          case 'size':
            return { ...prevState, selectedSizes: [...prevState.selectedSizes, filter as string] };
          case 'neighborhood':
            return { ...prevState, selectedNeighborhoods: [...prevState.selectedNeighborhoods, filter as string] };
          case 'city':
            return { ...prevState, selectedCities: [...prevState.selectedCities, filter as string] };
          case 'tag':
            return { ...prevState, selectedTags: [...prevState.selectedTags, filter as Tag] };
          default:
            return prevState;
        }
      });
    }, []);

    const removeFilter = React.useCallback((filter: Tag | string, type: FilterType) => {
      setState(prevState => {
        switch (type) {
          case 'size':
            return { ...prevState, selectedSizes: prevState.selectedSizes.filter(size => size !== filter) };
          case 'neighborhood':
            return { ...prevState, selectedNeighborhoods: prevState.selectedNeighborhoods.filter(neighborhood => neighborhood !== filter) };
          case 'city':
            return { ...prevState, selectedCities: prevState.selectedCities.filter(city => city !== filter) };
          case 'tag':
            return { ...prevState, selectedTags: prevState.selectedTags.filter(tag => tag.id !== (filter as Tag).id) };
          default:
            return prevState;
        }
      });
    }, []);

    const isFilterSelected = React.useCallback((filter: Tag | string, type: FilterType) => {
      switch (type) {
        case 'size':
          return state.selectedSizes.includes(filter as string);
        case 'neighborhood':
          return state.selectedNeighborhoods.includes(filter as string);
        case 'city':
          return state.selectedCities.includes(filter as string);
        case 'tag':
          return state.selectedTags.some(tag => tag.id === (filter as Tag).id);
        default:
          return false;
      }
    }, [state]);

    const clearFilters = React.useCallback(() => {
      setState(prevState => ({
        ...prevState,
        selectedSizes: [],
        selectedNeighborhoods: [],
        selectedCities: [],
        selectedTags: [],
      }));
    }, [state]);

    const {
      sizes,
      neighborhoods,
      cities,
      tags,
      selectedSizes,
      selectedNeighborhoods,
      selectedCities,
      selectedTags,
    } = state;

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
});


// Use the Context
export function useFilters() {
    return useContext(FilterContext);
  }
