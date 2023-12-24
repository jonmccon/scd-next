'use client'
import { useState, useEffect } from 'react';
import EpisodeListing from './episode-listing'

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
    return <div> Episodes Loading...</div>;
  }

  return (
    <div id="showContainer">  
      <EpisodeListing episodeQuery={data} />
    </div>
  );
}