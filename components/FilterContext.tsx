'use client'
// Create a Context
import React, { createContext, useContext, useState } from 'react';

type FilterContextType = {
    selectedFilters: string[];
    addFilter: (filter: string) => void;
    removeFilter: (filter: string) => void;
    isFilterSelected: (filter: string) => boolean;  // Add this line
};

const FilterContext = createContext<FilterContextType>({
    selectedFilters: [],
    addFilter: () => {},
    removeFilter: () => {},
    isFilterSelected: () => false,  // Add this line
});

export function FilterProvider({ children }: { children: React.ReactNode }) {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const addFilter = (filter: string) => {
        setSelectedFilters(prevFilters => {
          const newFilters = [...prevFilters, filter];
          console.log('Filters after adding:', newFilters);  // Log the filters after adding
          return newFilters;
        });
      };
      
      const removeFilter = (filter: string) => {
        setSelectedFilters(prevFilters => {
          const newFilters = prevFilters.filter(f => f !== filter);
          console.log('Filters after removing:', newFilters);  // Log the filters after removing
          return newFilters;
        });
      };

    const isFilterSelected = (filter: string) => {
        return selectedFilters.includes(filter);
      };

    return (
        <FilterContext.Provider value={{ selectedFilters, addFilter, removeFilter, isFilterSelected }}>
            {children}
        </FilterContext.Provider>
    );
}


// Use the Context
export function useFilters() {
    return useContext(FilterContext);
  }