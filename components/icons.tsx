import type { SVGProps } from "react"

/**
 * Hand-rolled icon set (24x24 stroke grid, Lucide geometry) so the bundle
 * stays free of an icon library. Every icon shares one base so stroke width,
 * joins and caps are identical across the site.
 *
 * Icons are decorative by default (aria-hidden). Pass `aria-hidden={false}`
 * plus a title when an icon is the only label for a control.
 */
export type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Icon({ size, children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

export const Terminal = (p: IconProps) => (
  <Icon {...p}>
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </Icon>
)

export const Menu = (p: IconProps) => (
  <Icon {...p}>
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </Icon>
)

export const X = (p: IconProps) => (
  <Icon {...p}>
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </Icon>
)

export const ArrowRight = (p: IconProps) => (
  <Icon {...p}>
    <line x1="4" y1="12" x2="19" y2="12" />
    <polyline points="13 6 19 12 13 18" />
  </Icon>
)

export const ArrowUpRight = (p: IconProps) => (
  <Icon {...p}>
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="8 7 17 7 17 16" />
  </Icon>
)

export const ArrowDown = (p: IconProps) => (
  <Icon {...p}>
    <line x1="12" y1="4" x2="12" y2="19" />
    <polyline points="6 13 12 19 18 13" />
  </Icon>
)

export const ArrowUp = (p: IconProps) => (
  <Icon {...p}>
    <line x1="12" y1="20" x2="12" y2="5" />
    <polyline points="6 11 12 5 18 11" />
  </Icon>
)

export const ChevronLeft = (p: IconProps) => (
  <Icon {...p}>
    <polyline points="14 6 8 12 14 18" />
  </Icon>
)

export const ChevronRight = (p: IconProps) => (
  <Icon {...p}>
    <polyline points="10 6 16 12 10 18" />
  </Icon>
)

export const ChevronDown = (p: IconProps) => (
  <Icon {...p}>
    <polyline points="6 10 12 16 18 10" />
  </Icon>
)

export const ExternalLink = (p: IconProps) => (
  <Icon {...p}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </Icon>
)

export const Github = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 4.5-1.4 4.5-5a4 4 0 0 0-1.1-2.8 3.7 3.7 0 0 0-.1-2.8s-1.2-.3-3.3 1.3a9.4 9.4 0 0 0-5 0C7.4 4.6 6.2 4.9 6.2 4.9a3.7 3.7 0 0 0-.1 2.8A4 4 0 0 0 5 10.5c0 3.6 1.7 4.7 4.5 5-.6.6-.6 1.2-.5 2V21" />
  </Icon>
)

export const Linkedin = (p: IconProps) => (
  <Icon {...p}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </Icon>
)

export const Mail = (p: IconProps) => (
  <Icon {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="3 7 12 13 21 7" />
  </Icon>
)

export const Phone = (p: IconProps) => (
  <Icon {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </Icon>
)

export const MapPin = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </Icon>
)

export const Code2 = (p: IconProps) => (
  <Icon {...p}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </Icon>
)

export const Zap = (p: IconProps) => (
  <Icon {...p}>
    <polygon points="13 2 4 14 11 14 10 22 20 10 13 10 13 2" />
  </Icon>
)

export const Gamepad2 = (p: IconProps) => (
  <Icon {...p}>
    <line x1="6" y1="12" x2="10" y2="12" />
    <line x1="8" y1="10" x2="8" y2="14" />
    <line x1="15" y1="13" x2="15.01" y2="13" />
    <line x1="18" y1="11" x2="18.01" y2="11" />
    <rect x="2" y="6" width="20" height="12" rx="5" />
  </Icon>
)

export const Cpu = (p: IconProps) => (
  <Icon {...p}>
    <rect x="5" y="5" width="14" height="14" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
  </Icon>
)

export const Database = (p: IconProps) => (
  <Icon {...p}>
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
    <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
  </Icon>
)

export const Sparkles = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z" />
    <path d="M18 16l.8 2.2L21 19l-2.2.8L18 22l-.8-2.2L15 19l2.2-.8L18 16z" />
  </Icon>
)

export const Layers = (p: IconProps) => (
  <Icon {...p}>
    <polygon points="12 2 22 8 12 14 2 8 12 2" />
    <polyline points="2 13 12 19 22 13" />
  </Icon>
)

export const GraduationCap = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2 9l10-5 10 5-10 5-10-5z" />
    <path d="M6 11.5V17c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.5" />
  </Icon>
)

export const Briefcase = (p: IconProps) => (
  <Icon {...p}>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    <line x1="2" y1="13" x2="22" y2="13" />
  </Icon>
)

export const Copy = (p: IconProps) => (
  <Icon {...p}>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </Icon>
)

export const Check = (p: IconProps) => (
  <Icon {...p}>
    <polyline points="4 13 9 18 20 6" />
  </Icon>
)

export const Download = (p: IconProps) => (
  <Icon {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </Icon>
)

export const Languages = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 5h10" />
    <path d="M8 3v2c0 4.4-2.2 8-5 8" />
    <path d="M5 9c0 2.5 2.5 4.5 6 4.5" />
    <path d="M12 21l4.5-11L21 21" />
    <path d="M14 17h5" />
  </Icon>
)

export const Maximize = (p: IconProps) => (
  <Icon {...p}>
    <polyline points="9 3 3 3 3 9" />
    <polyline points="15 3 21 3 21 9" />
    <polyline points="21 15 21 21 15 21" />
    <polyline points="3 15 3 21 9 21" />
  </Icon>
)
