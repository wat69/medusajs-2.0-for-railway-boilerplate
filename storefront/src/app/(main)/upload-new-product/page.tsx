import { redirect } from "next/navigation"
import VendorProductUpload from "@lib/components/vendor-product-upload"
import { getCustomer } from "@lib/data/customer"

const UploadProduct = async () => {
  const customer = await getCustomer()

  if (!customer) {
    redirect("/account")
  }

  return (
    <>
      <VendorProductUpload customer={customer} />
    </>
  )
}

export default UploadProduct