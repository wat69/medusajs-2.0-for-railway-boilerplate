"use client"
import { HttpTypes } from "@medusajs/types"
import { ListCollapseIcon } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export const CategoryNavbar = ({
  categories,
  onClose,
}: {
  categories: HttpTypes.StoreProductCategory[]
  onClose?: (state: boolean) => void
}) => {
  const { category } = useParams()

  console.log("CategoryNavbar categories", categories)

  return (
    <nav className="flex md:items-center flex-col md:flex-row">
      <Link
        href="/store"
        onClick={() => (onClose ? onClose(false) : null)}
        className={"label-md uppercase px-4 my-3 md:my-0 flex items-center justify-between"}
      >
        Alla Annonser
      </Link>
      {categories?.map(({ id, handle, name }) => (
        <Link
          key={id}
          href={`/categories/${handle}`}
          onClick={() => (onClose ? onClose(false) : null)}
          className={
            "label-md uppercase px-4 my-3 md:my-0 flex items-center justify-between" +
            (handle === category ? " md:border-b md:border-primary" : "")
          }
        >
          {name}
          <ListCollapseIcon size={18} className="-rotate-90 md:hidden" />
        </Link>
      ))}
    </nav>
  )
}
