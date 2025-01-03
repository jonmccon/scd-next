'use client'

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useFilters } from './FilterContext';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_MAP_ACCESS as string;

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

export default function MapboxMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [locations, setLocations] = useState<Listing[]>([]);
  const { selectedSizes, selectedNeighborhoods, selectedCities, selectedTags } = useFilters();
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (map.current) return; // Initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-122.5, 47.6], // Default center (adjust as needed)
      zoom: 9
    });
    // Add navigation control (zoom in/out)
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
  }, []);

  useEffect(() => {
    console.log('Filters changed:', { selectedSizes, selectedNeighborhoods, selectedCities, selectedTags });
    // Fetch data from our API route
    fetch('/api/map-data')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);
        const filteredListings = data.filter((listing: Listing) =>
          (selectedSizes.length === 0 || selectedSizes.includes(listing.size)) &&
          (selectedNeighborhoods.length === 0 || selectedNeighborhoods.includes(listing.neighborhood)) &&
          (selectedCities.length === 0 || selectedCities.includes(listing.city)) &&
          (selectedTags.length === 0 || (Array.isArray(listing.tags) && listing.tags.some(listingTag => selectedTags.some(tag => tag.id === listingTag.id))))
        );
        console.log('Filtered listings:', filteredListings);
        setLocations(filteredListings);
      })
      .catch(error => console.error('Error fetching map data:', error));
  }, [selectedSizes, selectedNeighborhoods, selectedCities, selectedTags]);

  useEffect(() => {
    console.log('Locations updated:', locations);
    if (!map.current) return;

    const onLoad = () => {
      // Clear existing markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      // Add new markers
      locations.forEach((location: Listing) => {
        const marker = new mapboxgl.Marker()
          .setLngLat([location.longitude, location.latitude])
          .setPopup(new mapboxgl.Popup().setHTML(`
            <h3>${location.title ? location.title : ''}</h3>
            <p>${location.size ? location.size : ''}</p>
            <p>${location.neighborhood ? location.neighborhood + "," : ''} ${location.city ? location.city : ''}</p>              
            <a href="${location.website}" target="_blank">Website</a>
          `))
          .addTo(map.current!);
        markersRef.current.push(marker);
      });
    };

    if (map.current.isStyleLoaded()) {
      onLoad();
    } else {
      map.current.once('load', onLoad);
    }
  }, [locations]);

  return <div id='map-listings' ref={mapContainer} style={{ width: '100%', height: '400px' }} />;
}


