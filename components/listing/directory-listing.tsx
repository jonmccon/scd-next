'use client'
import React from "react";
import AudioPlayerSmall from "../audioplayer/audio-player-small";
import chroma from 'chroma-js';

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

interface DirectoryListingProps {
  listingsByCategory: Listings;
}

function DirectoryListing({ listingsByCategory }: DirectoryListingProps) {
  return (
    <div className="directory-list">
      {Object.entries(listingsByCategory).map(([category, listings]) => (
        <div key={category}>
          {listings.map(listing => (
            <React.Fragment key={listing.title}>
              <div className="directory-block--item">
                <a href={`${listing.website}?seattle-creative-directory`} target="_blank">
                  {listing.title} 
                </a>
                {listing.episodePromo && 
                  <div className={`episodePromo ${listing.color}`}>{listing.episodePromo}</div>
                }
                {listing.episodeURL && 
                  <AudioPlayerSmall episodeURL={listing.episodeURL} />
                }
                {/* <listingTags tags={listing.tags} /> */}
                {/* include social handle, make a new component */}
              </div>
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  )
}
export default DirectoryListing;