"use client"

import { useState } from "react"
import { toast } from "sonner"
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, MapPin, Phone, Sparkles } from "@/components/icons"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/section-heading"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import type { ComponentType } from "react"
import type { IconProps } from "@/components/icons"

const EMAIL = "dylanclochard@gmail.com"
const PHONE = "+33 7 83 61 12 09"

interface ContactEntry {
  key: string
  Icon: ComponentType<IconProps>
  label: string
  value: string
  href?: string
  /** Copyable values get a copy button instead of relying on text selection. */
  copyValue?: string
}

export default function Contact() {
  const { language } = useLanguage()
  const t = translations[language]
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const entries: ContactEntry[] = [
    { key: "email", Icon: Mail, label: t.contact.email, value: EMAIL, href: `mailto:${EMAIL}`, copyValue: EMAIL },
    {
      key: "linkedin",
      Icon: Linkedin,
      label: t.contact.linkedin,
      value: "linkedin.com/in/dylan-clochard",
      href: "https://www.linkedin.com/in/dylan-clochard-75095b335",
    },
    {
      key: "github",
      Icon: Github,
      label: t.contact.github,
      value: "github.com/DylanCLD",
      href: "https://github.com/DylanCLD",
    },
    {
      key: "phone",
      Icon: Phone,
      label: t.contact.phone,
      value: PHONE,
      href: "tel:+33783611209",
      copyValue: PHONE,
    },
    { key: "location", Icon: MapPin, label: t.contact.location, value: language === "fr" ? "Marseille, France · Permis B" : "Marseille, France · Category B driving licence" },
  ]

  const copy = async (entry: ContactEntry) => {
    if (!entry.copyValue) return
    try {
      await navigator.clipboard.writeText(entry.copyValue)
      setCopiedKey(entry.key)
      toast.success(t.contact.copied, { description: entry.copyValue })
      window.setTimeout(() => setCopiedKey((current) => (current === entry.key ? null : current)), 2000)
    } catch {
      toast.error(t.contact.copyFailed)
    }
  }

  return (
    <section id="contact" className="relative px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index={t.contact.index} title={t.contact.title} lead={t.contact.ready} />

        <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <article className="edge-light surface-card flex h-full flex-col justify-between gap-10 bg-surface-1/70 p-7 backdrop-blur md:p-9">
              <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                {t.contact.description}
              </p>

              <div className="space-y-5">
                <dl className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-border bg-surface-2/60 p-4">
                    <dt className="section-index mb-1.5">{t.contact.availability}</dt>
                    <dd className="flex items-center gap-2 text-sm font-medium">
                      <span aria-hidden="true" className="pulse-dot h-2 w-2 rounded-full bg-success" />
                      {t.contact.availabilityValue}
                    </dd>
                  </div>
                  <div className="rounded-lg border border-border bg-surface-2/60 p-4">
                    <dt className="section-index mb-1.5">{t.contact.location}</dt>
                    <dd className="text-sm font-medium">Aix-en-Provence, France</dd>
                  </div>
                </dl>

                <a
                  href={`mailto:${EMAIL}`}
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 font-semibold text-accent-foreground transition-[box-shadow,transform] duration-200 hover:shadow-[var(--shadow-glow)] active:translate-y-px sm:w-auto"
                >
                  <Sparkles className="h-4 w-4" />
                  {t.contact.startConversation}
                </a>

                <p className="font-mono text-xs text-muted-foreground">{t.contact.responseTime}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{language === "fr" ? "Vos coordonnées servent uniquement à traiter votre demande. " : "Your details are used only to handle your enquiry. "}<a href="/confidentialite" className="underline underline-offset-4">{language === "fr" ? "Confidentialité et vos droits" : "Privacy and your rights (French)"}</a></p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={90}>
            <ul className="grid h-full gap-3">
              {entries.map((entry) => {
                const external = entry.href?.startsWith("http")
                const copied = copiedKey === entry.key

                return (
                  <li
                    key={entry.key}
                    className="edge-light surface-card group flex items-center gap-4 bg-surface-1/70 p-4 backdrop-blur transition-colors duration-200 hover:border-border-strong"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-surface-2 text-accent-bright">
                      <entry.Icon className="h-4 w-4" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="section-index">{entry.label}</p>
                      {entry.href ? (
                        <a
                          href={entry.href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noopener noreferrer" : undefined}
                          className="inline-flex items-center gap-1.5 truncate text-sm font-medium transition-colors hover:text-accent-bright"
                        >
                          {entry.value}
                          {external ? <ArrowUpRight className="h-3 w-3 shrink-0 opacity-60" /> : null}
                        </a>
                      ) : (
                        <p className="text-sm font-medium leading-relaxed">{entry.value}</p>
                      )}
                    </div>

                    {entry.copyValue ? (
                      <button
                        type="button"
                        onClick={() => copy(entry)}
                        aria-label={`${t.contact.copy} ${entry.label}`}
                        className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-border bg-surface-2 text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent-bright"
                      >
                        {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                      </button>
                    ) : null}
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
