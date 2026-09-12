"use client"

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface RevealProps {
  children: ReactNode
  /** Stagger offset in ms. Keep under ~400ms total per group. */
  delay?: number
  className?: string
  as?: ElementType
  /** Fraction of the element that must be visible before revealing. */
  threshold?: number
}

/**
 * Reveals its children the first time they scroll into view.
 *
 * This replaces load-time CSS animations: those fired for every section at
 * once, so anything below the fold had already finished animating by the time
 * the visitor got there. The transition itself lives in globals.css and is
 * neutralised under prefers-reduced-motion.
 */
export function Reveal({ children, delay = 0, className, as: Tag = "div", threshold = 0.15 }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // No IntersectionObserver (or reduced motion): show the final state now.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <Tag
      ref={ref}
      className={cn("reveal", className)}
      data-visible={visible ? "true" : "false"}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  )
}
