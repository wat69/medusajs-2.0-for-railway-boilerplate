'use client'

import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    const isDark = storedTheme === "dark" || (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    setDark(isDark)
    document.documentElement.classList.toggle("dark", isDark)
    document.documentElement.setAttribute("data-mode", isDark ? "dark" : "light")
  }, [])

  const toggle = () => {
    const newDark = !dark
    setDark(newDark)
    localStorage.setItem("theme", newDark ? "dark" : "light")
    document.documentElement.classList.toggle("dark", newDark)
    document.documentElement.setAttribute("data-mode", newDark ? "dark" : "light")
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggle}
        className="px-4 py-2 rounded bg-background text-foreground border border-border shadow-md transition"
      >
        {dark ? "🌙 Mörkt" : "☀️ Ljust"}
      </button>
    </div>
  )
}
