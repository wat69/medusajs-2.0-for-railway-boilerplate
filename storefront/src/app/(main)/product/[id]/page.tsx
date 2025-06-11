"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from "@lib/components/ui/card"
import { Button } from "@lib/components/ui/button"
import { Badge } from "@lib/components/ui/badge"
import { Star, Heart, BarChart3, MessageCircleQuestion, Minus, Plus, ShoppingCart } from 'lucide-react'
import { toast } from "sonner"

// Import product images (you can replace these with actual product images)
import bild1_101 from '../../../../../../public/img/products/bild1_101.jpg'
import bild1_102 from '../../../../../../public/img/products/bild1_102.jpg'
import bild1_103 from '../../../../../../public/img/products/bild1_103.jpg'
import bild1_104 from '../../../../../../public/img/products/bild2_103.jpg'

interface ProductDetailProps {
  params: {
    id: string
  }
}

function ProductDetail({ params }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isInWishlist, setIsInWishlist] = useState(false)

  // Sample product data
  const product = {
    id: params.id,
    name: "VärstingVolvo",
    category: "Necklaces",
    brand: "Volvo",
    price: 80360.00,
    originalPrice: 82000.00,
    inStock: true,
    rating: 4,
    reviewCount: 6,
    description: "Achieve that sun-kissed glow with the Baked Mineral Bronzer from INIKA. Perfect for contouring, the ...",
    images: [bild1_101, bild1_102, bild1_103, bild1_104],
    features: [
      "High-quality construction",
      "Durable materials",
      "Professional grade",
      "Easy maintenance"
    ]
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change))
  }

  const handleAddToCart = () => {
    // Add to cart logic
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count: quantity } }))
    toast.success(`${product.name} added to cart!`, {
      action: {
        label: "View Cart",
        onClick: () => {
          window.dispatchEvent(new CustomEvent('openCartSidebar'))
        },
      },
    })
  }

  const handleAddToWishlist = () => {
    setIsInWishlist(!isInWishlist)
    if (!isInWishlist) {
      window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: { count: 1 } }))
      toast.success(`${product.name} added to wishlist!`)
    } else {
      toast.success(`${product.name} removed from wishlist!`)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('sv-SE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900 flex items-center">
              <span className="mr-1">🏠</span>
              Home
            </Link>
            <span>•</span>
            <Link href="/category" className="hover:text-gray-900">
              {product.category}
            </Link>
            <span>•</span>
            <Link href="/category/gold" className="hover:text-gray-900">
              Gold
            </Link>
            <span>•</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className={`space-y-4 transition-all duration-500 ${isScrolled ? 'transform translate-y-4 opacity-95' : ''}`}>
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index 
                      ? 'border-blue-500 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className={`space-y-6 transition-all duration-500 ${isScrolled ? 'transform translate-y-2 opacity-95' : ''}`}>
            {/* Category and Title */}
            <div>
              <p className="text-gray-600 text-lg mb-2">{product.category}</p>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Stock and Rating */}
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  in-stock
                </Badge>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < product.rating 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">({product.reviewCount} Reviews)</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
                <button className="text-blue-600 hover:underline ml-1">
                  See more
                </button>
              </p>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-gray-500 line-through text-lg">
                  {formatPrice(product.originalPrice)} kr
                </span>
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.price)} kr
                </span>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    className="h-12 w-12"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 text-lg font-medium min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                    className="h-12 w-12"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-gray-200 text-gray-800 hover:bg-gray-300 text-lg font-medium"
                >
                  Add To Cart
                </Button>
              </div>
            </div>

            {/* Buy Now Button */}
            <Button
              className="w-full h-14 bg-gray-900 text-white hover:bg-gray-800 text-lg font-medium"
            >
              Buy Now
            </Button>

            {/* Action Buttons */}
            <div className="flex items-center gap-6 pt-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <BarChart3 className="w-5 h-5" />
                Compare
              </button>
              <button 
                onClick={handleAddToWishlist}
                className={`flex items-center gap-2 hover:text-red-500 ${
                  isInWishlist ? 'text-red-500' : 'text-gray-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                Add Wishlist
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <MessageCircleQuestion className="w-5 h-5" />
                Ask a question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail 