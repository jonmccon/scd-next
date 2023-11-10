import React from "react";
import Link from "next/link";


export default function MenuLeft() {
    return (
      <React.Fragment>

        <div className="headline-menu-left">            

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

