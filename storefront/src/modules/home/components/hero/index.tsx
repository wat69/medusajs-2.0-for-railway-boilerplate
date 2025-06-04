import React from "react"
import { Button } from "@lib/components/ui/button"
import Link from "next/link"

const Hero = () => {
  return (
    <div className="bg-[#111827] text-white py-20 px-4">
      <div className="container mx-auto max-w-6xl text-center">
        {/* Main Heading */}
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Krossförmedlingen
        </h1>
        
        {/* Subheading with highlighted text */}
        <h2 className="text-4xl md:text-6xl font-bold mb-8">
          Köp, sälj eller hyr — <span className="text-[#1fb6ff]">Vi hjälper er</span>
        </h2>
        
        {/* Description text */}
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Sveriges största marknadsplats för kross, sortering och entreprenadmaskiner.
        </p>
        
        {/* CTA Button */}
        <Link href="/store">
          <Button 
            className="bg-[#F97316] hover:bg-[#1fb6ff]/90 hover:text-white text-black font-bold text-lg px-10 py-3 h-auto rounded-full mb-16"
          >
            Se alla annonser
          </Button>
        </Link>
        
        {/* Feature list */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
          <div className="flex items-center gap-2">
           
            <span className="text-[#1fb6ff] text-2xl">✔</span>
            <span className="text-lg md:text-xl">Utrustning & Krossning</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[#1fb6ff] text-2xl">✔</span>
            <span className="text-lg md:text-xl">Reservdelar</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[#1fb6ff] text-2xl">✔</span>
            <span className="text-lg md:text-xl">Andra förmedlingstjänster</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
