"use client"

import { useEffect, useState } from "react"
import { usePrefersReducedMotion, useTypewriter } from "@/components/hero"
import { ArrowUpRight, Github, Linkedin, Mail } from "@/components/icons"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export default function PremiumHero() {
  const { language } = useLanguage()
  const t = translations[language]
  const fr = language === "fr"
  const reducedMotion = usePrefersReducedMotion()
  const command = useTypewriter(t.hero.command, !reducedMotion)
  const [roleIndex, setRoleIndex] = useState(0)
  useEffect(() => {
    setRoleIndex(0)
    if (reducedMotion) return
    const timer = window.setInterval(() => setRoleIndex(i => (i + 1) % t.hero.roles.length), 2800)
    return () => window.clearInterval(timer)
  }, [t.hero.roles, reducedMotion])
  return (
    <section className="premium-hero" aria-label={fr ? "Présentation" : "Introduction"}>
      <div className="premium-hero-inner">
        <div className="premium-eyebrow"><span>DYLAN CLOCHARD / PORTFOLIO</span><span className="premium-location"><span>{fr ? "MARSEILLE, FRANCE" : "BASED IN MARSEILLE"}</span><span className="premium-license">{fr ? "PERMIS B" : "CATEGORY B LICENCE"}</span></span></div>
        <div className="premium-composition">
          <div className="premium-intro">
            <p className="premium-availability"><span aria-hidden="true" />{t.hero.available}</p>
            <p className="premium-command">{command}</p>
            <h1><span>Dylan</span> <span>Clochard<span className="name-stop">.</span></span></h1>
            <p className="premium-role">{t.hero.roles[roleIndex]}</p>
            <p className="premium-description">{t.hero.description}</p>
            <div className="premium-actions"><a className="premium-primary" href="#projects">{t.hero.exploreCTA}<ArrowUpRight className="h-4 w-4" /></a><a className="premium-secondary" href="#contact">{t.hero.contactCTA}</a></div>
          </div>
          <div className="premium-visual">
            <aside className="premium-profile" aria-label={t.hero.terminal.title}>
              <header><span className="terminal-dots" aria-hidden="true"><span /><span /><span /></span>{t.hero.terminal.title}</header>
              <div className="premium-profile-body">
                <p><span>dylan@iscod:~$ </span>{t.hero.terminal.command}</p>
                <dl>{(["role", "school", "location", "focus", "status"] as const).map(key => <div key={key}><dt>{key}</dt><dd className={key === "status" ? "terminal-status" : undefined}>{t.hero.terminal[key]}</dd></div>)}</dl>
              </div>
            </aside>
          </div>
        </div>
        <div className="premium-hero-foot">
          <div className="premium-domains"><span>WEB & MOBILE</span><span>GAME DEVELOPMENT</span><span>BACKEND & IA</span></div>
          <div className="premium-socials"><a href="https://github.com/DylanCLD" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github className="h-4 w-4" /></a><a href="https://www.linkedin.com/in/dylan-clochard-75095b335" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a><a href="mailto:dylanclochard@gmail.com" aria-label="Email"><Mail className="h-4 w-4" /></a></div>
        </div>
        <div className="premium-facts"><span>ISCOD — Bachelor Web & IA</span><dl><div><dt>{t.hero.metrics.projects}</dt><dd>9</dd></div><div><dt>{t.hero.metrics.languages}</dt><dd>10</dd></div><div><dt>{t.hero.metrics.internship}</dt><dd>3</dd></div></dl><a href="#about">{t.hero.scrollHint} ↓</a></div>
      </div>
    </section>
  )
}
