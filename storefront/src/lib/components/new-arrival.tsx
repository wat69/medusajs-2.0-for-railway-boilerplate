'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from "@lib/components/ui/card"

// Import product images
import bild1_101 from '../../../public/img/products/bild1_101.jpg'
import bild1_102 from '../../../public/img/products/bild1_102.jpg'
import bild1_103 from '../../../public/img/products/bild1_103.jpg'
import bild1_104 from '../../../public/img/products/bild2_103.jpg'

function NewArrival() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Product data array
  const newProducts = [
    {
      id: 1,
      title: "LV 302 Supersiktaren",
      location: "Skövde",
      price: "1250000 kr",
      operatingNumber: "282",
      modelYear: "2022",
      image: bild1_101
    },
    {
      id: 2,
      title: "VärstingVolvo",
      location: "Sundsvall",
      price: "82000 kr",
      operatingNumber: "9150",
      modelYear: "2011",
      image: bild1_102
    },
    {
      id: 3,
      title: "En sån där maskin ni vet",
      location: "Tyresö",
      price: "118000 kr",
      operatingNumber: "11200000",
      modelYear: "2019",
      image: bild1_103
    },
    {
      id: 4,
      title: "En Traktor",
      location: "Knivsta",
      price: "18000 kr",
      operatingNumber: "1734",
      modelYear: "2019",
      image: bild1_104
    }
  ]

  return (
    <div ref={sectionRef} className="py-16 px-4 ">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <h3 className="text-amber-500 font-medium mb-2">Nyinkommet!</h3>
          <h2 className="text-4xl font-bold ">De senaste annonserna</h2>
        </div>
        
        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product, index) => (
            <div
              key={product.id}
              className={`transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
              }}
            >
              <Link href={`/product/${product.id}`}>
                <Card className="h-full border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-105">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image 
                      src={product.image} 
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800">{product.title}</h3>
                    <p className="text-gray-600">{product.location}</p>
                    <p className="text-lg font-bold mt-2 text-gray-800">{product.price}</p>
                  </CardContent>
                  
                  <CardFooter className="p-4 pt-0 flex flex-col items-start">
                    <div className="text-sm text-gray-600">
                      <p>Drifttimmer: {product.operatingNumber}</p>
                      <p>Årsmodell: {product.modelYear}</p>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewArrival