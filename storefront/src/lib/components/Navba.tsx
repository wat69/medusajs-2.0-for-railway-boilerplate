import { HttpTypes } from "@medusajs/types"
import  { CategoryNavbar } from "@lib/components/CategoryNavbar/CategoryNavbar"

export const Navbar = ({
  categories,
}: {
  categories: HttpTypes.StoreProductCategory[]
}) => {
  console.log("Navbar categories", categories)
  return (
    <div className="flex border py-4 justify-between px-6">
      <div className="hidden md:flex items-center">
        <CategoryNavbar categories={categories} />
      </div>
    </div>
  )
}
