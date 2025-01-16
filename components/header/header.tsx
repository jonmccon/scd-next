import React, { Suspense } from "react";
import Link from "next/link";
import Logo from "./logo";
import Link_Podcast from "./socials";
import Link_Discord from "./link-discord";
import Subscribe from "./subscribe";

export default function Header() {
    return (
      <React.Fragment>
        <div className="headline-wrapper">



        <Logo />
        <Link_Podcast />
        <Link_Discord />

        <Subscribe />


        {/* 
 
        <div className="headline">
            <h1>Cataloging the creative studios of the Pacific Northwest</h1>
        </div>
        */}

        </div> 
     
      </React.Fragment>
    );
}