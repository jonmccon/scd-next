import React, { Component } from "react";
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Play from '../../public/assets-svg/button-play-large.inline.svg';   
import Pause from '../../public/assets-svg/button-pause-large.inline.svg';




class EpisodeBlockPlayer extends Component {
  render() {
    const { podcastTitle } = this.props;
    const { podcastSeason } = this.props;
    const { podcastURL } = this.props;
    
    return (
      <div className="podcast-promo">

          
        <AudioPlayer         
          src={podcastURL}
          onPlay={e => console.log("onPlay")}
          layout="horizontal-reverse" 
          customProgressBarSection={
            [
              RHAP_UI.CURRENT_TIME,
              RHAP_UI.PROGRESS_BAR,
              RHAP_UI.CURRENT_LEFT_TIME,
            ]
          }
          customAdditionalControls={[]}  
          customVolumeControls={[]}
          showJumpControls={false}
          customIcons={{
            play: <Play 
              // onClick={e => {
              //   e.preventDefault()
              //   trackCustomEvent({
              //     category: "Audio Player",
              //     action: "Play - Featured",
              //     label: {podcastTitle},
              //   })
              // }}
            />,
            pause: <Pause 
            // onClick={e => {
            //   e.preventDefault()
            //   trackCustomEvent({
            //     category: "Audio Player",
            //     action: "Pause - Featured",
            //     label: {podcastTitle},
            //   })
            // }}
            /> 
            }}
        />
      </div>
      
    );
  }
}

export default EpisodeBlockPlayer;


 
