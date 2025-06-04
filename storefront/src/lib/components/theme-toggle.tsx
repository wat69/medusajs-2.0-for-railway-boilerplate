"use client"

import { useTheme } from "@lib/components/theme-provider"
import { Button } from "@lib/components/ui/button"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="secondary"
    //   size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="group w-8 h-8 rounded-md"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-white transition-transform duration-300 group-hover:rotate-180" />
      ) : (
        <Moon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-180" />
      )}
    </Button>
  )
} 