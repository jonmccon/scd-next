import React from 'react'
import { Suspense } from 'react'
import Episodes from '@/components/listing/episodes'
import About from '@/components/footer/about'
import { FilterProvider } from '@/components/FilterContext'
import TypeformSubmission from '@/components/typeform/TypeformSubmission'
import MapboxMap from '@/components/MapboxMap'
import Socials from '@/components/header/socials'
import Logo from '@/components/header/logo'
import PromoBanner from '@/components/promo/promo-banner'

const Directory = React.lazy(() => import('@/components/listing/directory'));
const Filters = React.lazy(() => import('@/components/header/floatingFilters'));

export const preferredRegion = 'home'
export const dynamic = 'force-dynamic'

// can i use transitions on the suspense boundary?
// document.startViewTransition(() => { // This kicks off the view transition
//   document.body.appendChild(newImage);

export default function Home() {
  return (
    
    <main className="pattern">
      <PromoBanner />
      <Logo />
          

      <div className="wrapper">
      <FilterProvider>
        <Suspense> 
          <Filters />
        </Suspense>  
      
        <Socials />

          <Suspense>  
            <MapboxMap />
          </Suspense> 

          <Suspense> 
            <Episodes />    
          </Suspense>                  
          
          <Suspense> 
            <Directory />   
          </Suspense>
                    
        <About />
        </FilterProvider>  
      </div>
    <TypeformSubmission />  
       
    </main>

  )
}
