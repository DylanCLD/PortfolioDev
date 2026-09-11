"use client"

import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export default function Footer() {
  const { language } = useLanguage()
  const t = translations[language]
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 px-4 bg-muted/20 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="font-mono font-bold text-lg glow-text">dc.dev</p>
            <p className="text-sm text-muted-foreground mt-1">{t.footer.tagline}</p>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Dylan Clochard. {t.footer.rights}
            </p>
          </div>

          <div className="text-right text-sm text-muted-foreground">
            <p>{t.footer.builtWith}</p>
            <p>{t.footer.hostedOn}</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          <p>{t.footer.motto}</p>
        </div>
      </div>
    </footer>
  )
}
