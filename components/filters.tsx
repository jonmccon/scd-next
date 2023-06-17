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
          <ul>
            <li>THREE_DIMENSIONAL</li>
            <li>ADVERTISING</li>
            <li>ARCHITECTURE</li>
            <li>BRANDING</li>
            <li>COMMUNITY</li>
            <li>DEVELOPMENT</li>
            <li>ECOMMERCE</li>
            <li>ENGINEERING</li>
            <li>ENVIRONMENTAL</li>
            <li>EVENTS</li>
            <li>EXHIBITION</li>
            <li>EXPERIENCE</li>
            <li>EXPERIENTIAL</li>
            <li>GAMING</li>
            <li>ILLUSTRATION</li>
            <li>INDUSTRIAL</li>
            <li>INHOUSE</li>
            <li>INTERACTIVE</li>
            <li>INTERIOR</li>
            <li>MARKETING</li>
            <li>MOTION</li>
            <li>NAMING</li>
            <li>PACKAGING</li>
            <li>PHOTOGRAPHY</li>
            <li>PRESENTATION</li>
            <li>PRESS</li>
            <li>PRINT</li>
            <li>PRINTER</li>
            <li>PRODUCT</li>
            <li>PUBLIC_RELATIONS</li>
            <li>RECRUITER</li>
            <li>RESEARCH</li>
            <li>SCHOOL</li>
            <li>SOUND</li>
            <li>STRATEGY</li>
            <li>TYPOGRAPHY</li>
            <li>UX_UI</li>
            <li>VFX</li>
            <li>VIDEO</li>
            <li>VOICE</li>
          </ul>
      </div>

     
      
      

    </div>

  )
}
