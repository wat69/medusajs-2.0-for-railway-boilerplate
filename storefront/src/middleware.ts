import { HttpTypes } from "@medusajs/types"
import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL!
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!
const DEFAULT_REGION = "se"

const regionMapCache = {
  regionMap: new Map<string, HttpTypes.StoreRegion>(),
  regionMapUpdated: Date.now(),
}

async function getRegionMap() {
  const { regionMap, regionMapUpdated } = regionMapCache

  if (
    !regionMap.keys().next().value ||
    regionMapUpdated < Date.now() - 3600 * 1000
  ) {
    const { regions } = await fetch(`${BACKEND_URL}/store/regions`, {
      headers: {
        "x-publishable-api-key": PUBLISHABLE_API_KEY,
      },
    }).then((res) => res.json())

    regions?.forEach((region: HttpTypes.StoreRegion) => {
      region.countries?.forEach((c) => {
        regionMap.set(c.iso_2 ?? "", region)
      })
    })

    regionMapCache.regionMapUpdated = Date.now()
  }

  return regionMap
}

export async function middleware(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const isOnboarding = searchParams.get("onboarding") === "true"
  const cartId = searchParams.get("cart_id")
  const checkoutStep = searchParams.get("step")

  const regionMap = await getRegionMap()

  // Du kan här sätta cookie om det inte redan finns
  const countryCode =
    DEFAULT_REGION || "se"

  const response = NextResponse.next()

  // Add onboarding cookie if applicable
  if (isOnboarding) {
    response.cookies.set("_medusa_onboarding", "true", { maxAge: 60 * 60 * 24 })
  }

  // Set cart cookie if coming from onboarding
  if (cartId && !checkoutStep) {
    const url = request.nextUrl.clone()
    url.searchParams.set("step", "address")
    response.cookies.set("_medusa_cart_id", cartId, { maxAge: 60 * 60 * 24 })
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|.*\\.png|.*\\.jpg|.*\\.gif|.*\\.svg).*)"],
}
