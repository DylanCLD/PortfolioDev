import Link from "next/link"
import type { ReactNode } from "react"

export function LegalShell({ title, children }: { title: string; children: ReactNode }) {
  return <>
    <div className="mx-auto flex max-w-4xl items-center justify-between border-b border-border px-6 py-6">
      <Link href="/" className="font-mono font-semibold" aria-label="Retour au portfolio de Dylan Clochard">dc.dev</Link>
      <Link href="/" className="text-sm text-muted-foreground">Retour au portfolio</Link>
    </div>
    <main lang="fr" id="main" className="legal-page mx-auto max-w-4xl px-6 py-16">
      <p className="mb-4 font-mono text-xs text-muted-foreground">INFORMATIONS DU SITE · 12 SEPTEMBRE 2026</p>
      <h1 className="mb-12 text-4xl font-medium tracking-tight sm:text-5xl">{title}</h1>
      {children}
    </main>
    <nav aria-label="Informations légales" className="mx-auto flex max-w-4xl flex-wrap gap-6 border-t border-border px-6 py-8 text-sm text-muted-foreground">
      <Link href="/mentions-legales">Mentions légales</Link><Link href="/confidentialite">Confidentialité</Link><Link href="/conditions-utilisation">Conditions d’utilisation</Link>
    </nav>
  </>
}
