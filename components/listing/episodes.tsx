'use client'
import { useState, useEffect } from 'react';
import EpisodeListing from './episode-listing'
import LoadEpisode from '../loadins/load-episode';

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
      <EpisodeListing episodeQuery={data} />
    </div>
  );
}