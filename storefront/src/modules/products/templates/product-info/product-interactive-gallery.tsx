"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Heart, BarChart3, MessageCircleQuestion } from 'lucide-react'
import { toast } from "sonner"
import { HttpTypes } from "@medusajs/types"

interface ProductInteractiveGalleryProps {
    product: HttpTypes.StoreProduct
}

const ProductInteractiveGallery: React.FC<ProductInteractiveGalleryProps> = ({ product }) => {
    const [selectedImage, setSelectedImage] = useState(0)
    const [isScrolled, setIsScrolled] = useState(false)
    const [isInWishlist, setIsInWishlist] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            setIsScrolled(scrollPosition > 100)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleAddToWishlist = () => {
        setIsInWishlist(!isInWishlist)
        if (!isInWishlist) {
            toast.success(`${product.title} added to wishlist!`)
        } else {
            toast.success(`${product.title} removed from wishlist!`)
        }
    }

    return (
        <>
            {/* Product Images */}
            <div className={`space-y-4 transition-all duration-500 ${isScrolled ? 'transform translate-y-4 opacity-95' : ''}`}>
                {/* Main Image */}
                <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
                    {product.images && product.images.length > 0 ? (
                        <Image
                            src={product.images[selectedImage]?.url || ''}
                            alt={product.title || ''}
                            width={600}
                            height={600}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">No image available</span>
                        </div>
                    )}
                </div>

                {/* Thumbnail Images */}
                {product.images && product.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-4">
                        {product.images.slice(0, 4).map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedImage === index
                                        ? 'border-blue-500 shadow-md'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <Image
                                    src={image.url}
                                    alt={`${product.title} ${index + 1}`}
                                    width={150}
                                    height={150}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default ProductInteractiveGallery