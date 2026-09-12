"use client"

// Adapted from Watermelon UI Continuous Tabs.
// Source: https://registry.watermelon.sh/r/continuous-tabs.json
// Local adaptation: controlled selection, semantic buttons, focus and reduced motion.
import { useId } from "react"
import { LayoutGroup, motion, useReducedMotion } from "motion/react"

interface TabItem { id: string; label: string }
interface ContinuousTabsProps { tabs: readonly TabItem[]; activeId: string; onChange: (id: string) => void }

export function ContinuousTabs({ tabs, activeId, onChange }: ContinuousTabsProps) {
  const scope = useId()
  const reduced = useReducedMotion()
  return (
    <LayoutGroup id={scope}>
      <div className="watermelon-tabs">
        {tabs.map(tab => (
          <button key={tab.id} type="button" onClick={() => onChange(tab.id)} aria-pressed={activeId === tab.id}>
            {activeId === tab.id && <motion.span aria-hidden="true" className="watermelon-active" layoutId="active" transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 35 }} />}
            <span className={`style-swatch swatch-${tab.id}`} aria-hidden="true" />
            <span className="watermelon-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </LayoutGroup>
  )
}
