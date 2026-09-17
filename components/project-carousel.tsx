"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ChevronLeft, ChevronRight, Maximize, X } from "@/components/icons"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { cn } from "@/lib/utils"

interface ProjectCarouselProps {
  youtubeId?: string
  videos?: { id: string; title: string }[]
  images: string[]
  imageTitles?: string[]
  projectName: string
  isOpen: boolean
  onClose: () => void
}

export function ProjectCarousel({ images, imageTitles = [], projectName, isOpen, onClose, youtubeId, videos }: ProjectCarouselProps) {
  const [videoIndex, setVideoIndex] = useState(0)
  const videoItems = videos ?? (youtubeId ? [{ id: youtubeId, title: projectName }] : [])
  const selectedVideo = videoItems[videoIndex] ?? videoItems[0]
  const selectedVideoId = selectedVideo?.id
  const [index, setIndex] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [playerOrigin, setPlayerOrigin] = useState("")
  useEffect(() => { setPlayerOrigin(window.location.origin) }, [])
  const dialogRef = useRef<HTMLDialogElement>(null)
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
      setVideoIndex(0)
      setIndex(0)
      setZoomed(false)
      setVideoOpen(Boolean(youtubeId))
      setVideoLoaded(false)
    }
  }, [isOpen, projectName, youtubeId])

  // Keyboard: Escape closes, arrows navigate.
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        if (zoomed) setZoomed(false)
        else onClose()
      } else if (!videoOpen && event.key === "ArrowRight") {
        go(1)
      } else if (!videoOpen && event.key === "ArrowLeft") {
        go(-1)
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isOpen, zoomed, videoOpen, go, onClose])

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
    if (!isOpen) return
    const previous = document.activeElement as HTMLElement | null
    const dialog = dialogRef.current
    dialog?.showModal()
    return () => { dialog?.close(); previous?.focus() }
  }, [isOpen])

  if (!isOpen || count === 0) return null

  const title = videoOpen ? selectedVideo?.title ?? projectName : imageTitles[index] || `${t.screenshot} ${index + 1}`
  // Preload the neighbours so arrow navigation does not flash.
  const neighbours = count > 1 ? Array.from(new Set([images[(index + 1) % count], images[(index - 1 + count) % count]])) : []

  const content = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <dialog
        ref={dialogRef}
        onCancel={(event) => { event.preventDefault(); if (zoomed) setZoomed(false); else onClose() }}
        aria-modal="true"
        aria-label={`${projectName} — ${title}`}
        tabIndex={-1}
        className="edge-light surface-card fixed inset-0 m-auto flex h-fit max-h-[92vh] w-[calc(100%-2rem)] max-w-6xl flex-col overflow-hidden bg-surface-1 shadow-[var(--shadow-lg)] outline-none"
      >
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3.5">
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold">{projectName}</h2>
            <p className="truncate font-mono text-xs text-muted-foreground">{title}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="tabular hidden font-mono text-xs text-muted-foreground sm:inline">
              {videoOpen ? `${videoIndex + 1} / ${videoItems.length}` : `${index + 1} / ${count}`}
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

        {youtubeId ? <div className="flex gap-3 border-b border-border px-5 py-3">
          <button type="button" aria-pressed={videoOpen} onClick={() => { setVideoOpen(true); setZoomed(false) }} className="min-h-11 rounded border border-border bg-surface-2 px-4 text-sm">{language === "fr" ? "Vidéos" : "Videos"} ({videoItems.length})</button>
          <button type="button" aria-pressed={!videoOpen} onClick={() => { setVideoOpen(false); setVideoLoaded(false) }} className="min-h-11 rounded border border-border bg-surface-2 px-4 text-sm">{language === "fr" ? "Captures" : "Screenshots"}{videos ? " · Treasure" : ""} ({count})</button>
        </div> : null}
        {videoOpen && selectedVideoId ? <div className="min-h-0 overflow-auto bg-background">
          {videoItems.length > 1 ? <div role="group" aria-label={language === "fr" ? "Choisir une démonstration" : "Choose a demo"} className="grid gap-2 border-b border-border p-4 sm:grid-cols-2 lg:grid-cols-3">
            {videoItems.map((video, position) => <button key={video.id} type="button" aria-pressed={position === videoIndex} onClick={() => setVideoIndex(position)} className="min-h-11 rounded border border-border bg-surface-2 px-3 py-2 text-left text-xs transition-colors hover:text-accent-bright">
              <span className="mr-2 font-mono text-accent-bright">{String(position + 1).padStart(2, "0")}</span>{video.title}
            </button>)}
          </div> : null}
          {videoLoaded ? <div>
            <iframe key={selectedVideoId} className="aspect-video max-h-[58vh] w-full" src={`https://www.youtube-nocookie.com/embed/${selectedVideoId}?autoplay=1&rel=0&playsinline=1&origin=${encodeURIComponent(playerOrigin)}`} title={selectedVideo?.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
            <a href={`https://www.youtube.com/watch?v=${selectedVideoId}`} target="_blank" rel="noopener noreferrer" className="m-3 inline-flex min-h-11 items-center px-3 text-sm underline">{language === "fr" ? "Ouvrir sur YouTube si le lecteur ne fonctionne pas" : "Open on YouTube if the player does not load"}</a>
            <button type="button" className="m-3 min-h-11 px-3 text-sm underline" onClick={() => setVideoLoaded(false)}>{language === "fr" ? "Arrêter et désactiver YouTube" : "Stop and disable YouTube"}</button>
          </div> : <div className="relative flex min-h-72 flex-col items-center justify-center gap-5 px-6 py-10 text-center sm:min-h-96">
            {!videos || selectedVideoId === "ZYCvFV-1o4s" ? <img src={images[0]} alt="" className="absolute inset-0 h-full w-full object-cover opacity-15" /> : null}
            <div className="relative max-w-lg space-y-5">
              <p className="text-lg font-medium">{selectedVideo?.title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{language === "fr" ? "En activant ce lecteur, vous acceptez la connexion à YouTube (Google), qui recevra notamment votre adresse IP et pourra utiliser des traceurs. Aucun lecteur externe n’est chargé avant votre choix." : "Activating this player connects to YouTube (Google), which receives your IP address and may use trackers. No external player loads before your choice."}</p>
              <button type="button" onClick={() => setVideoLoaded(true)} className="min-h-12 rounded bg-accent px-6 font-semibold text-accent-foreground">{language === "fr" ? "Autoriser YouTube et lire la vidéo" : "Allow YouTube and play video"}</button>
              <p className="text-xs"><a href="/confidentialite" target="_blank" rel="noopener noreferrer" className="underline">{language === "fr" ? "Confidentialité" : "Privacy"}</a></p>
            </div>
          </div>}
        </div> : <>
        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-auto bg-background">
          <img
            key={images[index]}
            src={images[index]}
            alt={title}
            decoding="async"
            role="button"
            tabIndex={0}
            aria-label={`${zoomed ? (language === "fr" ? "Réduire" : "Zoom out") : (language === "fr" ? "Agrandir" : "Zoom in")} — ${title}`}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setZoomed(value => !value) }
            }}
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
        </>}
      </dialog>

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
