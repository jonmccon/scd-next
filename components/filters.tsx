import prisma from '@/lib/prisma'
import { timeAgo } from '@/lib/utils'
import Image from 'next/image'
import RefreshButton from './refresh-button'
import Link from 'next/link'
import { Key, ReactElement, JSXElementConstructor, ReactFragment } from 'react'

export default async function Filters() {


const sizes = await prisma.directory.findMany({
  select: { size: true, }, distinct: ['size'],})

const neighborhoods = await prisma.directory.findMany({
  select: { neighborhood: true, }, distinct: ['neighborhood'],})

const citys = await prisma.directory.findMany({
  select: { city: true, }, distinct: ['city'],})


const filters: Array<String> = [
  "THREE_DIMENSIONAL", "ADVERTISING", "ARCHITECTURE", "BRANDING", "COMMUNITY", "DEVELOPMENT", "ECOMMERCE", "ENGINEERING", "ENVIRONMENTAL", 
  "EVENTS", "EXHIBITION", "EXPERIENCE", "EXPERIENTIAL", "GAMING", "ILLUSTRATION", "INDUSTRIAL", "INHOUSE", "INTERACTIVE", "INTERIOR",
  "MARKETING", "MOTION", "NAMING", "PACKAGING", "PHOTOGRAPHY", "PRESENTATION", "PRESS", "PRINT", "PRINTER", "PRODUCT", "PUBLIC_RELATIONS",
  "RECRUITER", "RESEARCH", "SCHOOL", "SOUND", "STRATEGY", "TYPOGRAPHY", "UX_UI", "VFX", "VIDEO", "VOICE"
];

// console.log(filters)


// may just need to change tags back to a list of strings? 
// then using https://www.prisma.io/docs/concepts/components/prisma-client/full-text-search to search for the tags
// then all data is created equally, and then maybe we can do this state selector thing to filter the data
// Will need a action that changes the background color of all the listings that match that filter

  return (
    <div className="grid">
      <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Recent Users</h2>
            <p className="text-sm text-gray-500">
              {/* Fetched {totalcount} users in {duration}ms */}
            </p>
          </div>
        </div>
      </div>
      
      <div className="divide-y divide-gray-900/5">
        {sizes.map((size: { size: string; }) => (
          <div
          key={size.size}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <p className="font-medium leading-none">{size.size}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="divide-y divide-gray-900/5">
        {neighborhoods.map((neighborhood: { neighborhood: string; }) => (
          <div
          key={neighborhood.neighborhood}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <p className="font-medium leading-none">{neighborhood.neighborhood}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="divide-y divide-gray-900/5">
        {citys.map((city: { city: string; }) => (
          <div
          key={city.city}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <p className="font-medium leading-none">{city.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="divide-y divide-gray-900/5">
        {filters.map((filter) => (
          <div
          key="filter"
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <div className="space-y-1">
                <p className="font-medium leading-none">{filter}</p>
              </div>
            </div>
          </div>
        ))} 
      </div>

     
      
      

    </div>

  )
}
