import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
// import Table from '@/components/table'
// import Directory from '@/components/listing/directory'
// import Filters from '@/components/listing/filters'
import Episodes from '@/components/listing/episodes'
import MenuLeft from '@/components/header/socials'
import MenuRight from '@/components/header/subscribe'
import About from '@/components/footer/about'
import { FilterProvider } from '@/components/FilterContext'
import TypeformSubmission from '@/components/typeform/TypeformSubmission'
import Subscribe from '@/components/header/subscribe'
import LoadEpisode from '@/components/loadins/load-episode'
import MapboxMap from '@/components/MapboxMap'
// import Logo from '@/components/header/logo'
// import Header from '@/components/header/header'
import Socials from '@/components/header/socials'
import Logo from '@/components/header/logo'

const Directory = React.lazy(() => import('@/components/listing/directory'));
const Filters = React.lazy(() => import('@/components/header/filters'));

export const preferredRegion = 'home'
export const dynamic = 'force-dynamic'

// can i use transitions on the suspense boundary?
// document.startViewTransition(() => { // This kicks off the view transition
//   document.body.appendChild(newImage);

export default function Home() {
  return (
    <main className="pattern">
      <div className="wrapper">
      
        <Logo />
        <Socials />

          <FilterProvider>
          
            <Suspense> 
              <Episodes />    
            </Suspense>
          
            <Suspense> 
              <Filters />
            </Suspense>
          
            <Suspense> 
              <MapboxMap />
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
