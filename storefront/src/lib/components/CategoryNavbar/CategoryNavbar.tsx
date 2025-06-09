"use client"
import { HttpTypes } from "@medusajs/types"
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

  return (
    <div className="w-full bg-[#111827] sticky top-0 z-30 p-0">
    <nav
      className="
        flex flex-row items-center
        overflow-x-auto whitespace-nowrap w-full
        bg-[#111827] text-white
        py-2
        scrollbar-hide
      "
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <Link
        href="/store"
        onClick={() => (onClose ? onClose(false) : null)}
        className={
          "label-md uppercase px-4 mx-1 flex items-center justify-between" +
          (!category ? " border-b-2 border-white font-semibold" : " opacity-80 hover:opacity-100")
        }
      >
        Alla Annonser
      </Link>
      {categories?.map(({ id, handle, name }) => (
        <Link
          key={id}
          href={`/categories/${handle}`}
          onClick={() => (onClose ? onClose(false) : null)}
          className={
            "label-md uppercase px-4 mx-1 flex items-center justify-between transition-opacity" +
            (handle === category
              ? " border-b-2 border-white font-semibold"
              : " opacity-80 hover:opacity-100")
          }
        >
          {name}

        </Link>
      ))}
    </nav>
    </div>
  )
}
