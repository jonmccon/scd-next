'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import RefreshButton from '../refresh-button'
import DirectoryListing from './directory-listing'
import Link from 'next/link'
import TablePlaceholder from '../table-placeholder'

interface Listings {
  [key: string]: Listing[]; // This means that any string key will return an array of Listing objects
}

interface Listing {
  id: string;
  title: string;
}

export default function Directory() {

  const [data, setData] = useState<{ listings: Listings } | null>(null);
  const categories = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split('');

  useEffect(() => {
    axios.get('/api/filters')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  if (!data) {
    return <TablePlaceholder />;
  }

  type Data = { listings: Record<string, any> };
  const { listings }: Data = data;
  // const totalcount = Object.values(listings).reduce((total, categoryListings) => total + categoryListings.length, 0);

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
            {/* <p>{totalcount} Studios</p>  */}
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
