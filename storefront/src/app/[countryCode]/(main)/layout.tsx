import { Metadata } from "next"

import Footer from "@lib/components/footer"
// import Nav from "@modules/layout/templates/nav"
import Header from "@lib/components/navbar"
import { getBaseURL } from "@lib/util/env"
import { ThemeProvider } from "@lib/components/theme-provider"
import { getCategoriesList } from "@lib/data/categories"
import { Navbar } from "@lib/components/Navba"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  //@ts-ignore
  const { product_categories } = await getCategoriesList(0, 6)
  return (
    <ThemeProvider defaultTheme="light">
      <Header />
      <Navbar categories={product_categories} />
      {props.children}
      <Footer />
    </ThemeProvider>
  )
}
