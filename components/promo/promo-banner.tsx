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
      <div
        className="promo-banner bg-yellow-400 text-center flex flex-col p-4 md:text-left md:flex-row md:items-center md:justify-between md:p-4"
        id="messageModal"
      >
        <img src="/img/cwcWEST.png" alt="Creative Works Logo" className="w-24 h-24 md:w-32 md:h-32" />
        
        <div className="text-lg font-regular">
          <div className="text-black">
            Join us at Creative Works May 1st to 3rd, 2025 - 
            <b> Where Craft Meets Career</b>
          </div>
        </div>

        <div className="mt-3 md:mt-0 md:ml-2">
          <button
            className="inline-block rounded-md text-lg font-semibold py-2 px-4 text-black bg-white hover:bg-yellow-500"
            
          >
            <i className="fas fa-user"></i>Register Now
          </button>
        </div>
      </div>
    </div>
                
        
</Link>

      </React.Fragment>
    );
}




