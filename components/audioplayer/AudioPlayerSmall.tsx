import React, { Component } from "react";
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Play from '../../public/assets-svg/button-play-small.inline.svg';   
import Pause from '../../public/assets-svg/button-pause-small.inline.svg';   


class AudioPlayerSmall extends React.Component<any, any> {
  render() {
    const { episodeURL } = this.props;
    
    return (
      <React.Fragment>
      <div className="audioPlayer-small">
        <AudioPlayer         
          src={episodeURL}
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
          // customIcons={{
          //   play: <Play 
          //     onClick={e => {
          //       e.preventDefault()
          //       trackCustomEvent({
          //         category: "Audio Player",
          //         action: "Play - Inline",
          //         label: podcastTitle,
          //       })
          //     }}
          //   />,
          //   pause: <Pause 
          //   onClick={e => {
          //     e.preventDefault()
          //     trackCustomEvent({
          //       category: "Audio Player",
          //       action: "Pause - Inline",
          //       label: podcastTitle,
          //     })
          //   }}
          //   /> 
          //   }}
        />
      </div>
      </React.Fragment>
      
    );
  }
}

export default AudioPlayerSmall;


 
