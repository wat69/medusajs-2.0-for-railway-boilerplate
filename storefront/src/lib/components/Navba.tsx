import { HttpTypes } from "@medusajs/types"
import  { CategoryNavbar } from "@lib/components/CategoryNavbar/CategoryNavbar"

export const Navbar = ({
  categories,
}: {
  categories: HttpTypes.StoreProductCategory[]
}) => {
  console.log("Navbar categories", categories)
  return (
    <div className="w-full bg-[#111827] sticky top-0 z-50 shadow-md shadow-black/30 px-0 sm:px-4">
      <div className="items-center">
        <CategoryNavbar categories={categories} />
      </div>
    </div>
  )
}
