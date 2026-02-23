"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevents hydration mismatch by waiting for component to mount
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      // We added "group" here so the button knows when it's being hovered
      className="group p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
      aria-label="Toggle Dark Mode"
    >
      {/* We wrapped the icon in a div that does a buttery-smooth 180-degree spin on hover! */}
      <div className="transition-transform duration-500 ease-out group-hover:rotate-180">
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </div>
    </button>
  )
}