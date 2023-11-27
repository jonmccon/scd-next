'use client'
import { useState, useEffect } from 'react';
import EpisodeListing from './episode-listing'

export default function Episodes() {
  const [episodeList, setEpisodeList] = useState([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      const res = await fetch('/api/episodes');
      const data = await res.json();
      setEpisodeList(data);
    };

    fetchEpisodes();
  }, []);

  return (
    <div id="showContainer">  
      <EpisodeListing episodeQuery={episodeList} />
    </div>
  );
}