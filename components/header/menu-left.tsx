import React from "react";
import Link from "next/link";


export default function MenuLeft() {
    return (
      <React.Fragment>

        <div className="headline-menu-left">  
          
          <a 
            data-tf-slider="UR7SpT93" 
            data-tf-position="right" 
            data-tf-opacity="100" 
            data-tf-iframe-props="title=SCD - Intake" 
            data-tf-transitive-search-params data-tf-medium="snippet" 
            className="headline-menu--link highlight">
              Get Listed
           </a>
          <script src="//embed.typeform.com/next/embed.js"></script>

          {/* <Link
          className="headline-menu--link highlight" 
          href="/submit">Get Listed
          </Link> */}

          <Link
            className="headline-menu--link"
            target="_blank"
            href="https://seattlecreative.show/"
          >
            Subscribe to Podcast
          </Link>

          <Link
            className="headline-menu--link"
            target="_blank"
            href="https://discord.gg/SVV4XVCFCj"
          >
            Join Discord
          </Link>
          
          
        </div>
      </React.Fragment>
    );
  }

