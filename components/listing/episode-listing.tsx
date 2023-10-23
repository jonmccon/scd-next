'use client'
import React from "react";
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import { LuAtSign, LuTwitter, LuInstagram, LuAmpersand, LuAmpersands } from 'react-icons/lu';
import { FaCirclePlay, FaCirclePause } from 'react-icons/fa6'


class EpisodeListing extends React.Component<any, any> {
  getEpisodeList() {
    const episodeList: { title: any; website: any; twit: any; inst: any; linkATitle: any; linkAURL: any; linkBTitle: any; linkBURL: any; episodeURL: any; episodePerson: any; episodePromo: any; color: any; pullquote: any; }[] = [];
    this.props.episodeQuery.forEach((episode: { title: any; website: any; twit: any; inst: any; linkATitle: any; linkAURL: any; linkBTitle: any; linkBURL: any; episodeURL: any; episodePerson: any; episodePromo: any; color: any; pullquote: any; }) => {
      episodeList.push({
        title: episode.title,
        website: episode.website,
        twit: episode.twit,
        inst: episode.inst,
        linkATitle: episode.linkATitle,
        linkAURL: episode.linkAURL,
        linkBTitle: episode.linkBTitle,
        linkBURL: episode.linkBURL,
        episodeURL: episode.episodeURL,
        episodePerson: episode.episodePerson,
        episodePromo: episode.episodePromo,
        color: episode.color,
        pullquote: episode.pullquote,
      });
    });
    return episodeList;
  }

  render() {
    const episodeList = this.getEpisodeList();

    return (
      <div className="podcast">
      
        {episodeList.map((episode: { title: any; website: any; twit: any; inst: any; linkATitle: any; linkAURL: any; linkBTitle: any; linkBURL: any; episodeURL: any; episodePerson: any; episodePromo: any; color: any; pullquote: any; }) => (
          <div 
            className= {`podcastEpisode ${episode.color}`}
            key={episode.title}
          >
        
            
            {/* Pull quote */}
            <div className="pullquote">{episode.pullquote}</div>
            
            <div className="podcastEpisode-content">
              <a className="podcastEpisode-person"
                href={`${episode.website}?seattle-creative-directory`} 
                target="_blank"
              >
                {episode.episodePerson} of {episode.title}
              </a>
            </div>

            {/* If Additional Link A,B */}
            {episode.linkATitle ? 
              <div className="podcastEpisode-content">
                <LuAmpersand />&nbsp;
                <a 
                    href={`${episode.linkAURL}?seattle-creative-directory`}
                    target="_blank"
                  >
                    {episode.linkATitle && episode.linkATitle}
                  </a>
                </div>
                : '' 
              }
            {episode.linkBTitle ? 
              <div className="podcastEpisode-content">
                <LuAmpersands />&nbsp;
                <a 
                    href={`${episode.linkBURL}?seattle-creative-directory`}
                    target="_blank"
                  >
                    {episode.linkBTitle && episode.linkBTitle}
                  </a>
                  &nbsp;
                </div>
                : '' 
              }

            {/* If Twitter */}
            {episode.twit ? 
              <div className="podcastEpisode-content">
                <LuTwitter />&nbsp;
                <a 
                    href={`https://twitter.com/${episode.twit}`}
                    target="_blank"
                  >
                    {episode.twit && episode.twit}
                  </a>
                  &nbsp;
                </div>
                : '' 
              }

              {/* If Instagram */}
              {episode.inst ? 
                <div className="podcastEpisode-content">
                  <LuInstagram />&nbsp;
                  <a 
                    href={`https://www.instagram.com/${episode.inst}`}
                    target="_blank"
                  >
                    {episode.inst && episode.inst}
                  </a>
                  &nbsp;
                </div>
                : '' 
              }
              
              <AudioPlayer         
                src= {episode.episodeURL}
                onPlay={e => console.log("onPlay")}
                layout="horizontal-reverse" 
                customProgressBarSection={
                  [
                    RHAP_UI.CURRENT_LEFT_TIME,
                    RHAP_UI.PROGRESS_BAR,
                  ]
                }
                customAdditionalControls={[]}  
                customVolumeControls={[]}
                showJumpControls={false}
                customIcons={{
                  play: 
                  <FaCirclePlay />,
                  pause: 
                  <FaCirclePause /> 
                  }}
              />
          </div>
      
      
        ))}
      </div>
    );
  }
}

export default EpisodeListing;
