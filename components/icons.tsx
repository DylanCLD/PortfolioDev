// Simple icon components as replacements for lucide-react
export const Terminal = (props: { className?: string }) => (
  <svg className={props.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
)

export const Menu = (props: { className?: string; size?: number }) => (
  <svg
    className={props.className}
    width={props.size}
    height={props.size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
)

export const X = (props: { className?: string; size?: number }) => (
  <svg
    className={props.className}
    width={props.size}
    height={props.size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export const ArrowRight = (props: { className?: string; width?: number; height?: number }) => (
  <svg
    className={props.className}
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

export const Github = (props: { className?: string; width?: number; height?: number }) => (
  <svg
    className={props.className}
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c2.6-.4 5.2-1.2 5.2-7A5.7 5.7 0 0 0 20 4.77 5.7 5.7 0 0 0 20 .88a.75.75 0 0 0-.75.75v.001a6 6 0 0 1-1.5 3.697A6 6 0 0 1 9 1.254a.75.75 0 0 0-.75.698v.001A5.7 5.7 0 0 0 7.5 4.77a5.7 5.7 0 0 0 .5 2.3c.26 1 .16 1.7-.5 2.47-.3.36-.7 1-.7 2.5 0 1.42.84 2.4 2.04 2.75.17.03.34.06.51.06h7.75" />
  </svg>
)

export const Linkedin = (props: { className?: string; width?: number; height?: number }) => (
  <svg
    className={props.className}
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6 z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

export const Mail = (props: { className?: string; width?: number; height?: number }) => (
  <svg
    className={props.className}
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

export const Code2 = (props: { className?: string; width?: number; height?: number }) => (
  <svg
    className={props.className}
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 21l-8-8 8-8" />
    <path d="M6 21l8-8-8-8" />
  </svg>
)

export const Zap = (props: { className?: string; width?: number; height?: number }) => (
  <svg
    className={props.className}
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

export const Gamepad2 = (props: { className?: string; width?: number; height?: number }) => (
  <svg
    className={props.className}
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="6" y1="12" x2="12" y2="12" />
    <line x1="9" y1="9" x2="9" y2="15" />
    <circle cx="17" cy="11" r="1" />
    <circle cx="17" cy="16" r="1" />
    <path d="M5 8c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
    <path d="M19 8c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z" />
  </svg>
)

export const ExternalLink = (props: { className?: string; width?: number; height?: number }) => (
  <svg
    className={props.className}
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

export const Phone = (props: { className?: string; width?: number; height?: number }) => (
  <svg
    className={props.className}
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

export const MapPin = (props: { className?: string; width?: number; height?: number }) => (
  <svg
    className={props.className}
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

export const ChevronLeft = (props: { className?: string; width?: number; height?: number }) => (
  <svg
    className={props.className}
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

export const ChevronRight = (props: { className?: string; width?: number; height?: number }) => (
  <svg
    className={props.className}
    width={props.width}
    height={props.height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
)
