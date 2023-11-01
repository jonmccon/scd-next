'use client'
// Create a Context
import React, { createContext, useContext, useState } from 'react';

type FilterContextType = {
    selectedFilters: string[];
    addFilter: (filter: string) => void;
    removeFilter: (filter: string) => void;
};

const FilterContext = createContext<FilterContextType>({
    selectedFilters: [],
    addFilter: () => {},
    removeFilter: () => {},
});

export function FilterProvider({ children }: { children: React.ReactNode }) {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const addFilter = (filter: string) => {
        setSelectedFilters([...selectedFilters, filter]);
    };

    const removeFilter = (filter: string) => {
        setSelectedFilters(selectedFilters.filter(f => f !== filter));
    };

    return (
        <FilterContext.Provider value={{ selectedFilters, addFilter, removeFilter }}>
            {children}
        </FilterContext.Provider>
    );
}


// Use the Context
export function useFilters() {
    return useContext(FilterContext);
  }