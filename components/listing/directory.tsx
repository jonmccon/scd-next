import { PrismaClient } from '@prisma/client'
import RefreshButton from '../refresh-button'
import DirectoryListing from './directory-listing'
import Link from 'next/link'

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



      {/* <div className='directory-block'>
        
        <div className="directory-block--title"><a id="A"></a>A</div>
        <DirectoryListing listingQuery={listingsA} />

        <div className="directory-block--title"><a id="B"></a>B</div>
        <DirectoryListing listingQuery={listingsB} />

        <div className="directory-block--title"><a id="C"></a>C</div>
        <DirectoryListing listingQuery={listingsC} />

        <div className="directory-block--title"><a id="D"></a>D</div>
        <DirectoryListing listingQuery={listingsD} />

        <div className="directory-block--title"><a id="E"></a>E</div>
        <DirectoryListing listingQuery={listingsE} />

        <div className="directory-block--title"><a id="F"></a>F</div>
        <DirectoryListing listingQuery={listingsF} />
      </div>
        
        
      <div className='directory-block'>
        <div className="directory-block--title"><a id="G"></a>G</div>     
        <DirectoryListing listingQuery={listingsG} />

        <div className="directory-block--title"><a id="H"></a>H</div>
        <DirectoryListing listingQuery={listingsH} />

        <div className="directory-block--title"><a id="I"></a>I</div>
        <DirectoryListing listingQuery={listingsI} />

        <div className="directory-block--title"><a id="J"></a>J</div>
        <DirectoryListing listingQuery={listingsJ} />

        <div className="directory-block--title"><a id="K"></a>K</div>
        <DirectoryListing listingQuery={listingsK} />

        <div className="directory-block--title"><a id="L"></a>L</div>
        <DirectoryListing listingQuery={listingsL} />

        <div className="directory-block--title"><a id="M"></a>M</div>
        <DirectoryListing listingQuery={listingsM} />

        <div className="directory-block--title"><a id="N"></a>N</div>
        <DirectoryListing listingQuery={listingsN} />
      
      </div>

      <div className='directory-block'>
        <div className="directory-block--title"><a id="O"></a>O</div>
        <DirectoryListing listingQuery={listingsO} />

        <div className="directory-block--title"><a id="P"></a>P</div>
        <DirectoryListing listingQuery={listingsP} />

        <div className="directory-block--title"><a id="Q"></a>Q</div>
        <DirectoryListing listingQuery={listingsQ} />

        <div className="directory-block--title"><a id="R"></a>R</div>
        <DirectoryListing listingQuery={listingsR} />

        <div className="directory-block--title"><a id="S"></a>S</div>
        <DirectoryListing listingQuery={listingsS} />

      </div>
      
      <div className='directory-block'>
        <div className="directory-block--title"><a id="T"></a>T</div>
        <DirectoryListing listingQuery={listingsT} />

        <div className="directory-block--title"><a id="U"></a>U</div>
        <DirectoryListing listingQuery={listingsU} />

        <div className="directory-block--title"><a id="V"></a>V</div>
        <DirectoryListing listingQuery={listingsV} />

        <div className="directory-block--title"><a id="W"></a>W</div>
        <DirectoryListing listingQuery={listingsW} />

        <div className="directory-block--title"><a id="X"></a>X</div>
        <DirectoryListing listingQuery={listingsX} />

        <div className="directory-block--title"><a id="Y"></a>Y</div>
        <DirectoryListing listingQuery={listingsY} />

        <div className="directory-block--title"><a id="Z"></a>Z</div>
        <DirectoryListing listingQuery={listingsZ} />

        <div className="directory-block--title"><a id="#"></a>#</div>
        <DirectoryListing listingQuery={listingsNumbers} /> */}

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
