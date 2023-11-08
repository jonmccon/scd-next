'use client'
import React from "react";
import AudioPlayerSmall from "../audioplayer/audio-player-small";
import { useFilters } from '../FilterContext';
import chroma from 'chroma-js';

function DirectoryListing(props: { listingQuery: any[]; }) {
  const { selectedSizes, selectedNeighborhoods, selectedCities, selectedDisciplines } = useFilters(); 

  const getListingList = () => {
    const listingList: { 
      title: any; 
      website: any; 
      episodeURL: any; 
      episodePromo: any; 
      color: any; 
      city: any;
      neighborhood: any;
      size: any;
      discipline: any;
    }[] = [];
    props.listingQuery.forEach(listing => {
      listingList.push({
        title: listing.title,
        website: listing.website,
        episodeURL: listing.episodeURL,
        episodePromo: listing.episodePromo,
        color: listing.color,
        city: listing.city,
        neighborhood: listing.neighborhood,
        size: listing.size,
        discipline: listing.discipline,
      });
    });
    return listingList;
  };

  const listingList = getListingList();

  // Creating color scales for each filter
  const sizeColorScale = chroma.scale(['fda388','F02D3A']).colors(5);
  const neighborhoodColorScale = chroma.scale(['a1dcef','24A7D1']).colors(5);
  const cityColorScale = chroma.scale(['63c5b4','15B76C']).colors(5);
  const disciplineColorScale = chroma.scale(['ffdd7e', 'FBBB13']).colors(5);
        
return (
      
  <div className="directory-list">
  {listingList.map(listing => {

          // Calculate the color index based on the number of selected filters for each type
        const sizeColorIndex = selectedSizes.includes(listing.size) ? selectedSizes.length - 1 : -1;
        const neighborhoodColorIndex = selectedNeighborhoods.includes(listing.neighborhood) ? selectedNeighborhoods.length - 1 : -1;
        const cityColorIndex = selectedCities.includes(listing.city) ? selectedCities.length - 1 : -1;
        const disciplineColorIndex = selectedDisciplines.includes(listing.discipline) ? selectedDisciplines.length - 1 : -1;

        const sizeColor = sizeColorIndex >= 0 ? sizeColorScale[sizeColorIndex] : 'transparent';
        const neighborhoodColor = neighborhoodColorIndex >= 0 ? neighborhoodColorScale[neighborhoodColorIndex] : 'transparent';
        const cityColor = cityColorIndex >= 0 ? cityColorScale[cityColorIndex] : 'transparent';
        const disciplineColor = disciplineColorIndex >= 0 ? disciplineColorScale[disciplineColorIndex] : 'transparent';

        const selectedColors = [];

        if (sizeColorIndex >= 0) {
          selectedColors.push(sizeColorScale[sizeColorIndex]);
        }
        if (neighborhoodColorIndex >= 0) {
          selectedColors.push(neighborhoodColorScale[neighborhoodColorIndex]);
        }
        if (cityColorIndex >= 0) {
          selectedColors.push(cityColorScale[cityColorIndex]);
        }
        if (disciplineColorIndex >= 0) {
          selectedColors.push(disciplineColorScale[disciplineColorIndex]);
        }

        console.log(sizeColorIndex);
    return (
          <React.Fragment
          key={listing.title}
          >
            
            <div  
                className="directory-block--item"
                style={{ 
                  backgroundImage: `linear-gradient(90deg, ${selectedColors.join(', ')})` 
                }}
            >
              
              <a 
                href={`${listing.website}?seattle-creative-directory`} 
                target="_blank"
              >
                {listing.title} 
              </a>
              
              {listing.episodePromo ? 
              <div className={`episodePromo ${listing.color}`}>{listing.episodePromo && listing.episodePromo}</div> : '' 
              }

              {listing.episodeURL ? 
              <AudioPlayerSmall 
              episodeURL={listing.episodeURL && listing.episodeURL} /> : '' 
              }

              {/* <listingTags tags={listing.tags} /> */}
              {/* include social handle, make a new component */}
            </div>
          </React.Fragment>

    )
  }
  )}
  </div>
)
}
export default DirectoryListing;