"use client"

import { useEffect, useMemo, useState } from "react"
import { ArrowDown, ArrowRight, Github, Linkedin, Mail, Terminal } from "@/components/icons"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { cn } from "@/lib/utils"

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(query.matches)
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  return reduced
}

/** Types `text` out one character at a time, or returns it whole when the
 *  visitor asked for reduced motion. */
export function useTypewriter(text: string, enabled: boolean, speed = 45) {
  const [typed, setTyped] = useState("")

  useEffect(() => {
    if (!enabled) {
      setTyped(text)
      return
    }

    setTyped("")
    let index = 0
    const interval = window.setInterval(() => {
      index += 1
      setTyped(text.slice(0, index))
      if (index >= text.length) window.clearInterval(interval)
    }, speed)

    return () => window.clearInterval(interval)
  }, [text, enabled, speed])

  return typed
}

export default function Hero() {
  const { language } = useLanguage()
  const t = translations[language]
  const reducedMotion = usePrefersReducedMotion()
  const command = useTypewriter(t.hero.command, !reducedMotion)

  const roles = useMemo(() => t.hero.roles, [t.hero.roles])
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    setRoleIndex(0)
    if (reducedMotion || roles.length < 2) return
    const interval = window.setInterval(() => {
      setRoleIndex((value) => (value + 1) % roles.length)
    }, 2800)
    return () => window.clearInterval(interval)
  }, [roles, reducedMotion])

  const metrics = [
    { value: "9", label: t.hero.metrics.projects },
    { value: "10", label: t.hero.metrics.languages },
    { value: "3", label: t.hero.metrics.internship },
  ]

  const socials = [
    { href: "https://github.com/DylanCLD", label: "GitHub", Icon: Github },
    { href: "https://www.linkedin.com/in/dylan-clochard-75095b335", label: "LinkedIn", Icon: Linkedin },
    { href: "mailto:dylanclochard@gmail.com", label: "Email", Icon: Mail },
  ]

  const terminalLines = [
    { key: "role", label: "role", value: t.hero.terminal.role },
    { key: "school", label: "school", value: t.hero.terminal.school },
    { key: "location", label: "location", value: t.hero.terminal.location },
    { key: "focus", label: "focus", value: t.hero.terminal.focus },
  ]

  return (
    <section className="relative flex min-h-[100svh] items-center px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-16">
        <div className="fade-up">
          <p className="hero-availability mb-6 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface-2/80 py-1.5 pl-2.5 pr-4 text-xs text-muted-foreground backdrop-blur">
            <span aria-hidden="true" className="pulse-dot h-2 w-2 rounded-full bg-success" />
            {t.hero.available}
          </p>

          <p className="mb-5 font-mono text-sm text-accent-bright">
            <span className={cn(!reducedMotion && "cursor-blink")}>{command}</span>
          </p>

          <h1 className="hero-title text-gradient text-balance text-[clamp(2.75rem,8vw,5.25rem)] font-semibold leading-[0.95] tracking-tight">
            {t.hero.title}
          </h1>

          {/* Role rotator — fixed height so the layout never shifts */}
          <div className="mt-5 flex h-7 items-center gap-3 font-mono text-base text-foreground/90 sm:text-lg">
            <span aria-hidden="true" className="text-accent">
              ▸
            </span>
            <span className="relative block overflow-hidden">
              <span key={roleIndex} className="fade-up block">
                {roles[roleIndex]}
              </span>
            </span>
          </div>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.hero.description}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#projects"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-accent px-6 font-semibold text-accent-foreground transition-[box-shadow,transform] duration-200 hover:shadow-[var(--shadow-glow)] active:translate-y-px"
            >
              {t.hero.exploreCTA}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-border bg-surface-1/60 px-6 font-medium text-foreground backdrop-blur transition-colors duration-200 hover:border-border-strong hover:bg-surface-2"
            >
              {t.hero.contactCTA}
            </a>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-7">
            {metrics.map((metric) => (
              // `order` keeps the number on top visually while the DOM stays
              // dt-then-dd, and top alignment survives labels that wrap.
              <div key={metric.label} className="flex flex-col items-start">
                <dt className="order-2 mt-1 text-xs leading-snug text-muted-foreground">{metric.label}</dt>
                <dd className="tabular order-1 text-2xl font-semibold leading-none text-foreground sm:text-3xl">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>

          <ul className="mt-10 flex items-center gap-2">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  title={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface-1/60 text-muted-foreground transition-colors duration-200 hover:border-accent/60 hover:text-accent-bright"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Terminal card — the identity detail, decorative on small screens */}
        <div className="fade-up hidden lg:block" style={{ animationDelay: "160ms" }}>
          <div className="hero-terminal edge-light surface-card overflow-hidden bg-surface-1/70 shadow-[var(--shadow-lg)] backdrop-blur">
            <div className="flex items-center gap-2 border-b border-border bg-surface-2/70 px-4 py-3">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-destructive/80" />
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-warning/80" />
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-success/80" />
              <span className="ml-2 flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <Terminal className="h-3.5 w-3.5" />
                {t.hero.terminal.title}
              </span>
            </div>

            <div className="space-y-2.5 p-5 font-mono text-[0.8rem] leading-relaxed">
              <p className="text-muted-foreground">
                <span className="text-accent-2">dylan@iscod</span>
                <span className="text-muted-foreground">:~$ </span>
                <span className="text-foreground">{t.hero.terminal.command}</span>
              </p>
              {terminalLines.map((line) => (
                <p key={line.key} className="flex gap-3">
                  <span className="w-[4.5rem] shrink-0 text-accent-bright/80">{line.label}</span>
                  <span className="text-muted-foreground">{line.value}</span>
                </p>
              ))}
              <p className="flex gap-3 border-t border-border pt-3">
                <span className="w-[4.5rem] shrink-0 text-accent-bright/80">status</span>
                <span className="text-success">{t.hero.terminal.status}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
      >
        {t.hero.scrollHint}
        <ArrowDown className="h-3.5 w-3.5" />
      </a>
    </section>
  )
}
