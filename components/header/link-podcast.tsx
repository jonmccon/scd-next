import React from "react";
import Link from "next/link";


export default function Link_Podcast() {
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
          
        </div>
      </React.Fragment>
    );
  }

