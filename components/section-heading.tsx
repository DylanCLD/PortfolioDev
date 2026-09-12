import type { ReactNode } from "react"
import { Reveal } from "@/components/reveal"

interface SectionHeadingProps {
  /** Two-digit section number, e.g. "02". */
  index: string
  title: string
  lead?: string
  /** Optional controls rendered on the right at desktop width. */
  aside?: ReactNode
}

export function SectionHeading({ index, title, lead, aside }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="section-index mb-3 flex items-center gap-3">
            <span className="text-accent-bright">{index}</span>
            <span aria-hidden="true" className="h-px w-10 bg-border-strong" />
            <span>{title}</span>
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-[2.75rem] md:leading-[1.1]">
            {lead ?? title}
          </h2>
        </div>
        {aside ? <div className="shrink-0">{aside}</div> : null}
      </div>
    </Reveal>
  )
}
