import React from "react";
import Link from "next/link";

// this needs to stick on the top right corner
// let that be the default promo part of the site
//  

export default function PromoBanner() {
    return (
      <React.Fragment>
        
        
<Link href="http://creativeworks.co/west">  
    <div>
      <div className="triangle"></div>
      <img src="/img/cwcWEST.png" alt="Creative Works Logo" className="promo-image" />
      <div 
        // className="promo-banner bg-yellow-400 text-center flex flex-col p-4 md:text-left md:flex-row md:items-center md:justify-between md:p-4"
        className="promo-banner"
        id="messageModal"
      >
        
        
        <div className="">
          <div className="text-black">
            Join us at Creative Works <br />  
            May 1st to 3rd, 2025
          </div>
        </div>

        <div className="mt-3 md:mt-0 md:ml-2">
          <button
            className="inline-block rounded-md text-md font-semibold my-2 py-2 px-4 text-black bg-white hover:bg-yellow-500"
            
          >
            <i className="fas fa-user"></i>Where Craft Meets Career
          </button>
        </div>
      </div>
      
    </div>
                
        
</Link>

      </React.Fragment>
    );
}




