'use client'
import React from "react";
import AudioPlayerSmall from "../audioplayer/audio-player-small";
import chroma from 'chroma-js';

function DirectoryListing(props: { listingQuery: any[]; }) {
  

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
      tag: any;
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
        tag: listing.tag,
      });
    });
    return listingList;
  };

  const listingList = getListingList();

return (
      
  <div className="directory-list">
  {listingList.map(listing => {

 
    return (
          <React.Fragment
          key={listing.title}
          >
            
            <div  
                className="directory-block--item"
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