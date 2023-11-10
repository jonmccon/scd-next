import { PrismaClient } from '@prisma/client'
import EpisodeListing from './episode-listing'

const prisma = new PrismaClient()

export default async function Episodes() {
  const episodeList = await prisma.listing.findMany({ 
    where: { published: true, 
    episodeURL: {
      startsWith: "https://cdn.simplecast.com/audio/"
    }},
    orderBy: {
      episodePromo: 'desc',
    } 
  })

  return (
    
    <div id="showContainer">  
        <EpisodeListing episodeQuery={episodeList} />
    
      

    </div>
    
      

  

  )
}
