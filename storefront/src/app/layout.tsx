import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "../app/globals.css"
import { Toaster } from "@lib/components/ui/sonner"
import ThemeToggle from "@lib/components/ThemeToggle"


export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className="bg-background text-foreground">
        <main className="relative">
          {props.children}
          <Toaster />
          <div className="bg-background text-foreground p-4">
            Dark mode test!
          </div>
          <ThemeToggle />
        </main>
      </body>
    </html>
  )
}
