'use client'
import React, { useState, useEffect } from "react";
import Script from "next/script";
import './globals.css';
import BouttonColor from "./BouttonColor";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if the screen width is less than 640px (or any other breakpoint of your choice)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Initial check on c omponent mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="">
      <Script
        src="https://static.sketchfab.com/api/sketchfab-viewer-1.10.1.js"
        strategy="beforeInteractive"
      ></Script>

      <div className="max-w-[1000px] mx-auto grid grid-cols-1  configurator-container">
        <div className="w-full" href="#0">
          <iframe
            title=""
            className='custom-iframe '
          ></iframe>
        </div>

        <div className="md:h-full font-bold" >
          <BouttonColor />
        </div>
      </div>
    </div>
  );
}

