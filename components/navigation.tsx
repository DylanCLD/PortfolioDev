"use client"

import { useState } from "react"
import { Menu, X } from "@/components/icons"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const { language, setLanguage } = useLanguage()
  const t = translations[language]

  const links = [
    { href: "#about", label: t.nav.about },
    { href: "#projects", label: t.nav.projects },
    { href: "#contact", label: t.nav.contact },
    { href: "https://github.com/DylanCLD", label: t.nav.github, external: true },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-mono font-bold text-lg glow-text">
            dc.dev
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.external ? link.href : link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-muted-foreground hover:text-accent transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
              className="px-4 py-2 rounded-lg bg-accent text-accent-foreground font-mono font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-accent/50 hover:scale-105"
              title={language === "fr" ? "Switch to English" : "Passer à français"}
            >
              {language === "fr" ? "EN" : "FR"}
            </button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-foreground hover:text-accent transition-colors"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-4 border-t border-border pt-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.external ? link.href : link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
              className="px-4 py-2 rounded-lg bg-accent text-accent-foreground font-mono font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-accent/50"
              title={language === "fr" ? "Switch to English" : "Passer à français"}
            >
              {language === "fr" ? "EN" : "FR"}
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
