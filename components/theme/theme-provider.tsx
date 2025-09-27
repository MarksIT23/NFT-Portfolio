"use client"

import * as React from "react"

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: string
}

export function ThemeProvider({ children, attribute = "class", defaultTheme = "light" }: ThemeProviderProps) {
  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || defaultTheme
    document.documentElement.classList.toggle("dark", savedTheme === "dark")
  }, [defaultTheme])

  return <>{children}</>
}
