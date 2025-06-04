"use client"
import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@lib/components/ui/card"
import { Button } from "@lib/components/ui/button"
import { Heart, ShoppingCart, X } from "lucide-react"
import { toast } from "sonner"

import cartIcon from "../../../public/img/cart-icon.svg"

// Import product images
import bild1_101 from "../../../public/img/products/bild1_101.jpg"
import bild1_102 from "../../../public/img/products/bild1_102.jpg"
import bild1_103 from "../../../public/img/products/bild1_103.jpg"
import bild1_104 from "../../../public/img/products/bild2_103.jpg"

// Create a simple context for cart and wishlist
interface CartWishlistContextType {
  cartItems: number[]
  wishlistItems: number[]
  addToCart: (id: number) => void
  removeFromCart: (id: number) => void
  addToWishlist: (id: number) => void
  removeFromWishlist: (id: number) => void
  cartCount: number
  wishlistCount: number
}

const CartWishlistContext = React.createContext<CartWishlistContextType | null>(
  null
)

// Custom hook to use cart and wishlist
const useCartWishlist = () => {
  const context = React.useContext(CartWishlistContext)
  if (!context) {
    throw new Error("useCartWishlist must be used within CartWishlistProvider")
  }
  return context
}

function PopularProducts() {
  const [isVisible, setIsVisible] = useState(false)
  const [cartItems, setCartItems] = useState<number[]>([])
  const [wishlistItems, setWishlistItems] = useState<number[]>([])
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
        rootMargin: "0px 0px -100px 0px",
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

  // Cart and wishlist functions
  const addToCart = (id: number) => {
    const product = newProducts.find((p) => p.id === id)
    setCartItems((prev) => [...prev, id])
    // Update navbar counter
    window.dispatchEvent(
      new CustomEvent("cartUpdated", {
        detail: { count: cartItems.length + 1 },
      })
    )
    // Show success toast (uses predefined green styling)
    toast.success(`${product?.title} added to cart!`, {
      action: {
        label: "View Cart",
        onClick: () => {
          // Open cart sidebar instead of navigating to cart page
          window.dispatchEvent(new CustomEvent("openCartSidebar"))
        },
      },
    })
  }

  const removeFromCart = (id: number) => {
    const product = newProducts.find((p) => p.id === id)
    setCartItems((prev) => prev.filter((item) => item !== id))
    // Update navbar counter
    window.dispatchEvent(
      new CustomEvent("cartUpdated", {
        detail: { count: cartItems.length - 1 },
      })
    )
    // Show error toast (uses predefined red styling)
    toast.error(`${product?.title} removed from cart`)
  }

  const addToWishlist = (id: number) => {
    const product = newProducts.find((p) => p.id === id)
    setWishlistItems((prev) => [...prev, id])
    // Update navbar counter
    window.dispatchEvent(
      new CustomEvent("wishlistUpdated", {
        detail: { count: wishlistItems.length + 1 },
      })
    )
    // Notify wishlist page
    window.dispatchEvent(
      new CustomEvent("wishlistItemUpdate", {
        detail: { action: "add", productId: id },
      })
    )
    // Show success toast (uses predefined green styling)
    toast.success(`${product?.title} added to wishlist!`, {
      action: {
        label: "View Wishlist",
        onClick: () => (window.location.href = "/wishlist"),
      },
    })
  }

  const removeFromWishlist = (id: number) => {
    const product = newProducts.find((p) => p.id === id)
    setWishlistItems((prev) => prev.filter((item) => item !== id))
    // Update navbar counter
    window.dispatchEvent(
      new CustomEvent("wishlistUpdated", {
        detail: { count: wishlistItems.length - 1 },
      })
    )
    // Notify wishlist page
    window.dispatchEvent(
      new CustomEvent("wishlistItemUpdate", {
        detail: { action: "remove", productId: id },
      })
    )
    // Show error toast (uses predefined red styling)
    toast.error(`${product?.title} removed from wishlist`)
  }

  const isInCart = (id: number) => cartItems.includes(id)
  const isInWishlist = (id: number) => wishlistItems.includes(id)

  // Product data array
  const newProducts = [
    {
      id: 1,
      title: "LV 302 Supersiktaren",
      location: "Skövde",
      price: "1 250 000,00 kr",
      category: "Sikare",
      image: bild1_101,
    },
    {
      id: 2,
      title: "VärstingVolvo",
      location: "Necklaces",
      price: "82 000,00 kr",
      category: "Necklaces",
      image: bild1_102,
    },
    {
      id: 3,
      title: "En sån där maskin ni vet",
      location: "Earnings",
      price: "118 000,00 kr",
      category: "Earnings",
      image: bild1_103,
    },
    {
      id: 4,
      title: "En Traktor",
      location: "Earnings",
      price: "118 000,00 kr",
      category: "Earnings",
      image: bild1_104,
    },
  ]

  return (
    <div ref={sectionRef} className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-amber-500 font-medium mb-2">Populära just nu</h3>
          <h2 className="text-4xl font-bold text-gray-800">
            Mest besökta annonserna veckan som gått
          </h2>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product, index) => (
            <div
              key={product.id}
              className={`group transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
              }}
            >
              <Link href={`/product/${product.id}`}>
                <Card className="h-full border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden bg-white cursor-pointer">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay icons - visible on hover */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md transform hover:scale-110 transition-transform duration-200"
                        onClick={(e) => {
                          e.preventDefault()
                          if (isInCart(product.id)) {
                            removeFromCart(product.id)
                          } else {
                            addToCart(product.id)
                          }
                        }}
                      >
                        {isInCart(product.id) ? (
                          <X className="w-4 h-4 text-red-600" />
                        ) : (
                          <ShoppingCart className="w-4 h-4 text-gray-700" />
                        )}
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        className={`w-10 h-10 rounded-full shadow-md transform hover:scale-110 transition-all duration-200 ${
                          isInWishlist(product.id)
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-white/90 hover:bg-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault()
                          if (isInWishlist(product.id)) {
                            removeFromWishlist(product.id)
                          } else {
                            addToWishlist(product.id)
                          }
                        }}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isInWishlist(product.id)
                              ? "text-white fill-white"
                              : "text-gray-700"
                          }`}
                        />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {product.category}
                    </p>

                    {/* Price and Add to Cart button container */}
                    <div className="relative h-12 overflow-hidden">
                      {/* Price - visible by default, slides up on hover */}
                      <div className="absolute inset-0 flex items-center transition-transform duration-300 group-hover:-translate-y-full">
                        <p className="text-lg font-bold text-gray-800">
                          {product.price}
                        </p>
                      </div>

                      {/* Add to Cart button - slides up from bottom on hover */}
                      <div className="absolute inset-0 flex items-center translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                        <Button
                          className={`w-full transition-all duration-200 transform hover:scale-105 shadow-none ${
                            isInCart(product.id)
                              ? "bg-red-500 text-white hover:bg-red-600"
                              : "bg-transparent text-black hover:bg-transparent"
                          }`}
                          onClick={(e) => {
                            e.preventDefault()
                            if (isInCart(product.id)) {
                              removeFromCart(product.id)
                            } else {
                              addToCart(product.id)
                            }
                          }}
                        >
                          {isInCart(product.id) ? (
                            <>
                              <X className="w-4 h-4 mr-2" />
                              Remove from Cart
                            </>
                          ) : (
                            <>
                              <Image
                                src={cartIcon}
                                alt="Cart Icon"
                                width={16}
                                height={16}
                              />
                              Add to Cart
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PopularProducts
