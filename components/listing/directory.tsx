import prisma from '@/lib/prisma'
import RefreshButton from '../refresh-button'
import DirectoryListing from './directory-listing'
import Link from 'next/link'

export default async function Directory() {
  const startTime = Date.now()
  const duration = Date.now() - startTime
  
  const listingsA = await prisma.directory.findMany({ where: { published: true, category: "A",},})
  const listingsB = await prisma.directory.findMany({ where: { published: true, category: "B",},})
  const listingsC = await prisma.directory.findMany({ where: { published: true, category: "C",},})
  const listingsD = await prisma.directory.findMany({ where: { published: true, category: "D",},})
  const listingsE = await prisma.directory.findMany({ where: { published: true, category: "E",},})
  const listingsF = await prisma.directory.findMany({ where: { published: true, category: "F",},})
  const listingsG = await prisma.directory.findMany({ where: { published: true, category: "G",},})
  const listingsH = await prisma.directory.findMany({ where: { published: true, category: "H",},})
  const listingsI = await prisma.directory.findMany({ where: { published: true, category: "I",},})
  const listingsJ = await prisma.directory.findMany({ where: { published: true, category: "J",},})
  const listingsK = await prisma.directory.findMany({ where: { published: true, category: "K",},})
  const listingsL = await prisma.directory.findMany({ where: { published: true, category: "L",},})
  const listingsM = await prisma.directory.findMany({ where: { published: true, category: "M",},})
  const listingsN = await prisma.directory.findMany({ where: { published: true, category: "N",},})
  const listingsO = await prisma.directory.findMany({ where: { published: true, category: "O",},})
  const listingsP = await prisma.directory.findMany({ where: { published: true, category: "P",},})
  const listingsQ = await prisma.directory.findMany({ where: { published: true, category: "Q",},})
  const listingsR = await prisma.directory.findMany({ where: { published: true, category: "R",},})
  const listingsS = await prisma.directory.findMany({ where: { published: true, category: "S",},})
  const listingsT = await prisma.directory.findMany({ where: { published: true, category: "T",},})
  const listingsU = await prisma.directory.findMany({ where: { published: true, category: "U",},})
  const listingsV = await prisma.directory.findMany({ where: { published: true, category: "V",},})
  const listingsW = await prisma.directory.findMany({ where: { published: true, category: "W",},})
  const listingsX = await prisma.directory.findMany({ where: { published: true, category: "X",},})
  const listingsY = await prisma.directory.findMany({ where: { published: true, category: "Y",},})
  const listingsZ = await prisma.directory.findMany({ where: { published: true, category: "Z",},})
  const listingsNumbers = await prisma.directory.findMany({ where: { published: true, category: "numbers",},})
  
  // possible array of arrays to map thru
  // const listings = [...listingsA, ...listingsB, ...listingsC, ...listingsD, ...listingsE, ...listingsF, ...listingsG,
  //                   ...listingsH, ...listingsI, ...listingsJ, ...listingsK, ...listingsL, ...listingsM, ...listingsN,
  //                   ...listingsO, ...listingsP, ...listingsQ, ...listingsR, ...listingsS, ...listingsT, ...listingsU,
  //                   ...listingsV, ...listingsW, ...listingsX, ...listingsY, ...listingsZ, ...listingsNumbers]
  // var doubledArray = listings.map(nested => nested.map(element => element * 2));

  const totalcount: number = listingsA.length + listingsB.length + listingsC.length + listingsD.length + listingsE.length + listingsF.length + listingsG.length + listingsH.length + listingsI.length + listingsJ.length + listingsK.length + listingsL.length + listingsM.length + listingsN.length + listingsO.length + listingsP.length + listingsQ.length + listingsR.length + listingsS.length + listingsT.length + listingsU.length + listingsV.length + listingsW.length + listingsX.length + listingsY.length + listingsZ.length + listingsNumbers.length

  
  return (
    
    <div className="directory">  
    
    
      <div className='directory-block'>
        
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

        {/* <div className="directory-block--title"><a id="X"></a>X</div>
        <DirectoryListing listingQuery={listingsX} /> */}

        <div className="directory-block--title"><a id="Y"></a>Y</div>
        <DirectoryListing listingQuery={listingsY} />

        <div className="directory-block--title"><a id="Z"></a>Z</div>
        <DirectoryListing listingQuery={listingsZ} />

        <div className="directory-block--title"><a id="#"></a>#</div>
        <DirectoryListing listingQuery={listingsNumbers} />

        <div className="directory-block--title" id="endcap">*</div>       
          <div className="directory-block--end">
            <p>{totalcount} Studios</p> 
            <p>Don&#39;t see yourself?</p>
            <RefreshButton />
            <p>
            <Link
              className="directory-endcap--link highlight" 
              href="#">Get Listed
            </Link>
            </p>

          </div>
      </div>

    </div>
    
      

  

  )
}
