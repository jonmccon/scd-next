import React from "react";
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';

export default async function EpisodeListing({ tags: any; title: any; website: any; twit: any; inst: any; linkA: any; linkB: any; episodeURL: any; episodePerson: any; episodePromo: any; color: any; pullquote: any; }[] ) {
  
  const episodeList = await prisma.directory.findMany({
    where: { published: true, }, distinct: ['episodeURL'],})
  
}

// class EpisodeListing extends React.Component {
  getEpisodeList() {
    const episodeList: { tags: any; title: any; website: any; twit: any; inst: any; linkA: any; linkB: any; episodeURL: any; episodePerson: any; episodePromo: any; color: any; pullquote: any; }[] = [];
    this.props.postEdgesDirectory.forEach((postEdge) => {
      episodeList.push({
        tags: postEdge.node.frontmatter.tags,
        title: postEdge.node.frontmatter.title,
        website: postEdge.node.frontmatter.website,
        twit: postEdge.node.frontmatter.twit,
        inst: postEdge.node.frontmatter.inst,
        linkA: postEdge.node.frontmatter.linkA,
        linkB: postEdge.node.frontmatter.linkB,
        episodeURL: postEdge.node.frontmatter.episodeURL,
        episodePerson: postEdge.node.frontmatter.episodePerson,
        episodePromo: postEdge.node.frontmatter.episodePromo,
        color: postEdge.node.frontmatter.color,
        pullquote:postEdge.node.frontmatter.pullquote,
      });
    });
    return episodeList;
  }

  render() {
    const episodeList = this.getEpisodeList();
    const postTitle = episodeList.title;

    

    return (
      <div className="podcast">
      
        {episodeList.map((post) => (

          <div className= {`podcastEpisode ${post.color}`}>
            

        

        
            
            {/* Pull quote */}
            <div className="pullquote">{post.pullquote}</div>
            
            <div className="podcastEpisode-content">
              <a className="podcastEpisode-person"
                href={post.website} 
                target="_blank"
                onClick={e => {
                  trackCustomEvent({
                    category: "Episode",
                    action: "Clicked",
                    label: post.title,
                  })
                }}
              >
                {post.episodePerson} of {post.title}
              </a>
            </div>

            {/* If Additional Link A,B */}
            {post.linkA ? 
              <div className="podcastEpisode-content">
                <a 
                    href={`${post.linkA[1]}`}
                    target="_blank"
                    onClick={e => {
                      trackCustomEvent({
                        category: "Episode",
                        action: "Clicked",
                        label: post.twit,
                      })
                    }}
                  >
                    {post.linkA[0] && post.linkA[0]}
                  </a>
                  &nbsp;<i class="fas fa-anchor"></i>
                </div>
                : '' 
              }
            {post.linkB ? 
              <div className="podcastEpisode-content">
                <a 
                    href={`${post.linkB[1]}`}
                    target="_blank"
                    onClick={e => {
                      trackCustomEvent({
                        category: "Episode",
                        action: "Clicked",
                        label: post.twit,
                      })
                    }}
                  >
                    {post.linkB[0] && post.linkB[0]}
                  </a>
                  &nbsp;<i class="fas fa-anchor"></i>
                </div>
                : '' 
              }

            {/* If Twitter */}
            {post.twit ? 
              <div className="podcastEpisode-content">
                @&nbsp;
                {/* <i class="far fa-link"></i> */}
                {/* <i class="fas fa-anchor"></i> */}
                <a 
                    href={`https://twitter.com/${post.twit}`}
                    target="_blank"
                    onClick={e => {
                      trackCustomEvent({
                        category: "Episode",
                        action: "Clicked",
                        label: post.twit,
                      })
                    }}
                  >
                    {post.twit && post.twit}
                  </a>
                  &nbsp;<i class="fab fa-twitter"></i>
                </div>
                : '' 
              }

              {/* If Instagram */}
              {post.inst ? 
                <div className="podcastEpisode-content">
                  @&nbsp;
                  <a 
                    href={`https://www.instagram.com/${post.inst}`}
                    target="_blank"
                    onClick={e => {
                      trackCustomEvent({
                        category: "Episode",
                        action: "Clicked",
                        label: post.inst,
                      })
                    }}
                  >
                    {post.inst && post.inst}
                  </a>
                  &nbsp;<i class="fab fa-instagram"></i>
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
          src= {post.episodeURL}
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
          customIcons={{
            play: <Play 
              onClick={e => {
                e.preventDefault()
                trackCustomEvent({
                  category: "Audio Player",
                  action: "Play - Featured",
                  label: post.title,
                })
              }}
            />,
            pause: <Pause 
            onClick={e => {
              e.preventDefault()
              trackCustomEvent({
                category: "Audio Player",
                action: "Pause - Featured",
                label: post.title,
              })
            }}
            /> 
            }}
        />
          </div>
      
      
      
                
        ))}
      </div>
    );
  }
}

// export default EpisodeListing;
