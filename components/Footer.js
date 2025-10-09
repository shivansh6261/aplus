"use client";
import React from 'react'

const Footer = () => {
  return (
    <>
    {/* // <div className='w-full h-50 bg-blue-950 justify-center items-center'>
    //     <p className="font-bold">All right </p>
      
    // </div> */}

    <footer className="bg-blue-950 border-t border-gray-200 text-white text-sm ">
  <div className="w-350 mx-auto px-4 py-6 flex flex-col md:flex-row justify-center items-center">
    
  
    <p className="text-center md:text-left mb-2 md:mb-0">
      © {new Date().getFullYear()} Department of Computer Science & Engineering. All rights reserved.
    </p>

   
   
  </div>
</footer>

</>
  )
}

export default Footer
