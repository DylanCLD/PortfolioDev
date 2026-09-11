"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Github, Linkedin, Mail } from "@/components/icons"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export default function Hero() {
  const [displayedText, setDisplayedText] = useState("")
  const { language } = useLanguage()
  const t = translations[language]
  const fullText = t.hero.command

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [fullText])

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-8 md:mb-12">
          <div className="font-mono text-accent mb-4 text-sm md:text-base cursor-blink">{displayedText}</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-pretty">{t.hero.title}</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">{t.hero.subtitle}</p>
          <p className="text-lg text-muted-foreground max-w-2xl mb-12 leading-relaxed">{t.hero.description}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-12">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 group"
          >
            {t.hero.exploreCTA}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors duration-300"
          >
            {t.hero.contactCTA}
          </a>
        </div>

        <div className="flex gap-6">
          <a
            href="https://github.com/DylanClochard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-colors"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com/in/dylan-clochard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-colors"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:dylan.clochard@mail.com"
            className="text-muted-foreground hover:text-accent transition-colors"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  )
}
