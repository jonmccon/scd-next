'use client'
import React from "react";
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useFilters } from '../FilterContext';
import RefreshButton from '../refresh-button'
import DirectoryListing from './directory-listing'
import Link from 'next/link'
import LoadDirectory from "../loadins/load-directory";

interface Listings {
  [key: string]: Listing[]; // This means that any string key will return an array of Listing objects
}

type Tag = {
  id: string;
  name: string;
};

interface Listing {
  id: string;
  title: string;
  category: string;
  size: string;
  neighborhood: string;
  city: string;
  website: string;
  episodeURL: string;
  episodePromo: string;
  color: string;
  tags: Tag[];
}

function Directory() {
  const [data, setData] = useState<{ listings: Listings } | null>(null);
  const categories = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split('');

  // Get selected filters from context
  const { selectedSizes, selectedNeighborhoods, selectedCities, selectedTags } = useFilters();

  useEffect(() => {
    axios.get('/api/listings')
      .then(response => {
        const listingsByCategory = response.data.listings.reduce((acc: { [x: string]: any[]; }, listing: { category: any; }) => {
          const category = listing.category;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(listing);
          return acc;
        }, {});

        const filteredListings = Object.entries(listingsByCategory).reduce((acc, [category, listings]) => {
          const filteredListingsForCategory = (listings as Listing[]).filter(listing =>
            (selectedSizes.length === 0 || selectedSizes.includes(listing.size)) &&
            (selectedNeighborhoods.length === 0 || selectedNeighborhoods.includes(listing.neighborhood)) &&
            (selectedCities.length === 0 || selectedCities.includes(listing.city)) &&
            (selectedTags.length === 0 || listing.tags.some(listingTag => selectedTags.some(tag => tag.id === listingTag.id)))
          );

          if (filteredListingsForCategory.length > 0) {
            acc[category] = filteredListingsForCategory;
          }

          return acc;
        }, {} as Listings);
        
        setData({ listings: filteredListings });
      })
      .catch(error => {
        console.error(error);
      });
  }, [selectedSizes, selectedNeighborhoods, selectedCities, selectedTags]);

  if (!data) {
    return <LoadDirectory />;
  }

  const { listings } = data;  
  const totalcount = Object.values(listings).reduce((total, categoryListings) => total + categoryListings.length, 0);

  return (
    
    <div className="directory">      
      {categories.map(category => {
        const listingsForCategory = listings[category];
        
        return listingsForCategory && listingsForCategory.length > 0 ? (
          <div className='directory-block' key={category}>
            <div className="directory-block--title">
              {category}
            </div>
            <DirectoryListing listingsByCategory={{ [category]: listingsForCategory }} />
          </div>
        ) : null;
      })}

        <div className="directory-block--title" id="endcap">*</div>       
          <div className="directory-block--end">
            <p>{totalcount} Studios</p> 
            <p>Don&lsquo;t see yourself?</p>
            <RefreshButton />
            <p>
            <Link
              className="directory-endcap--link highlight" 
              href="https://research.typeform.com/to/UR7SpT93" target="_blank">Get Listed
            </Link>
            </p>

          </div>
    </div>

  )
}

export default React.memo(Directory)