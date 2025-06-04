import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import NewArrival from "@lib/components/new-arrival"
// import PopularProducts from "@lib/components/popular-products"
import FeaturedSection from "@lib/components/featured-section"

export const metadata: Metadata = {
  title: "Crusher Brokerage | Buy, Sell or Rent Machinery",
  description:
    "Sweden's largest marketplace for crushing, sorting, and construction machines. Buy, sell or rent equipment with ease.",
}


export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <FeaturedSection />
      <NewArrival />
      {/* <PopularProducts /> */}
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
