import { getCustomer } from "@lib/data/customer"
import { redirect } from "next/navigation"
import AccountLayout from "@modules/account/templates/account-layout"

export default async function AccountPageLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { countryCode: string }
}) {
  const customer = await getCustomer().catch(() => null)

  if (!customer) {
    redirect(`/${params.countryCode}/login`)
  }

  return <AccountLayout customer={customer}>{children}</AccountLayout>
}
