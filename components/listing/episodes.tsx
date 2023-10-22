import prisma from '@/lib/prisma'
import EpisodeListing from './episode-listing'

export default async function Episodes() {
  const episodeList = await prisma.directory.findMany({ 
    where: { published: true, 
    episodeURL: {
      startsWith: "https://cdn.simplecast.com/audio/"
    }}, })

  return (
    
    <div className="showContainer">  
        <EpisodeListing episodeQuery={episodeList} />
    
      

    </div>
    
      

  

  )
}
