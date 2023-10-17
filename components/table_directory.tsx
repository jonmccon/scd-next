import prisma from '@/lib/prisma'
import { timeAgo } from '@/lib/utils'
import Image from 'next/image'
import RefreshButton from './refresh-button'
import Link from 'next/link'
import { Key, ReactElement, JSXElementConstructor, ReactFragment } from 'react'

export default async function Table_Directory() {
  const startTime = Date.now()
  const duration = Date.now() - startTime
  

//   const { tags } = this.props;
//
// turn this component into just the individual listing
//    
  
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
  // const listings = [...listingsA, ...listingsB, ...listingsC]
  // var doubledArray = array.map(nested => nested.map(element => element * 2));

  const totalcount: number = listingsA.length + listingsB.length + listingsC.length + listingsD.length + listingsE.length + listingsF.length + listingsG.length + listingsH.length + listingsI.length + listingsJ.length + listingsK.length + listingsL.length + listingsM.length + listingsN.length + listingsO.length + listingsP.length + listingsQ.length + listingsR.length + listingsS.length + listingsT.length + listingsU.length + listingsV.length + listingsW.length + listingsX.length + listingsY.length + listingsZ.length + listingsNumbers.length

  
  return (
    
    <div className="directory">  
    
    
      <div className='directory-block'>
      <p className="text-sm text-gray-500">
              Fetched {totalcount} users in {duration}ms
            </p>
            <RefreshButton />
        
      <div className="directory-block--title"><a id="A"></a>A</div>
        <div className="directory-list">
          {listingsA.map((listing: { title: string; website: string; }) => (
            <div
              key={listing.title}
              className=""
            >
              <div className="directory-block--item">                
                  <a target='_blank' href={`${listing.website}?seattle-creative-directory`}>{listing.title}</a> 
              </div>
            </div>
          ))}
        </div>

      <div className="directory-block--title"><a id="B"></a>B</div>
        <div className="directory-list">
          {listingsB.map((listing: { title: string; website: string; }) => (
            <div
              key={listing.title}
              className=""
            >
              <div className="directory-block--item">
                <div className="space-y-1">
                  <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
                </div>
              </div>
            </div>
          ))}
        </div>

      <div className="directory-block--title"><a id="C"></a>C</div>
        <div className="directory-list">
          {listingsC.map((listing: { title: string; website: string; }) => (
            <div
              key={listing.title}
              className=""
            >
              <div className="directory-block--item">
                <div className="space-y-1">
                  <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
                </div>
              </div>
            </div>
          ))}
        </div>

      <div className="directory-block--title"><a id="D"></a>D</div>
        <div className="directory-list">
          {listingsD.map((listing: { title: string; website: string; }) => (
            <div
              key={listing.title}
              className=""
            >
              <div className="directory-block--item">
                <div className="space-y-1">
                  <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
                </div>
              </div>
            </div>
          ))}
        </div>

      <div className="directory-block--title"><a id="E"></a>E</div>
        <div className="directory-list">
          {listingsE.map((listing: { title: string; website: string; }) => (
            <div
              key={listing.title}
              className=""
            >
              <div className="directory-block--item">
                <div className="space-y-1">
                  <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      <div className="directory-block--title"><a id="F"></a>F</div>        
        <div className="directory-list">
          {listingsF.map((listing: { title: string; website: string; }) => (
            <div
              key={listing.title}
              className=""
            >
              <div className="directory-block--item">
                <div className="space-y-1">
                  <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className='directory-block'>

      <div className="directory-block--title"><a id="G"></a>G</div>   
      <div className="directory-list">
        {listingsG.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className=""
          >
            <div className="directory-block--item">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="directory-block--title"><a id="H"></a>H</div>   
      <div className="directory-list">
        {listingsH.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className=""
          >
            <div className="directory-block--item">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="directory-block--title"><a id="I"></a>I</div>   
      <div className="directory-list">
        {listingsI.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className=""
          >
            <div className="directory-block--item">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="directory-block--title"><a id="J"></a>J</div>   
      <div className="directory-list">
        {listingsJ.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className=""
          >
            <div className="directory-block--item">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="directory-block--title"><a id="K"></a>K</div>   
      <div className="directory-list">
        {listingsK.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className=""
          >
            <div className="directory-block--item">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="directory-block--title"><a id="L"></a>L</div>   
      <div className="directory-list">
        {listingsL.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className=""
          >
            <div className="directory-block--item">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="directory-block--title"><a id="M"></a>M</div>   
      <div className="directory-list">
        {listingsM.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className=""
          >
            <div className="directory-block--item">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="directory-block--title"><a id="N"></a>N</div>   
      <div className="directory-list">
        {listingsN.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className=""
          >
            <div className="directory-block--item">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>

      <div className='directory-block'>
      <div className="directory-block--title"><a id="O"></a>O</div>     
      <div className="directory-list">
        {listingsO.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className=""
          >
            <div className="directory-block--item">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="directory-block--title"><a id="P"></a>P</div>   
      <div className="directory-list">
        {listingsP.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className=""
          >
            <div className="directory-block--item">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="directory-block--title"><a id="Q"></a>Q</div>   
      <div className="directory-list">
        {listingsQ.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className=""
          >
            <div className="directory-block--item">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="directory-block--title"><a id="R"></a>R</div>   
      <div className="directory-list">
        {listingsR.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className=""
          >
            <div className="directory-block--item">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="directory-block--title"><a id="S"></a>S</div>   
      <div className="directory-list">
        {listingsS.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className=""
          >
            <div className="directory-block--item">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
      
      <div className='directory-block'>
      <div className="directory-block--title"><a id="T"></a>T</div>   
      <div className="directory-list">
        {listingsT.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className=""
          >
            <div className="directory-block--item">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="directory-block--title"><a id="U"></a>U</div>   
      <div className="directory-list">
        {listingsU.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className=""
          >
            <div className="directory-block--item">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="directory-block--title"><a id="V"></a>V</div>   
      <div className="directory-list">
        {listingsV.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className=""
          >
            <div className="directory-block--item">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="directory-block--title"><a id="W"></a>W</div>   
      <div className="directory-list">
        {listingsW.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className=""
          >
            <div className="directory-block--item">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="directory-block--title"><a id="R"></a>R</div>   
      <div className="directory-list">
        {listingsR.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className=""
          >
            <div className="directory-block--item">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="directory-block--title"><a id="X"></a>X</div>   
      <div className="directory-list">
        {listingsX.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className=""
          >
            <div className="directory-block--item">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="directory-block--title"><a id="Y"></a>Y</div>   
      <div className="directory-list">
        {listingsY.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className=""
          >
            <div className="directory-block--item">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="directory-block--title"><a id="Z"></a>Z</div>   
      <div className="directory-list">
        {listingsZ.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className=""
          >
            <div className="directory-block--item">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="directory-block--title"><a id="#"></a>#</div>   
      <div className="directory-list">
        {listingsNumbers.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className=""
          >
            <div className="directory-block--item">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>

    </div>
    
      

  

  )
}
