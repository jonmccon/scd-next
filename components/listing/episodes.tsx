import prisma from '@/lib/prisma'
import EpisodeListing from './episode-listing'

export default async function Episodes() {
  const episodeList = await prisma.directory.findMany({ 
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
