import { PrismaClient } from '@prisma/client'
import RefreshButton from '../refresh-button'
import DirectoryListing from './directory-listing'
import Link from 'next/link'
import ListingSubmission from '../typeform/FormEmbed'

const prisma = new PrismaClient()

export default async function Directory() {
  const categories = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split('');
  const listings: {[key: string]: any} = {};

  for (let category of categories) {
    listings[category] = await prisma.listing.findMany({ where: { published: true, category: category === '#' ? 'numbers' : category }});
  }

  
  const totalcount = Object.values(listings).reduce((total, categoryListings) => total + categoryListings.length, 0);

  
  return (
    
    <div className="directory">  
    
    
      {categories.map(category => (
          <div className='directory-block' key={category}>
            <div className="directory-block--title"><a id={category}></a>{category}</div>
            <DirectoryListing listingQuery={listings[category]} />
          </div>
        ))}

        <div className="directory-block--title" id="endcap">*</div>       
          <div className="directory-block--end">
            <p>{totalcount} Studios</p> 
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
