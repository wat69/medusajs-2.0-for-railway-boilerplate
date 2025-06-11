import { getCustomer } from "@lib/data/customer"
import { redirect } from "next/navigation"
import AccountLayout from "@modules/account/templates/account-layout"

export default async function AccountPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const customer = await getCustomer().catch(() => null)

  if (!customer) {
    redirect("/se/login")
  }

  return <AccountLayout customer={customer}>{children}</AccountLayout>
}
