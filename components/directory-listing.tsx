'use client'
import React from "react";
import prisma from '@/lib/prisma';
// import AudioPlayerSmall from "../Audioplayer/AudioPlayerSmall";

class DirectoryListing extends React.Component<any, any> {
  getlistingList() {
    const listingList: { title: any; website: any; episodeURL: any; episodePromo: any; color: any; }[] = [];
    this.props.listingQuery.forEach((listing: { title: any; website: any; episodeURL: any; episodePromo: any; color: any; }) => {
      listingList.push({
        title: listing.title,
        website: listing.website,
        episodeURL: listing.episodeURL,
        episodePromo: listing.episodePromo,
        color: listing.color,
      });
    });
    return listingList;
  }


// export default async function DirectoryListing() {
    
    // const directoryList = await prisma.directory.findMany()

render() {
        const listingList = this.getlistingList();

return (
      
      <div className="directory-list">
        {listingList.map((listing: { website: any; title: string; episodePromo: any; color: any; }) => (
          <React.Fragment>
            {/* 
            Have a class added for each tag that's present. 
            Add an additional a:hover class for each that changes its own display.
            Needs to be added to the tag listing as well. 
            */}

            

            <div
                key={listing.title}  
                className="directory-block--item"
            >
              
              <a 
                href={`${listing.website}?seattle-creative-directory`} 
                target="_blank"
                // onClick={e => {
                //   trackCustomEvent({
                //     category: "Directory",
                //     action: "Clicked",
                //     label: listing.title,
                //   })
                // }}
              >
                {listing.title} 
              </a>
              
              {listing.episodePromo ? 
              <div className={`episodePromo ${listing.color}`}>{listing.episodePromo && listing.episodePromo}</div> : '' 
              }

              {/* {listing.episodeURL ? 
              <AudioPlayerSmall 
                podcastURL={listing.episodeURL && listing.episodeURL} /> : '' 
              } */}

              {/* <listingTags tags={listing.tags} /> */}
              {/* include social handle, make a new component */}
            </div>
          </React.Fragment>

        ))}
        
      </div>
    );
  
}}

export default DirectoryListing;