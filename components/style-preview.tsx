"use client"

import { useEffect, useState } from "react"
import "@/app/style-preview.css"
import { ContinuousTabs } from "@/components/continuous-tabs"

const styles = [
  { id: "obsidian", name: "01 — Obsidian", description: "Graphite & argent · onde sculpturale, composition ouverte" },
  { id: "blueprint", name: "02 — Blueprint", description: "Bleu acier · atelier de code, démonstration interactive" },
  { id: "nocturne", name: "03 — Nocturne", description: "Noir & champagne · typographie ample, rythme cinématographique" },
  { id: "original", name: "Actuel", description: "La version Git, pour comparer" },
] as const

type StyleId = (typeof styles)[number]["id"]

/** Local review tool. Home only mounts it in development. */
export default function StylePreview() {
  const [selected, setSelected] = useState<StyleId>("obsidian")
  const [expanded, setExpanded] = useState(true)

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("style")
    const initial = styles.find((style) => style.id === requested)?.id ?? "obsidian"
    setSelected(initial)
    document.documentElement.dataset.visualStyle = initial
    return () => { delete document.documentElement.dataset.visualStyle }
  }, [])

  function select(id: StyleId) {
    setSelected(id)
    document.documentElement.dataset.visualStyle = id
    const url = new URL(window.location.href)
    url.searchParams.set("style", id)
    window.history.replaceState(null, "", url)
  }

  return (
    <aside className="style-preview" aria-label="Comparaison des directions visuelles">
      <div className="style-preview-header">
        <span>Aperçu local <span aria-hidden="true">/</span> Directions visuelles</span>
        <button type="button" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls="style-options">
          {expanded ? "Réduire" : "Comparer les styles"}
        </button>
      </div>
      <div id="style-options" hidden={!expanded}>
        <div className="style-preview-options" role="group" aria-label="Choisir un style">
          <ContinuousTabs tabs={styles.map(style => ({ id: style.id, label: style.name }))} activeId={selected} onChange={id => select(id as StyleId)} />
        </div>
        <p aria-live="polite">{styles.find((style) => style.id === selected)?.description}</p>
      </div>
    </aside>
  )
}
