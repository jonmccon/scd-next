'use client'

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useFilters } from './FilterContext';
import { filterListings } from '../utils/filterListings';
import { LuAnchor, LuTwitter, LuInstagram, LuTag, LuTags } from 'react-icons/lu';


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
      style: 'mapbox://styles/jonmccon/cm5jtz2n4002p01rdb8fw7cib',
      center: [-122.325379, 47.624522], 
      zoom: 11
    });
    // Navigation controls, options: https://docs.mapbox.com/mapbox-gl-js/api/navigationcontrol/
    map.current.scrollZoom.disable();
    map.current.touchZoomRotate.enable();
    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  }, []);

  useEffect(() => {
    // console.log('Filters changed:', { selectedSizes, selectedNeighborhoods, selectedCities, selectedTags });
    // Fetch data from our API route
    fetch('/api/map-data')
      .then(response => response.json())
      .then(data => {
        // console.log('Fetched data:', data);
        const filteredListings = filterListings(data as Listing[], selectedSizes, selectedNeighborhoods, selectedCities, selectedTags);
        // console.log('Filtered listings:', filteredListings);
        setLocations(filteredListings);
      })
      .catch(error => console.error('Error fetching map data:', error));
  }, [selectedSizes, selectedNeighborhoods, selectedCities, selectedTags]);

  useEffect(() => {
    // console.log('Locations updated:', locations);
    if (!map.current) return;

    const onLoad = () => {
      // Clear existing markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      // Add new markers
      // https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker
      // https://docs.mapbox.com/help/tutorials/custom-markers-gl-js/#step-5-1-create-an-empty-div-for-each-point
      // 
      // Tag list element
      // <div class="map-tagContainer">
      // ${location.tags.map((tag: Tag) => `<div class="map-tagList">${tag.name}</div>`).join('')}
      // </div>

      locations.forEach((location: Listing) => {
        // console.log('Adding marker for location:', location);

        const el = document.createElement('div');
        el.className = 'marker';

        const marker = new mapboxgl.Marker(el)
          .setLngLat([location.longitude, location.latitude])
          .setPopup(new mapboxgl.Popup({className: 'map-popup'}).setHTML(`
            <h1>${location.title ? location.title : ''}</h1>
            <a href="${location.website}" target="_blank">${location.website}</a>
            <h2>${location.neighborhood ? location.neighborhood + "," : ''} ${location.city ? location.city : ''}</h2>                          
            
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

  return <div id='map-listings' ref={mapContainer} />;
}


