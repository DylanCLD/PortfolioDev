"use client"

import { useEffect, useRef } from "react"

/**
 * Fixed ambient background: blueprint grid, two slow aurora blooms and a
 * cursor-tracking spotlight.
 *
 * Replaces the old random-bitstring layer, which rendered one 200-character
 * blob in the top-left corner and pulsed the whole thing. Everything here is
 * composited (transform/opacity only), pointer-events-none, and the pointer
 * listener is skipped for touch input and reduced-motion users.
 */
export default function Backdrop() {
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = spotlightRef.current
    if (!node) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const finePointer = window.matchMedia("(pointer: fine)").matches
    if (reduceMotion || !finePointer) return

    let frame = 0
    const onMove = (event: PointerEvent) => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        node.style.setProperty("--mx", `${event.clientX}px`)
        node.style.setProperty("--my", `${event.clientY}px`)
        node.style.opacity = "1"
      })
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onMove)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Blueprint grid, faded out towards the edges */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 120% 80% at 50% 0%, #000 35%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 120% 80% at 50% 0%, #000 35%, transparent 85%)",
        }}
      />

      {/* Aurora blooms */}
      <div
        className="float-slow absolute -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: "color-mix(in oklab, var(--accent) 30%, transparent)" }}
      />
      <div
        className="float-slow absolute top-1/3 -right-32 h-[26rem] w-[26rem] rounded-full blur-[140px]"
        style={{ background: "color-mix(in oklab, var(--accent-2) 16%, transparent)", animationDelay: "-3s" }}
      />

      {/* Cursor spotlight — hidden until the pointer moves */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(360px circle at var(--mx, 50%) var(--my, 0%), color-mix(in oklab, var(--accent) 12%, transparent), transparent 70%)",
        }}
      />

      {/* Vignette keeps text contrast stable over the blooms */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 0%, transparent 40%, var(--background) 100%)" }}
      />
    </div>
  )
}
