import React from 'react'
import Link from 'next/link'
import { Card, CardContent } from "@lib/components/ui/card"
import Footer from '@modules/layout/templates/footer'

function Category() {
  const categories = [
    {
      id: 1,
      name: "Siktare",
      count: "3 Annonser"
    },
    {
      id: 2,
      name: "Hjullastare",
      count: "3 Annonser"
    },
    {
      id: 3,
      name: "Entreprenadmaskiner",
      count: "2 Annonser"
    },
    {
      id: 4,
      name: "Krossar",
      count: "3 Annonser"
    },
    {
      id: 5,
      name: "Reservdelar",
      count: "2 Annonser"
    },
    {
      id: 6,
      name: "Övriga tjänster",
      count: "4 Annonser"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <span>•</span>
          <span className="text-gray-900">Kategorier</span>
        </nav>

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-12">Kategorier</h1>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.id}`}>
              <Card className="h-48 hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-gray-100 hover:bg-gray-200">
                <CardContent className="h-full flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {category.count}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Category