"use client"

import { ArrowUp, Github, Linkedin, Mail } from "@/components/icons"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export default function Footer() {
  const { language } = useLanguage()
  const t = translations[language]
  const year = new Date().getFullYear()

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#projects", label: t.nav.projects },
    { href: "#contact", label: t.nav.contact },
  ]

  const socials = [
    { href: "https://github.com/DylanCLD", label: "GitHub", Icon: Github },
    { href: "https://www.linkedin.com/in/dylan-clochard-75095b335", label: "LinkedIn", Icon: Linkedin },
    { href: "mailto:dylanclochard@gmail.com", label: "Email", Icon: Mail },
  ]

  return (
    <footer className="relative border-t border-border bg-surface-1/40 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <p className="font-mono text-base font-semibold">
              dc<span className="text-muted-foreground">.dev</span>
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{t.footer.tagline}</p>
            <p className="mt-5 font-mono text-xs text-muted-foreground">{t.footer.motto}</p>
          </div>

          <nav aria-label={t.footer.navTitle}>
            <h2 className="section-index mb-4">{t.footer.navTitle}</h2>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="section-index mb-4">{t.footer.socialTitle}</h2>
            <ul className="space-y-2.5">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <nav aria-label={language === "fr" ? "Informations légales" : "Legal information"} className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs text-muted-foreground">
          <a href="/mentions-legales">{language === "fr" ? "Mentions légales" : "Legal notice (French)"}</a>
          <a href="/confidentialite">{language === "fr" ? "Confidentialité" : "Privacy (French)"}</a>
          <a href="/conditions-utilisation">{language === "fr" ? "Conditions d’utilisation" : "Terms of use (French)"}</a>
        </nav>

        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-5 border-t border-border pt-7 sm:flex-row">
          <p className="text-center text-xs text-muted-foreground sm:text-left">
            © {year} Dylan Clochard. {t.footer.rights} · {t.footer.builtWith}
          </p>

          <a
            href="#top"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border bg-surface-2 px-3.5 font-mono text-xs text-muted-foreground transition-colors hover:border-accent/60 hover:text-accent-bright"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            {t.footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  )
}
