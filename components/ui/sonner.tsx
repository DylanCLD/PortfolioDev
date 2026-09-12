"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"

// The site is dark-only, so the toaster is pinned to dark instead of reading
// next-themes (no ThemeProvider is mounted).
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--font-mono": "var(--font-jetbrains-mono)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
