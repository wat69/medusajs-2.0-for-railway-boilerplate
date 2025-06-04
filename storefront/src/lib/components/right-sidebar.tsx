"use client"

import { Popover, Transition } from "@headlessui/react"
import { Button } from "@medusajs/ui"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"
import Image from "next/image"

import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"

// Import your cart icon
import header_cart from "../../../public/img/header-cart.svg"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()
    const timer = setTimeout(close, 5000)
    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }
    open()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    itemRef.current = totalItems
  }, [totalItems, pathname])

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault()
    openAndCancel()
  }

  return (
    <>
      <div
        className="h-full z-50"
        onMouseEnter={openAndCancel}
        onMouseLeave={close}
      >
        <Popover className="relative h-full">
          <Popover.Button className="h-full p-2" onClick={handleCartClick}>
            {/* Use your cart icon instead of text */}
            <div className="flex flex-row justify-center items-center">
              <Image src={header_cart} alt="cart" width={20} height={20} />
            </div>
          </Popover.Button>
          <Transition
            show={cartDropdownOpen}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              static
              className="hidden small:block absolute top-[calc(100%+1px)] right-0 bg-white border-x border-b border-gray-200 w-[420px] text-ui-fg-base z-50"
              data-testid="nav-cart-dropdown"
            >
              <div className="p-4 flex items-center justify-center border-b border-gray-100">
                <h3 className="text-large-semi">Kundvagn</h3>
              </div>
              {cartState && cartState.items?.length ? (
                <>
                  <div className="overflow-y-scroll max-h-[450px] px-4 py-4 no-scrollbar">
                    <div className="grid grid-cols-1 gap-y-6">
                      {cartState.items
                        .sort((a, b) => {
                          return (a.created_at ?? "") > (b.created_at ?? "")
                            ? -1
                            : 1
                        })
                        .map((item) => (
                          <div
                            className="grid grid-cols-[100px_1fr] gap-x-4 pb-4 border-b border-gray-100 last:border-b-0"
                            key={item.id}
                            data-testid="cart-item"
                          >
                            <LocalizedClientLink
                              href={`/products/${item.variant?.product?.handle}`}
                              className="w-[100px] h-[100px] rounded-lg overflow-hidden bg-gray-50"
                            >
                              <Thumbnail
                                thumbnail={item.variant?.product?.thumbnail}
                                images={item.variant?.product?.images}
                                size="square"
                              />
                            </LocalizedClientLink>
                            <div className="flex flex-col justify-between flex-1 min-w-0">
                              <div className="flex flex-col flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex flex-col mr-4 min-w-0 flex-1">
                                    <h3 className="text-sm font-medium text-gray-900 truncate">
                                      <LocalizedClientLink
                                        href={`/products/${item.variant?.product?.handle}`}
                                        data-testid="product-link"
                                      >
                                        {item.title}
                                      </LocalizedClientLink>
                                    </h3>
                                    <LineItemOptions
                                      variant={item.variant}
                                      data-testid="cart-item-variant"
                                      data-value={item.variant}
                                    />
                                    <span
                                      className="text-sm text-gray-500 mt-1"
                                      data-testid="cart-item-quantity"
                                      data-value={item.quantity}
                                    >
                                      Antal: {item.quantity}
                                    </span>
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <LineItemPrice item={item} style="tight" />
                                  </div>
                                </div>
                              </div>
                              <DeleteButton
                                id={item.id}
                                className="mt-2 text-sm text-red-500 hover:text-red-700 self-start"
                                data-testid="cart-item-remove-button"
                              >
                                Ta bort
                              </DeleteButton>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="border-t bg-white px-4 py-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-gray-900">
                        Delsumma{" "}
                        <span className="font-normal text-gray-500">(exkl. moms)</span>
                      </span>
                      <span
                        className="text-lg font-semibold text-gray-900"
                        data-testid="cart-subtotal"
                        data-value={subtotal}
                      >
                        {convertToLocale({
                          amount: subtotal,
                          currency_code: cartState.currency_code,
                        })}
                      </span>
                    </div>
                    <LocalizedClientLink href="/cart">
                      <Button
                        className="w-full bg-[#010f1c] hover:bg-[#012139] text-white"
                        size="large"
                        data-testid="go-to-cart-button"
                        onClick={close}
                      >
                        Gå till kundvagn
                      </Button>
                    </LocalizedClientLink>
                  </div>
                </>
              ) : (
                <div className="py-16 px-6 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <Image src={header_cart} alt="empty cart" width={24} height={24} className="opacity-50" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Din kundvagn är tom
                  </h3>
                  <p className="text-gray-500 text-center mb-6 text-sm">
                    Det verkar som att du inte har lagt till något i din kundvagn än
                  </p>
                  <LocalizedClientLink href="/store">
                    <Button 
                      onClick={close}
                      className="bg-[#010f1c] hover:bg-[#012139] text-white"
                    >
                      Utforska produkter
                    </Button>
                  </LocalizedClientLink>
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>

      {/* Mobile Overlay */}
      {cartDropdownOpen && (
        <div className="block small:hidden fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={close}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="p-4 flex items-center justify-between border-b border-gray-100">
                <h3 className="text-lg font-semibold">Kundvagn</h3>
                <button
                  onClick={close}
                  className="rounded-full p-2 hover:bg-gray-100"
                  data-testid="close-cart-mobile"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {cartState && cartState.items?.length ? (
                <>
                  <div className="flex-1 overflow-y-auto px-4 py-4">
                    <div className="grid grid-cols-1 gap-y-6">
                      {cartState.items
                        .sort((a, b) => {
                          return (a.created_at ?? "") > (b.created_at ?? "")
                            ? -1
                            : 1
                        })
                        .map((item) => (
                          <div
                            className="grid grid-cols-[80px_1fr] gap-x-3 pb-4 border-b border-gray-100 last:border-b-0"
                            key={item.id}
                            data-testid="cart-item-mobile"
                          >
                            <LocalizedClientLink
                              href={`/products/${item.variant?.product?.handle}`}
                              className="w-[80px] h-[80px] rounded-lg overflow-hidden bg-gray-50"
                            >
                              <Thumbnail
                                thumbnail={item.variant?.product?.thumbnail}
                                images={item.variant?.product?.images}
                                size="square"
                              />
                            </LocalizedClientLink>
                            <div className="flex flex-col justify-between flex-1 min-w-0">
                              <div className="flex flex-col flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex flex-col mr-2 min-w-0 flex-1">
                                    <h3 className="text-sm font-medium text-gray-900 truncate">
                                      <LocalizedClientLink
                                        href={`/products/${item.variant?.product?.handle}`}
                                        data-testid="product-link-mobile"
                                      >
                                        {item.title}
                                      </LocalizedClientLink>
                                    </h3>
                                    <LineItemOptions
                                      variant={item.variant}
                                      data-testid="cart-item-variant-mobile"
                                      data-value={item.variant}
                                    />
                                    <span
                                      className="text-xs text-gray-500 mt-1"
                                      data-testid="cart-item-quantity-mobile"
                                      data-value={item.quantity}
                                    >
                                      Antal: {item.quantity}
                                    </span>
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <LineItemPrice item={item} style="tight" />
                                  </div>
                                </div>
                              </div>
                              <DeleteButton
                                id={item.id}
                                className="mt-2 text-xs text-red-500 hover:text-red-700 self-start"
                                data-testid="cart-item-remove-button-mobile"
                              >
                                Ta bort
                              </DeleteButton>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="border-t bg-white px-4 py-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900">
                        Delsumma{" "}
                        <span className="font-normal text-gray-500">(exkl. moms)</span>
                      </span>
                      <span
                        className="text-base font-semibold text-gray-900"
                        data-testid="cart-subtotal-mobile"
                        data-value={subtotal}
                      >
                        {convertToLocale({
                          amount: subtotal,
                          currency_code: cartState.currency_code,
                        })}
                      </span>
                    </div>
                    <LocalizedClientLink href="/cart">
                      <Button
                        className="w-full bg-[#010f1c] hover:bg-[#012139] text-white"
                        size="large"
                        data-testid="go-to-cart-button-mobile"
                        onClick={close}
                      >
                        Gå till kundvagn
                      </Button>
                    </LocalizedClientLink>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
                  <div className="w-16 h-16 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <Image src={header_cart} alt="empty cart" width={24} height={24} className="opacity-50" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Din kundvagn är tom
                  </h3>
                  <p className="text-gray-500 text-center mb-6 text-sm">
                    Det verkar som att du inte har lagt till något i din kundvagn än
                  </p>
                  <LocalizedClientLink href="/store" className="w-full">
                    <Button 
                      onClick={close}
                      className="w-full bg-[#010f1c] hover:bg-[#012139] text-white"
                    >
                      Utforska produkter
                    </Button>
                  </LocalizedClientLink>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CartDropdown