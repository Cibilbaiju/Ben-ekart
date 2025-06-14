
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: "class" | "style" | Array<"class" | "style">
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // always use attribute="class" for next-themes compatibility with tailwind
  return <NextThemesProvider attribute="class" {...props}>{children}</NextThemesProvider>
}
