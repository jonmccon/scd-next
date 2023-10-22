import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
// import Table from '@/components/table'
import TablePlaceholder from '@/components/table-placeholder'
import TableDirectory from '@/components/table-directory'
import Filters from '@/components/filters'
import Episodes from '@/components/listing/episodes'

// Prisma does not support Edge without the Data Proxy currently
// export const runtime = 'edge'
export const preferredRegion = 'home'
export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="pattern">
      <div className="container">
        <div className='headline-wrapper'></div>
      
        <Suspense fallback={<TablePlaceholder />}> 
            {/* @ts-expect-error Async Server Component */}
            <Episodes />    
            {/* @ts-expect-error Async Server Component */}
            <Filters />
            {/* @ts-expect-error Async Server Component */}
            <TableDirectory />          
        </Suspense>
        
      


{/* Footer content */}
        <div className="flex justify-center space-x-5 pt-10 mt-10 border-t border-gray-300 w-full max-w-xl text-gray-600">
          
          {/* <Link
            href="https://postgres-drizzle.vercel.app/"
            className="font-medium underline underline-offset-4 hover:text-black transition-colors"
          >
            Drizzle
          </Link>
        </div>

        <div className="sm:absolute sm:bottom-0 w-full px-20 py-10 flex justify-between">
          <Link href="https://vercel.com">
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              width={100}
              height={24}
              priority
            />
          </Link>
          <Link
            href="https://github.com/vercel/examples/tree/main/storage/postgres-prisma"
            className="flex items-center space-x-2"
          >
            <Image
              src="/github.svg"
              alt="GitHub Logo"
              width={24}
              height={24}
              priority
            />
            <p className="font-light">Source</p>
          </Link> */}
        </div>
      </div>
    </main>
  )
}
