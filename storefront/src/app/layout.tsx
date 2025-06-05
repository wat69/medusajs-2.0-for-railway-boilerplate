import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "../app/globals.css"
import { Toaster } from "@lib/components/ui/sonner"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="sv" data-mode="dark" className="dark">
      <body>
        <main className="relative">{props.children}</main>
        <Toaster />
      </body>
    </html>
  )
}
