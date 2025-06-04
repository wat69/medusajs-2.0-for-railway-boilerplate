import React, { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

// UI Components (assuming you have these or similar)
import { Badge } from "@lib/components/ui/badge"
import { Heart, BarChart3, MessageCircleQuestion } from 'lucide-react'

// MedusaJS Components
import ProductActions from "@modules/products/components/product-actions"
import AskQuestionForm from "@modules/products/components/AskQuestionForm"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import ProductActionsWrapper from "./product-actions-wrapper"

// Interactive Client Component
import ProductInteractiveGallery from "./product-info/product-interactive-gallery"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(region.currency_code === 'USD' ? 'en-US' : 'sv-SE', {
      style: 'currency',
      currency: region.currency_code || 'USD',
    }).format(price / 100) // MedusaJS prices are in cents
  }

  // Get the cheapest variant price
  const cheapestPrice = product.variants?.reduce((min, variant) => {
    //@ts-ignore
    const price = variant.calculated_price?.calculated_amount || variant.prices?.[0]?.amount || 0
    return price < min ? price : min
  }, Infinity) || 0

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
            {product.collection && (
              <>
                <Link href={`/collections/${product.collection.handle}`} className="hover:text-gray-900">
                  {product.collection.title}
                </Link>
                <span>•</span>
              </>
            )}
            <span className="text-gray-900">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images - Interactive Gallery */}
          <ProductInteractiveGallery product={product} />

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category and Title */}
            <div>
              {product.collection && (
                <p className="text-gray-600 text-lg mb-2">{product.collection.title}</p>
              )}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
              
              {/* Stock Status */}
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {product.status === 'published' ? 'in-stock' : 'out-of-stock'}
                </Badge>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-700 leading-relaxed">
                {product.description || 'No description available'}
                {product.description && product.description.length > 150 && (
                  <span className="text-blue-600 hover:underline ml-1 cursor-pointer">
                    See more
                  </span>
                )}
              </p>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(cheapestPrice)}
                </span>
              </div>
            </div>

            {/* Product Actions - Using MedusaJS component */}
            <div className="space-y-4">
              <Suspense
                fallback={
                  <ProductActions
                    disabled={true}
                    product={product}
                    region={region}
                  />
                }
              >
                <ProductActionsWrapper id={product.id} region={region} />
              </Suspense>
            </div>

            {/* Product Onboarding CTA */}
            <div className="pt-6">
              <ProductOnboardingCta />
            </div>
          </div>
        </div>

        {/* Product Tabs - Below the main content */}
        <div className="mt-16">
          <ProductTabs product={product} />
        </div>

      <div className="mt-16">
        <AskQuestionForm />
      </div>

        {/* Related Products */}
        <div className="mt-16">
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ProductTemplate