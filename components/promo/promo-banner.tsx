import React from "react";
import Link from "next/link";

// this needs to stick on the top right corner
// let that be the default promo part of the site
//  

export default function PromoBanner() {
    return (
      <React.Fragment>
        
        <link href="https://use.fontawesome.com/releases/v5.10.2/css/all.css" rel="stylesheet" />

<div>
      <div
        className="text-center flex flex-col p-4 md:text-left md:flex-row md:items-center md:justify-between md:p-4 bg-purple-100"
        id="messageModal"
      >
        <div className="text-xl font-semibold">
          <div className="text-gray-900">
            Some interesting header.
            <b className="text-purple-500">Some secondary text</b>
          </div>
        </div>

        <div className="mt-3 md:mt-0 md:ml-2">
          <button
            className="inline-block rounded-md text-lg font-semibold py-2 px-4 text-white bg-purple-500"
            
          >
            <i className="fas fa-user"></i> Some Button
          </button>
          <button
            className="inline-block rounded-md text-lg font-semibold py-2 px-4 text-black bg-gray-300"
            
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
        <Link href="/">          
        
        </Link>

      </React.Fragment>
    );
}




