"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ChevronLeft, ChevronRight, Maximize, X } from "@/components/icons"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { cn } from "@/lib/utils"

interface ProjectCarouselProps {
  images: string[]
  imageTitles?: string[]
  projectName: string
  isOpen: boolean
  onClose: () => void
}

export function ProjectCarousel({ images, imageTitles = [], projectName, isOpen, onClose }: ProjectCarouselProps) {
  const [index, setIndex] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()
  const t = translations[language].carousel

  const count = images.length

  const go = useCallback(
    (delta: number) => {
      if (count === 0) return
      setZoomed(false)
      setIndex((current) => (current + delta + count) % count)
    },
    [count],
  )

  // Reset to the first slide whenever a different project opens, so the modal
  // never shows a stale (or out-of-range) slide from the previous gallery.
  useEffect(() => {
    if (isOpen) {
      setIndex(0)
      setZoomed(false)
    }
  }, [isOpen, projectName])

  // Keyboard: Escape closes, arrows navigate.
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        if (zoomed) setZoomed(false)
        else onClose()
      } else if (event.key === "ArrowRight") {
        go(1)
      } else if (event.key === "ArrowLeft") {
        go(-1)
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isOpen, zoomed, go, onClose])

  // Lock background scrolling while the dialog is open, without the layout
  // shift that removing the scrollbar would cause.
  useEffect(() => {
    if (!isOpen) return
    const { overflow, paddingRight } = document.body.style
    const gutter = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = "hidden"
    if (gutter > 0) document.body.style.paddingRight = `${gutter}px`
    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [isOpen])

  // Move focus into the dialog so the keyboard handlers and Tab order apply.
  useEffect(() => {
    if (isOpen) dialogRef.current?.focus()
  }, [isOpen])

  if (!isOpen || count === 0) return null

  const title = imageTitles[index] || `${t.screenshot} ${index + 1}`
  // Preload the neighbours so arrow navigation does not flash.
  const neighbours = count > 1 ? [images[(index + 1) % count], images[(index - 1 + count) % count]] : []

  const content = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${projectName} — ${title}`}
        tabIndex={-1}
        className="edge-light surface-card flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden bg-surface-1 shadow-[var(--shadow-lg)] outline-none"
      >
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3.5">
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold">{projectName}</h2>
            <p className="truncate font-mono text-xs text-muted-foreground">{title}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="tabular hidden font-mono text-xs text-muted-foreground sm:inline">
              {index + 1} / {count}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label={t.close}
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-border bg-surface-2 text-muted-foreground transition-colors hover:border-accent/60 hover:text-foreground"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-auto bg-background">
          <img
            key={images[index]}
            src={images[index]}
            alt={title}
            decoding="async"
            onClick={() => setZoomed((value) => !value)}
            className={cn(
              "select-none transition-transform duration-300",
              zoomed ? "max-w-none cursor-zoom-out" : "max-h-[62vh] w-full cursor-zoom-in object-contain",
            )}
          />

          {!zoomed ? (
            <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-md border border-border bg-background/85 px-2.5 py-1.5 font-mono text-[0.7rem] text-muted-foreground backdrop-blur">
              <Maximize className="mr-1.5 inline h-3 w-3 align-[-2px]" />
              {t.zoomHint}
            </span>
          ) : null}

          {count > 1 ? (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={t.prev}
                className="absolute left-3 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-border bg-background/80 text-foreground backdrop-blur transition-colors hover:border-accent/60 hover:text-accent-bright"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={t.next}
                className="absolute right-3 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-border bg-background/80 text-foreground backdrop-blur transition-colors hover:border-accent/60 hover:text-accent-bright"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          ) : null}
        </div>

        {count > 1 ? (
          <div className="flex items-center gap-3 border-t border-border px-5 py-4">
            <ul className="flex flex-1 gap-2.5 overflow-x-auto pb-1">
              {images.map((image, thumbIndex) => (
                <li key={image}>
                  <button
                    type="button"
                    onClick={() => {
                      setZoomed(false)
                      setIndex(thumbIndex)
                    }}
                    aria-label={`${t.goTo} ${thumbIndex + 1}`}
                    aria-current={thumbIndex === index ? "true" : undefined}
                    className={cn(
                      "h-16 w-20 shrink-0 cursor-pointer overflow-hidden rounded-md border transition-all duration-200",
                      thumbIndex === index
                        ? "border-accent ring-2 ring-accent/30"
                        : "border-border opacity-60 hover:opacity-100",
                    )}
                  >
                    <img
                      src={image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </button>
                </li>
              ))}
            </ul>
            <p className="hidden shrink-0 font-mono text-[0.7rem] text-muted-foreground lg:block">{t.keyboardHint}</p>
          </div>
        ) : null}
      </div>

      {/* Warm the adjacent slides */}
      <div aria-hidden="true" className="hidden">
        {neighbours.map((src) => (
          <img key={src} src={src} alt="" />
        ))}
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
