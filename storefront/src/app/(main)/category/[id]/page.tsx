"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from "@lib/components/ui/card"
import { Button } from "@lib/components/ui/button"
import { Checkbox } from "@lib/components/ui/checkbox"
import { Slider } from "@lib/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@lib/components/ui/select"
import { Grid, List, ChevronDown, ChevronUp } from 'lucide-react'

interface CategoryPageProps {
  params: {
    id: string
  }
}

function CategoryPage({ params }: CategoryPageProps) {
  const [priceRange, setPriceRange] = useState([0, 12500000])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('default')
  const [showCategories, setShowCategories] = useState(true)

  // Sample categories data
  const categories = [
    { name: "Siktare", count: 3, active: false },
    { name: "Hjullastare", count: 3, active: true },
    { name: "Entreprenadmaskiner", count: 2, active: false },
    { name: "Krossar", count: 3, active: false },
    { name: "Reservdelar", count: 2, active: false },
    { name: "Övriga tjänster", count: 4, active: false }
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('sv-SE').format(price)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <span>•</span>
          <Link href="/category" className="hover:text-gray-900">
            Shop Grid
          </Link>
        </nav>

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shop Grid</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4 space-y-6">
            {/* Price Filter */}
            <div className=" p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Filter</h3>
              <div className="space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={12500000}
                  min={0}
                  step={10000}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>kr {formatPrice(priceRange[0])}</span>
                  <span>kr {formatPrice(priceRange[1])}</span>
                </div>
                <Button variant="outline" className="w-full">
                  Filter
                </Button>
              </div>
            </div>

            {/* Product Status */}
            <div className=" p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Status</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="on-sale" />
                  <label htmlFor="on-sale" className="text-sm text-gray-700">
                    On sale
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="in-stock" />
                  <label htmlFor="in-stock" className="text-sm text-gray-700">
                    In stock
                  </label>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className=" p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCategories(!showCategories)}
                >
                  {showCategories ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
              {showCategories && (
                <div className="space-y-3">
                  {categories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${category.active ? 'bg-black' : 'bg-gray-300'}`}></span>
                        <span className={`text-sm ${category.active ? 'text-black font-medium' : 'text-gray-700'}`}>
                          {category.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {category.count}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Top Rated Products */}
            <div className=" p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Rated Products</h3>
              {/* Add top rated products content here */}
            </div>

            {/* Popular Brands */}
            <div className=" p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Brands</h3>
              {/* Add popular brands content here */}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className=" p-4 rounded-lg shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* View Toggle */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Results Count */}
                <div className="text-sm text-gray-600">
                  Showing 1-0 of 4 results
                </div>

                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Default Sorting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Sorting</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className=" p-6 rounded-lg shadow-sm">
              {/* Empty state for now - you can add products here */}
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found in this category.</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or browse other categories.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryPage 