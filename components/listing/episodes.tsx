'use client'

import { useState, useEffect } from 'react';
import EpisodeListing from './episode-listing'
import LoadEpisode from '../loadins/load-episode';
import { useFilters } from '../FilterContext';
import { filterListings } from '../../utils/filterListings';

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
  latitude: number;
  longitude: number;
  color: string;
  tags: Tag[];
}

export default function Episodes() {
  const [data, setData] = useState<Listing[]>([]);
  const { selectedSizes, selectedNeighborhoods, selectedCities, selectedTags } = useFilters();
  

  // useEffect(() => {
  //   const fetchEpisodes = async () => {
  //     const res = await fetch('/api/episodes');
  //     const data = await res.json();
  //     setData(data);
  //   };

  //   fetchEpisodes();
  // }, []);

    useEffect(() => {
      console.log('Filters changed:', { selectedSizes, selectedNeighborhoods, selectedCities, selectedTags });
      // Fetch data from our API route
      fetch('/api/episodes')
        .then(response => response.json())
        .then(data => {
          console.log('Fetched data:', data);
          const filteredListings = filterListings(data as Listing[], selectedSizes, selectedNeighborhoods, selectedCities, selectedTags);
          console.log('Filtered listings:', filteredListings);
          setData(filteredListings);
        })
        .catch(error => console.error('Error fetching episode data:', error));
    }, [selectedSizes, selectedNeighborhoods, selectedCities, selectedTags]);

  if (!data) {
    return <LoadEpisode />;
  }

  return (
    <div id="showContainer">  
      <EpisodeListing episodeQuery={data} />
    </div>
  );
}