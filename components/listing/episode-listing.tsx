'use client'
import React from "react";
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';

class EpisodeListing extends React.Component<any, any> {
  getEpisodeList() {
    const episodeList: { title: any; website: any; twit: any; inst: any; linkA: any; linkB: any; episodeURL: any; episodePerson: any; episodePromo: any; color: any; pullquote: any; }[] = [];
    this.props.episodeQuery.forEach((episode: { title: any; website: any; twit: any; inst: any; linkA: any; linkB: any; episodeURL: any; episodePerson: any; episodePromo: any; color: any; pullquote: any; }) => {
      episodeList.push({
        title: episode.title,
        website: episode.website,
        twit: episode.twit,
        inst: episode.inst,
        linkA: episode.linkA,
        linkB: episode.linkA,
        episodeURL: episode.episodeURL,
        episodePerson: episode.episodePromo,
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
      
        {episodeList.map((episode: { title: any; website: any; twit: any; inst: any; linkA: any; linkB: any; episodeURL: any; episodePerson: any; episodePromo: any; color: any; pullquote: any; }) => (
          <div 
            className= {`podcastEpisode ${episode.color}`}
            key={episode.title}
          >
        
            
            {/* Pull quote */}
            <div className="pullquote">{episode.pullquote}</div>
            
            <div className="podcastEpisode-content">
              <a className="podcastEpisode-person"
                href={episode.website} 
                target="_blank"
              >
                {episode.episodePerson} of {episode.title}
              </a>
            </div>

            {/* If Additional Link A,B */}
            {episode.linkA ? 
              <div className="podcastEpisode-content">
                <a 
                    href={`${episode.linkA[1]}`}
                    target="_blank"
                  >
                    {episode.linkA[0] && episode.linkA[0]}
                  </a>
                  &nbsp;<i className="fas fa-anchor"></i>
                </div>
                : '' 
              }
            {episode.linkB ? 
              <div className="podcastEpisode-content">
                <a 
                    href={`${episode.linkB[1]}`}
                    target="_blank"
                  >
                    {episode.linkB[0] && episode.linkB[0]}
                  </a>
                  &nbsp;<i className="fas fa-anchor"></i>
                </div>
                : '' 
              }

            {/* If Twitter */}
            {episode.twit ? 
              <div className="podcastEpisode-content">
                @&nbsp;
                {/* <i class="far fa-link"></i> */}
                {/* <i class="fas fa-anchor"></i> */}
                <a 
                    href={`https://twitter.com/${episode.twit}`}
                    target="_blank"
                  >
                    {episode.twit && episode.twit}
                  </a>
                  &nbsp;<i className="fab fa-twitter"></i>
                </div>
                : '' 
              }

              {/* If Instagram */}
              {episode.inst ? 
                <div className="podcastEpisode-content">
                  @&nbsp;
                  <a 
                    href={`https://www.instagram.com/${episode.inst}`}
                    target="_blank"
                  >
                    {episode.inst && episode.inst}
                  </a>
                  &nbsp;<i className="fab fa-instagram"></i>
                </div>
                : '' 
              }
              
              
              {/* 
              install v2 version unless you're gonna move the whole thing up
              https://www.gatsbyjs.com/plugins/gatsby-plugin-sass/ 
              drop background, look at ui overrides 
              try to hide the player as much as possible
              you probably won't get the full background thing, although it is cool
              Is it possible to pass a click action to the player from outside?
              need a smaller button to reduce height of player
              
              header foooter may work better to put it more inline with content
              <AudioPlayer src={SAMPLE_MP3_URL} header="Now playing: Let it go!" footer="This is a footer" />
              possibly with custom controls
              
              */}
              <AudioPlayer         
          src= {episode.episodeURL}
          onPlay={e => console.log("onPlay")}
          layout="horizontal" 
          customProgressBarSection={
            [
              RHAP_UI.CURRENT_LEFT_TIME,
              RHAP_UI.PROGRESS_BAR,
            ]
          }
          customAdditionalControls={[]}  
          customVolumeControls={[]}
          showJumpControls={false}
          // customIcons={{
          //   play: <Play 
          //     onClick={e => {
          //       e.preventDefault()
          //       trackCustomEvent({
          //         category: "Audio Player",
          //         action: "Play - Featured",
          //         label: episode.title,
          //       })
          //     }}
          //   />,
          //   pause: <Pause 
          //   onClick={e => {
          //     e.preventDefault()
          //     trackCustomEvent({
          //       category: "Audio Player",
          //       action: "Pause - Featured",
          //       label: episode.title,
          //     })
          //   }}
          //   /> 
          //   }}
        />
          </div>
      
      
        ))}
      </div>
    );
  }
}

export default EpisodeListing;
