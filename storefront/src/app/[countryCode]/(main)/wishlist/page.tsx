'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@lib/components/ui/button"
import { Card, CardContent } from "@lib/components/ui/card"
import { Heart, ShoppingCart, X } from 'lucide-react'
import { toast } from "sonner"

// Import product images
import bild1_101 from '../../../../../public/img/products/bild1_101.jpg'
import bild1_102 from '../../../../../public/img/products/bild1_102.jpg'
import bild1_103 from '../../../../../public/img/products/bild1_103.jpg'
import bild1_104 from '../../../../../public/img/products/bild2_103.jpg'

interface WishlistItem {
  id: number
  title: string
  location: string
  price: string
  category: string
  image: any
}

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [cartItems, setCartItems] = useState<number[]>([])

  // Sample products data (in real app, this would come from a global state or API)
  const allProducts = [
    {
      id: 1,
      title: "LV 302 Supersiktaren",
      location: "Skövde",
      price: "1 250 000,00 kr",
      category: "Sikare",
      image: bild1_101
    },
    {
      id: 2,
      title: "VärstingVolvo",
      location: "Necklaces",
      price: "82 000,00 kr",
      category: "Necklaces",
      image: bild1_102
    },
    {
      id: 3,
      title: "En sån där maskin ni vet",
      location: "Earnings",
      price: "118 000,00 kr",
      category: "Earnings",
      image: bild1_103
    },
    {
      id: 4,
      title: "En Traktor",
      location: "Earnings",
      price: "118 000,00 kr",
      category: "Earnings",
      image: bild1_104
    }
  ]

  useEffect(() => {
    // Listen for wishlist updates from other components
    const handleWishlistUpdate = (event: CustomEvent) => {
      const { action, productId } = event.detail
      
      if (action === 'add') {
        const product = allProducts.find(p => p.id === productId)
        if (product && !wishlistItems.find(item => item.id === productId)) {
          setWishlistItems(prev => [...prev, product])
        }
      } else if (action === 'remove') {
        setWishlistItems(prev => prev.filter(item => item.id !== productId))
      }
    }

    window.addEventListener('wishlistItemUpdate', handleWishlistUpdate as EventListener)

    return () => {
      window.removeEventListener('wishlistItemUpdate', handleWishlistUpdate as EventListener)
    }
  }, [])

  const removeFromWishlist = (id: number) => {
    const product = wishlistItems.find(p => p.id === id)
    setWishlistItems(prev => prev.filter(item => item.id !== id))
    
    // Update navbar counter
    window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
      detail: { count: wishlistItems.length - 1 } 
    }))
    
    // Notify other components
    window.dispatchEvent(new CustomEvent('wishlistItemUpdate', { 
      detail: { action: 'remove', productId: id } 
    }))
    
    // Show toast
    toast.error(`${product?.title} removed from wishlist`)
  }

  const addToCart = (id: number) => {
    const product = wishlistItems.find(p => p.id === id)
    setCartItems(prev => [...prev, id])
    
    // Update navbar counter
    window.dispatchEvent(new CustomEvent('cartUpdated', { 
      detail: { count: cartItems.length + 1 } 
    }))
    
    // Show toast
    toast.success(`${product?.title} added to cart!`, {
      action: {
        label: "View Cart",
        onClick: () => console.log("View cart clicked"),
      },
    })
  }

  const isInCart = (id: number) => cartItems.includes(id)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-800">Home</Link>
            <span className="mx-2">•</span>
            <span className="text-gray-800">Wishlist</span>
          </nav>
        </div>

        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Wishlist</h1>
        </div>

        {/* Wishlist Content */}
        {wishlistItems.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="mb-8">
              <Heart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">No Wishlist Items Found</h2>
              <p className="text-gray-600 mb-8">You haven&apos;t added any items to your wishlist yet.</p>
            </div>
            <Link href="/">
              <Button className="bg-[#010f1c] text-white hover:bg-gray-800 px-8 py-3 text-lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          /* Wishlist Items */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image 
                    src={item.image} 
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Remove from wishlist button */}
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                  <p className="text-lg font-bold text-gray-800 mb-4">{item.price}</p>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      className={`flex-1 transition-all duration-200 ${
                        isInCart(item.id)
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-[#010f1c] text-white hover:bg-gray-800'
                      }`}
                      onClick={() => addToCart(item.id)}
                      disabled={isInCart(item.id)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {isInCart(item.id) ? 'In Cart' : 'Add to Cart'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-10 h-10 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Continue Shopping Button (when items exist) */}
        {wishlistItems.length > 0 && (
          <div className="text-center mt-12">
            <Link href="/">
              <Button variant="outline" className="px-8 py-3 text-lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist