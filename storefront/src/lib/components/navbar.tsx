'use client'
import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import logo_small from "../../../public/img/logo_single.png"
import { Button } from "@lib/components/ui/button"
import CartDropdown from "./right-sidebar" // Update this path

import header_love from "../../../public/img/header-love.svg"
import header_cart from "../../../public/img/header-cart.svg"
import header_user from "../../../public/img/header-user.svg"
import { Plus } from "lucide-react"

// Import Medusa cart functions
import { enrichLineItems, retrieveCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

function Navbar() {
  const [wishlistCount, setWishlistCount] = useState(0)
  const [cart, setCart] = useState<HttpTypes.StoreCart | null>(null)

  // Fetch cart function
  const fetchCart = async () => {
    try {
      const cartData = await retrieveCart()
      
      if (!cartData) {
        setCart(null)
        return
      }

      if (cartData?.items?.length) {
        const enrichedItems = await enrichLineItems(cartData.items, cartData.region_id!)
        cartData.items = enrichedItems
      }

      setCart(cartData)
    } catch (error) {
      console.error('Error fetching cart:', error)
      setCart(null)
    }
  }

  useEffect(() => {
    // Initial cart fetch
    fetchCart()

    // Listen for wishlist updates (keep your existing logic)
    const handleWishlistUpdate = (event: CustomEvent) => {
      setWishlistCount(event.detail.count)
    }

    // Listen for cart updates - now refetch the actual cart
    const handleCartUpdate = () => {
      fetchCart()
    }

    window.addEventListener('wishlistUpdated', handleWishlistUpdate as EventListener)
    window.addEventListener('cartUpdated', handleCartUpdate as EventListener)

    return () => {
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate as EventListener)
      window.removeEventListener('cartUpdated', handleCartUpdate as EventListener)
    }
  }, [])

  // Calculate cart count from actual cart data
  const cartCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0

  return (
    <>
      <div className="w-full bg-[#010f1c] sticky top-0 z-50 shadow-md shadow-black/30 px-0 sm:px-4">
        {/* Mobile and Tablet Layout */}
        <div className="flex flex-row justify-end items-center gap-4 sm:hidden py-2 px-2">

          <div className="flex items-left">
            <Link href="/">
              <Image src="/img/logo_single.png" alt="logo" width={60} height={60} className="2xsmall:w-12 2xsmall:h-12 xsmall:w-16 xsmall:h-16" />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Upload Product Button */}
            <Link href="/upload-new-product">
              <Button variant="noBackground" className="p-2">
                <div className="flex flex-row justify-center items-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
              </Button>
            </Link>

            <Link href="/wishlist">
              <Button variant="noBackground" className="p-2">
                <div className="flex flex-row justify-center items-center relative">
                  <Image src={header_love} alt="love" width={20} height={20} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-2 text-xs text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                      {wishlistCount}
                    </span>
                  )}
                </div>
              </Button>
            </Link>

            {/* Replace cart button with CartDropdown */}
            <div className="flex flex-row justify-center items-center relative">
              <CartDropdown cart={cart} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 text-xs text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center animate-pulse pointer-events-none">
                  {cartCount}
                </span>
              )}
            </div>

            {/* profile button */}
            <Link href="/account" className="flex items-center gap-1 p-2 px-4">
              <div className="flex items-center gap-1">
                <Image src={header_user} alt="user" width={20} height={20} />
                <span className="text-sm text-white hidden xsmall:inline-block">Mitt konto</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex flex-row justify-center items-center">
          <div className="w-full flex flex-row justify-end items-center">
            <Link href="/">
              <img src="/img/logo_single.png" alt="logo" width="60" height="60" />
            </Link>
          </div>

          {/* Cart and love */}
          <div className="w-full flex flex-row justify-end items-center px-2">
            {/* Upload Product Button */}
            <Link href="/upload-new-product">
              <Button variant="noBackground" className="flex items-center gap-2 px-3 py-2">
                <Plus className="w-5 h-5 text-white" />
                <span className="text-sm text-white">Skapa annons</span>
              </Button>
            </Link>

            { <Link href="/wishlist">
              <Button variant="noBackground">
                <div className="flex flex-row justify-center items-center relative">
                  <Image src={header_love} alt="love" width={20} height={20} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-2 text-xs text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                      {wishlistCount}
                    </span>
                  )}
                </div>
              </Button>
            </Link> }

            {/* Replace cart button with CartDropdown */}
            <div className="flex flex-row justify-center items-center relative">
              <CartDropdown cart={cart} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 text-xs text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center animate-pulse pointer-events-none">
                  {cartCount}
                </span>
              )}
            </div>

            {/* profile button */}
            <Link href="/account" className="flex items-center gap-1">
              <Image src={header_user} alt="user" width={20} height={20} />
              <span className="text-md text-white">Mitt konto</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar