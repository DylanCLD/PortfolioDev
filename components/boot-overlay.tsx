"use client"

import { useEffect, useState } from "react"
import { Terminal } from "@/components/icons"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { cn } from "@/lib/utils"

const FADE_AT = 620
const UNMOUNT_AT = 1120

/**
 * Short terminal boot curtain.
 *
 * The previous version gated the entire page behind a 2s timer, so the real
 * content was absent from the initial DOM (bad for crawlers, and a 2s stall for
 * everyone). This renders on top of fully-mounted content instead, fades out
 * quickly, and disappears immediately for reduced-motion visitors.
 */
export default function BootOverlay() {
  const { language } = useLanguage()
  const t = translations[language].boot
  const [fading, setFading] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true)
      return
    }

    const fade = window.setTimeout(() => setFading(true), FADE_AT)
    const unmount = window.setTimeout(() => setDone(true), UNMOUNT_AT)
    return () => {
      window.clearTimeout(fade)
      window.clearTimeout(unmount)
    }
  }, [])

  if (done) return null

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed inset-0 z-[80] grid place-items-center bg-background transition-opacity duration-500",
        fading ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <div className="font-mono text-sm text-muted-foreground">
        <p className="mb-3 flex items-center gap-2 text-accent-bright">
          <Terminal className="h-4 w-4" />
          {t.line1}
        </p>
        <p className="cursor-blink pl-6">{t.line2}</p>
      </div>
    </div>
  )
}
