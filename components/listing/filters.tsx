import prisma from '@/lib/prisma'
import { timeAgo } from '@/lib/utils'
import Image from 'next/image'
import RefreshButton from '../refresh-button'
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
    <div className="filters">

      <div className="tagSize">
      <h5>SIZE</h5>
        <div className='tagSizeContainer'>
        {sizes.map((size: { size: string; }) => (
          <div
            key={size.size}
            className="filter-tag-container"
          >
          <a 
            className="filter-tag--attr">
            {size.size}
          </a>
          </div>
        ))}
        </div>
      </div>


      <div className="tagSeattle">
      <h5>SEATTLE BY NEIGHBORHOOD</h5>
        <div className='tagSeattleContainer'>
        {neighborhoods.map((neighborhood: { neighborhood: string; }) => (
          <div
            key={neighborhood.neighborhood}
            className="filter-tag-container"
          >
          <a 
            className="filter-tag--attr">
            {neighborhood.neighborhood}
          </a>
          </div>
        ))}
        </div>
      </div>

      <div className="tagCity">
      <h5>GREATER PNW</h5>
        <div className='tagCityContainer'>
        {citys.map((city: { city: string; }) => (
          <div
            key={city.city}
            className="filter-tag-container"
          >
          <a 
            className="filter-tag--attr">
            {city.city}
          </a>
          </div>
        ))}
        </div>
      </div>

      <div className="allTags">
      <h5>DISCIPLINE</h5>
        <div className='allTagsContainer'>
        {filters.map((filter, index) => (
          <div
            key={index}
            className="filter-tag-container"
          >
          <a 
            className="filter-tag--attr">
            {filter}
          </a>
          </div>
        ))} 
        </div>
      </div>

     
      
      

    </div>

  )
}
