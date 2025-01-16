import React from "react";
import Link from "next/link";
import Subscribe from "./subscribe";


export default function Socials() {
    return (
      <React.Fragment>

        <div className="headline-menu-left">   

          <Subscribe />         

          <Link
            className="headline-menu--link"
            target="_blank"
            href="https://seattlecreative.show/"
          >
            All Episodes
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

