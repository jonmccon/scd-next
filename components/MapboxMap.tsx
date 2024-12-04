'use client'

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_MAP_ACCESS as string;


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
  latitude: number;
  longitude: number;
  color: string;
  tags: Tag[];
}

interface DirectoryListingProps {
  listingsByCategory: Listings;
}


export default function MapboxMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [locations, setLocations] = useState<Listing[]>([]);

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

    // Fetch data from our API route
    fetch('/api/map-data')
      .then(response => response.json())
      .then(data => {
        setLocations(data);
        
        // Add markers for each location
        data.forEach((location: Listing) => {
          new mapboxgl.Marker()
            .setLngLat([location.longitude, location.latitude])
            .setPopup(new mapboxgl.Popup().setHTML(`
              <h3>${location.title ? location.title : ''}</h3>
              <p>${location.size ? location.size : ''}</p>
              <p>${location.neighborhood ? location.neighborhood + "," : ''} ${location.city ? location.city : ''}</p>              
              <a href="${location.website}" target="_blank">Website</a>
              `))
            .addTo(map.current!);
        });

        // Fit map to markers
        const bounds = new mapboxgl.LngLatBounds();
        data.forEach((location: Listing) => {
          bounds.extend([location.longitude, location.latitude]);
        });
        map.current!.fitBounds(bounds, { padding: 50 });
      })
      .catch(error => console.error('Error fetching map data:', error));
  }, []);

  return <div id='map-listings' ref={mapContainer} style={{ width: '100%', height: '400px' }} />;
}

