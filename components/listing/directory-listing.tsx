'use client'
import React from "react";
import AudioPlayerSmall from "../audioplayer/audio-player-small";
import { useFilters } from '../FilterContext';
import chroma from 'chroma-js';

function DirectoryListing(props: { listingQuery: any[]; }) {
  const { selectedFilters } = useFilters();

  const getListingList = () => {
    const listingList: { 
      title: any; 
      website: any; 
      episodeURL: any; 
      episodePromo: any; 
      color: any; 
      metadata: any;
    }[] = [];
    props.listingQuery.forEach(listing => {
      listingList.push({
        title: listing.title,
        website: listing.website,
        episodeURL: listing.episodeURL,
        episodePromo: listing.episodePromo,
        color: listing.color,
        metadata: listing.metadata,
      });
    });
    return listingList;
  };

  const listingList = getListingList();
        
return (
      
  <div className="directory-list">
  {listingList.map(listing => {
    const isSelected = selectedFilters.includes(listing.metadata);
    const backgroundColor = isSelected ? chroma.scale(['white', 'red'])(0.5) : 'white';

    return (
          <React.Fragment
          key={listing.title}
          >
            
            <div  
                className={`directory-block--item ${backgroundColor}`}
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