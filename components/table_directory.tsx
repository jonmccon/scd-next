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
  
  const totalcount: number = listingsA.length + listingsB.length + listingsC.length + listingsD.length + listingsE.length + listingsF.length + listingsG.length + listingsH.length + listingsI.length + listingsJ.length + listingsK.length + listingsL.length + listingsM.length + listingsN.length + listingsO.length + listingsP.length + listingsQ.length + listingsR.length + listingsS.length + listingsT.length + listingsU.length + listingsV.length + listingsW.length + listingsX.length + listingsY.length + listingsZ.length + listingsNumbers.length

  
  return (
    <div className="grid">
      <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">begin directory</h2>
            <p className="text-sm text-gray-500">
              Fetched {totalcount} users in {duration}ms
            </p>
          </div>
          <RefreshButton />
        </div>
      </div>
      
      <div className='directory-block'>
        <div className="divide-y divide-gray-900/5">
          {listingsA.map((listing: { title: string; website: string; }) => (
            <div
              key={listing.title}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center space-x-4">
                <div className="space-y-1">
                  <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="divide-y divide-gray-900/5">
          {listingsB.map((listing: { title: string; website: string; }) => (
            <div
              key={listing.title}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center space-x-4">
                <div className="space-y-1">
                  <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="divide-y divide-gray-900/5">
          {listingsC.map((listing: { title: string; website: string; }) => (
            <div
              key={listing.title}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center space-x-4">
                <div className="space-y-1">
                  <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="divide-y divide-gray-900/5">
          {listingsD.map((listing: { title: string; website: string; }) => (
            <div
              key={listing.title}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center space-x-4">
                <div className="space-y-1">
                  <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="divide-y divide-gray-900/5">
          {listingsE.map((listing: { title: string; website: string; }) => (
            <div
              key={listing.title}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center space-x-4">
                <div className="space-y-1">
                  <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="divide-y divide-gray-900/5">
          {listingsF.map((listing: { title: string; website: string; }) => (
            <div
              key={listing.title}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center space-x-4">
                <div className="space-y-1">
                  <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="divide-y divide-gray-900/5">
        {listingsG.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="divide-y divide-gray-900/5">
        {listingsH.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="divide-y divide-gray-900/5">
        {listingsI.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="divide-y divide-gray-900/5">
        {listingsJ.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="divide-y divide-gray-900/5">
        {listingsK.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="divide-y divide-gray-900/5">
        {listingsL.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="divide-y divide-gray-900/5">
        {listingsM.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="divide-y divide-gray-900/5">
        {listingsN.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="divide-y divide-gray-900/5">
        {listingsO.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="divide-y divide-gray-900/5">
        {listingsP.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="divide-y divide-gray-900/5">
        {listingsQ.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="divide-y divide-gray-900/5">
        {listingsR.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="divide-y divide-gray-900/5">
        {listingsS.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="divide-y divide-gray-900/5">
        {listingsT.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="divide-y divide-gray-900/5">
        {listingsU.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="divide-y divide-gray-900/5">
        {listingsV.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="divide-y divide-gray-900/5">
        {listingsW.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="divide-y divide-gray-900/5">
        {listingsR.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="divide-y divide-gray-900/5">
        {listingsX.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="divide-y divide-gray-900/5">
        {listingsY.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="divide-y divide-gray-900/5">
        {listingsZ.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="divide-y divide-gray-900/5">
        {listingsNumbers.map((listing: { title: string; website: string; }) => (
          <div
            key={listing.title}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <a target='_blank' href={`${listing.website}?seattle-creative-directory`}><p className="font-medium leading-none">{listing.title}</p></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      

    </div>

  )
}
