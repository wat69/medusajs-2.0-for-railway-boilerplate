import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@lib/components/ui/card'
import { Button } from '@lib/components/ui/button'
import { Heart, ShoppingCart } from 'lucide-react'

import { getProductPrice } from '@lib/util/get-product-price'
import { getProductsById } from '@lib/data/products'
import { HttpTypes } from '@medusajs/types'

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const [pricedProduct] = await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  })

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })

  return (
    <div className="group transition-all duration-700 opacity-100 translate-y-0">
      <Card className="h-full border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden bg-white cursor-pointer">
        <Link href={`/products/${product.handle}`} className="relative block h-64 w-full overflow-hidden">
          <Image
            src={product.thumbnail || '/placeholder.png'}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <Button size="icon" variant="secondary" className="rounded-full bg-white">
              <Heart className="h-4 w-4 text-red-500" />
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full bg-white">
              <ShoppingCart className="h-4 w-4 text-green-500" />
            </Button>
          </div>
        </Link>

        <CardContent className="p-4">
          <h3 className="text-base font-medium text-gray-800 line-clamp-1">{product.title}</h3>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          {cheapestPrice && (
            <span className="text-sm font-semibold text-gray-900">{cheapestPrice.calculated_price}</span>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
