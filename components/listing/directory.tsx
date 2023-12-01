'use client'
import React from "react";
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useFilters } from '../FilterContext';
import RefreshButton from '../refresh-button'
import DirectoryListing from './directory-listing'
import Link from 'next/link'
import TablePlaceholder from '../table-placeholder'

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
        const filteredListings = Object.entries(response.data.listings).reduce((acc, [category, listing]) => {
          const isListingMatchFilter =
            (selectedSizes.length === 0 || selectedSizes.includes((listing as Listing).size)) &&
            (selectedNeighborhoods.length === 0 || selectedNeighborhoods.includes((listing as Listing).neighborhood)) &&
            (selectedCities.length === 0 || selectedCities.includes((listing as Listing).city)) &&
            (selectedTags.length === 0 || selectedTags.some(tag => tag.id === (listing as Listing).id));

          if (isListingMatchFilter) {
            if (!acc[category]) {
              acc[category] = [];
            }
            acc[category].push(listing as Listing);
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
    return <TablePlaceholder />;
  }

  const { listings } = data;  
  const totalcount = Object.values(listings).reduce((total, categoryListings) => total + categoryListings.length, 0);


  return (
    
    <div className="directory">      
      {categories.map(category => (
        listings[category] ? (
          <div className='directory-block' key={category}>
            <div className="directory-block--title"><a id={category}></a>{category}</div>
            <DirectoryListing listingQuery={listings[category]} />
          </div>
        ) : null
      ))}

        <div className="directory-block--title" id="endcap">*</div>       
          <div className="directory-block--end">
            <p>{totalcount} Studios</p> 
            <p>Don&lsquo;t see yourself?</p>
            <RefreshButton />
            <p>
            <Link
              className="directory-endcap--link highlight" 
              href="#">Get Listed
            </Link>
            </p>

          </div>
    </div>

  )
}

export default React.memo(Directory)