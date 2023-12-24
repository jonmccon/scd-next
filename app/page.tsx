import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
// import Table from '@/components/table'
import TablePlaceholder from '@/components/table-placeholder'
// import Directory from '@/components/listing/directory'
// import Filters from '@/components/listing/filters'
import Episodes from '@/components/listing/episodes'
import MenuLeft from '@/components/header/menu-left'
import MenuRight from '@/components/header/subscribe'
import About from '@/components/footer/about'
import { FilterProvider } from '@/components/FilterContext'
import TypeformSubmission from '@/components/typeform/TypeformSubmission'
import Subscribe from '@/components/header/subscribe'
import LoadEpisode from '@/components/loadins/load-episode'

const Directory = React.lazy(() => import('@/components/listing/directory'));
const Filters = React.lazy(() => import('@/components/listing/filters'));


// Prisma does not support Edge without the Data Proxy currently
// export const runtime = 'edge'
export const preferredRegion = 'home'
export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="pattern">
      <div className="wrapper">
      
      <div className="logo"></div>
      <MenuLeft />
      <Subscribe />
      
      <div className="headline-wrapper">
        <div className="headline">
          <h1>Cataloging the creative studios of the Pacific Northwest</h1>
        </div>
      </div>
      
        <Suspense> 
          <Episodes />    
        </Suspense>

        <FilterProvider>
          <Suspense> 
            <Filters />
          </Suspense>
          <Suspense> 
            <Directory />   
          </Suspense>
        </FilterProvider>
        
        <About />
      
      </div>
    <TypeformSubmission />       
    </main>
  )
}
