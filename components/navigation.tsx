"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Languages, Menu, X } from "@/components/icons"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { cn } from "@/lib/utils"

const SECTION_IDS = ["about", "projects", "contact"] as const

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState<string | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const { language, toggleLanguage } = useLanguage()
  const t = translations[language]

  const links = [
    { href: "#about", label: t.nav.about, id: "about" },
    { href: "#projects", label: t.nav.projects, id: "projects" },
    { href: "#contact", label: t.nav.contact, id: "contact" },
  ]

  // Scroll state: elevate the bar and drive the reading-progress line.
  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const top = window.scrollY
        const max = document.documentElement.scrollHeight - window.innerHeight
        setScrolled(top > 24)
        setProgress(max > 0 ? Math.min(1, top / max) : 0)
      })
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  // Scroll spy: highlight the section currently crossing the upper third.
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (node): node is HTMLElement => node !== null,
    )
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.01, 0.25, 0.5] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    toggleRef.current?.focus()
  }, [])

  // Escape closes the mobile panel; an outside click does too.
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
    }
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (!panelRef.current?.contains(target) && !toggleRef.current?.contains(target)) close()
    }

    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown)
    }
  }, [open, close])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        scrolled
          ? "border-b border-border bg-background/72 shadow-[0_8px_24px_-16px_rgb(0_0_0/0.9)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav aria-label={t.nav.sections} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight"
            aria-label="Dylan Clochard — accueil"
          >
            <span className="inline-flex min-h-11 items-center">
              dc<span className="text-muted-foreground">.dev</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link, index) => {
              const isActive = active === link.id
              return (
                <a
                  key={link.id}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm transition-colors duration-200",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className="font-mono text-[0.7rem] text-accent-bright/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>{" "}
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3 -bottom-px h-px origin-left bg-accent transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              )
            })}

            <a
              href="https://github.com/DylanCLD"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {t.nav.github}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={t.nav.switchLanguage}
              className="ml-2 inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-md border border-border bg-surface-2 px-3 font-mono text-xs font-semibold text-foreground transition-colors duration-200 hover:border-accent/60 hover:text-accent-bright"
            >
              <Languages className="h-3.5 w-3.5" />
              {language === "fr" ? "EN" : "FR"}
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={t.nav.switchLanguage}
              className="inline-flex h-11 min-w-11 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-border bg-surface-2 px-3 font-mono text-xs font-semibold"
            >
              {language === "fr" ? "EN" : "FR"}
            </button>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-md border border-border bg-surface-2 text-foreground"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Reading progress */}
      <div
        aria-hidden="true"
        className="h-px origin-left bg-gradient-to-r from-accent to-accent-2 transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />

      <div
        ref={panelRef}
        id="mobile-nav"
        hidden={!open}
        className="border-b border-border bg-background/96 backdrop-blur-xl md:hidden"
      >
        <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
          {links.map((link, index) => (
            <li key={link.id}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active === link.id ? "true" : undefined}
                className={cn(
                  "flex min-h-11 items-center gap-3 rounded-md px-3 text-base transition-colors",
                  active === link.id ? "bg-surface-2 text-foreground" : "text-muted-foreground",
                )}
              >
                <span className="font-mono text-xs text-accent-bright/70">{String(index + 1).padStart(2, "0")}</span>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://github.com/DylanCLD"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center gap-2 rounded-md px-3 text-base text-muted-foreground"
            >
              <span className="font-mono text-xs text-accent-bright/70">04</span>
              {t.nav.github}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
