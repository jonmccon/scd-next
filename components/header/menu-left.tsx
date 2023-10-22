import React from "react";
import Link from "next/link";


export default function MenuLeft() {
    return (
      <React.Fragment>

        <div className="headline-menu-left">  
          
          {/* <Link
          className="headline-menu--link highlight" 
          to="/submit">Get Listed
          </Link> */}

          <a
            className="headline-menu--link"
            target="_blank"
            href="https://seattlecreative.show/"
          >
            Listen
          </a>

          <Link
          className="headline-menu--link" 
          href="/about">About
          </Link>

          <a
            className="headline-menu--link"
            target="_blank"
            href="https://discord.gg/SVV4XVCFCj"
          >
            Chat
          </a>
          
          
        </div>
      </React.Fragment>
    );
  }

