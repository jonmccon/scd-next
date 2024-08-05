'use client'
import { useState, useEffect } from 'react';
import EpisodeListing from './episode-listing'
import LoadEpisode from '../loadins/load-episode';
import Image from 'next/image';

export default function Episodes() {
  const [data, setData] = useState(null);
  // const [episodeList, setEpisodeList] = useState([]);


  useEffect(() => {
    const fetchEpisodes = async () => {
      const res = await fetch('/api/episodes');
      const data = await res.json();
      setData(data);
    };

    fetchEpisodes();
  }, []);

  if (!data) {
    return <LoadEpisode />;
  }

  return (
    <div id="showContainer">  
    
      <div className="bobbleTop">
        <Image 
          src={"/bobbles/ep12-bobbleTop.png"} 
          alt='bobbleTop'
          width={100}
          height={100}
          >
        </Image>
      </div>
      <div className="bobbleBottom">
        <Image  
          src={"/bobbles/ep12-bobbleBottom.png"} 
          alt='bobbleBottom'
          width={100}
          height={100}
          >
        </Image>
      </div>

      <EpisodeListing episodeQuery={data} />


    </div>
  );
}