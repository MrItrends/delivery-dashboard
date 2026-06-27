// =============================================================================
// ICON — Stroke style, 1.5px, currentColor.
// Stand-in set matching the Hugeicons stroke direction until the library is
// wired. All icons share the same 24x24 grid, round caps/joins, no fills.
// =============================================================================

export type IconName =
  | 'mail'
  | 'lock'
  | 'eye'
  | 'eye-off'
  | 'check'
  | 'check-circle'
  | 'alert-circle'
  | 'alert-triangle'
  | 'arrow-left'
  | 'arrow-right'
  | 'shield'
  | 'clock'
  | 'link-broken'
  | 'google'
  | 'microsoft'
  | 'spinner'
  // Frame / navigation
  | 'home'
  | 'grid'
  | 'target'
  | 'folder'
  | 'layers'
  | 'calendar'
  | 'document'
  | 'search'
  | 'users'
  | 'bell'
  | 'settings'
  | 'pin'
  | 'plus'
  | 'chevron-down'
  | 'chevron-right'
  | 'menu'
  | 'more-horizontal'
  | 'logout'
  | 'sliders'
  | 'keyboard'
  | 'building'
  | 'sun'
  | 'inbox'

interface IconProps {
  name: IconName
  size?: number
  className?: string
  style?: React.CSSProperties
  'aria-hidden'?: boolean
}

export function Icon({ name, size = 20, className, style, ...rest }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    className,
    style,
    'aria-hidden': rest['aria-hidden'] ?? true,
    focusable: false as const,
  }

  const stroke = {
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (name) {
    case 'mail':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" {...stroke} />
          <path d="m4 7 8 6 8-6" {...stroke} />
        </svg>
      )
    case 'lock':
      return (
        <svg {...common}>
          <rect x="5" y="11" width="14" height="9" rx="2" {...stroke} />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" {...stroke} />
        </svg>
      )
    case 'eye':
      return (
        <svg {...common}>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" {...stroke} />
          <circle cx="12" cy="12" r="3" {...stroke} />
        </svg>
      )
    case 'eye-off':
      return (
        <svg {...common}>
          <path d="M10.7 6.2A9.9 9.9 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-2.2 3" {...stroke} />
          <path d="M6.6 7.3A16.6 16.6 0 0 0 2 12s3.5 7 10 7a9.6 9.6 0 0 0 4.4-1.1" {...stroke} />
          <path d="m4 4 16 16" {...stroke} />
          <path d="M9.9 10.1a3 3 0 0 0 4 4" {...stroke} />
        </svg>
      )
    case 'check':
      return (
        <svg {...common}>
          <path d="m5 12.5 4.5 4.5L19 7" {...stroke} />
        </svg>
      )
    case 'check-circle':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" {...stroke} />
          <path d="m8.5 12 2.5 2.5 4.5-5" {...stroke} />
        </svg>
      )
    case 'alert-circle':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" {...stroke} />
          <path d="M12 8v5" {...stroke} />
          <circle cx="12" cy="16" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'alert-triangle':
      return (
        <svg {...common}>
          <path d="M12 4 2.5 19.5h19L12 4Z" {...stroke} />
          <path d="M12 10v4" {...stroke} />
          <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'arrow-left':
      return (
        <svg {...common}>
          <path d="M19 12H5" {...stroke} />
          <path d="m11 6-6 6 6 6" {...stroke} />
        </svg>
      )
    case 'arrow-right':
      return (
        <svg {...common}>
          <path d="M5 12h14" {...stroke} />
          <path d="m13 6 6 6-6 6" {...stroke} />
        </svg>
      )
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 3 5 6v6c0 4 3 6.5 7 9 4-2.5 7-5 7-9V6l-7-3Z" {...stroke} />
        </svg>
      )
    case 'clock':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" {...stroke} />
          <path d="M12 7.5V12l3 2" {...stroke} />
        </svg>
      )
    case 'link-broken':
      return (
        <svg {...common}>
          <path d="M9 12h6" {...stroke} />
          <path d="M10 7h4a5 5 0 0 1 0 10h-1" {...stroke} />
          <path d="M14 17h-4a5 5 0 0 1 0-10h1" {...stroke} />
          <path d="m4 3 2 2M4 5l2-2" {...stroke} />
        </svg>
      )
    case 'google':
      // Brand mark — uses its own colors intentionally (not currentColor)
      return (
        <svg {...common} aria-hidden>
          <path d="M21.6 12.2c0-.7-.06-1.2-.18-1.8H12v3.3h5.5a4.7 4.7 0 0 1-2 3.1v2.6h3.2c1.9-1.7 3-4.3 3-7.2Z" fill="#4285F4" />
          <path d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.2H3.1v2.6A10 10 0 0 0 12 22Z" fill="#34A853" />
          <path d="M6.4 13.9a6 6 0 0 1 0-3.8V7.5H3.1a10 10 0 0 0 0 9l3.3-2.6Z" fill="#FBBC05" />
          <path d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8A10 10 0 0 0 3.1 7.5l3.3 2.6c.8-2.4 3-4.2 5.6-4.2Z" fill="#EA4335" />
        </svg>
      )
    case 'microsoft':
      return (
        <svg {...common} aria-hidden>
          <rect x="3" y="3" width="8" height="8" fill="#F25022" />
          <rect x="13" y="3" width="8" height="8" fill="#7FBA00" />
          <rect x="3" y="13" width="8" height="8" fill="#00A4EF" />
          <rect x="13" y="13" width="8" height="8" fill="#FFB900" />
        </svg>
      )
    case 'spinner':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
          <path d="M21 12a9 9 0 0 0-9-9" {...stroke} />
        </svg>
      )
    case 'home':
      return (
        <svg {...common}>
          <path d="M4 11.5 12 5l8 6.5" {...stroke} />
          <path d="M6 10v9h12v-9" {...stroke} />
        </svg>
      )
    case 'grid':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="7" height="7" rx="1.5" {...stroke} />
          <rect x="13" y="4" width="7" height="7" rx="1.5" {...stroke} />
          <rect x="4" y="13" width="7" height="7" rx="1.5" {...stroke} />
          <rect x="13" y="13" width="7" height="7" rx="1.5" {...stroke} />
        </svg>
      )
    case 'target':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" {...stroke} />
          <circle cx="12" cy="12" r="4" {...stroke} />
          <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'folder':
      return (
        <svg {...common}>
          <path d="M4 7a2 2 0 0 1 2-2h3l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z" {...stroke} />
        </svg>
      )
    case 'layers':
      return (
        <svg {...common}>
          <path d="m12 4 8 4-8 4-8-4 8-4Z" {...stroke} />
          <path d="m4 12 8 4 8-4" {...stroke} />
          <path d="m4 16 8 4 8-4" {...stroke} />
        </svg>
      )
    case 'calendar':
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="16" rx="2" {...stroke} />
          <path d="M4 9h16M8 3v4M16 3v4" {...stroke} />
        </svg>
      )
    case 'document':
      return (
        <svg {...common}>
          <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" {...stroke} />
          <path d="M14 3v4h4M9 12h6M9 16h6" {...stroke} />
        </svg>
      )
    case 'search':
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6.5" {...stroke} />
          <path d="m20 20-3.8-3.8" {...stroke} />
        </svg>
      )
    case 'users':
      return (
        <svg {...common}>
          <circle cx="9" cy="9" r="3.2" {...stroke} />
          <path d="M3.5 19a5.5 5.5 0 0 1 11 0" {...stroke} />
          <path d="M16 6.2a3.2 3.2 0 0 1 0 5.6M16.5 13.6a5.5 5.5 0 0 1 4 5.4" {...stroke} />
        </svg>
      )
    case 'bell':
      return (
        <svg {...common}>
          <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" {...stroke} />
          <path d="M10 19a2 2 0 0 0 4 0" {...stroke} />
        </svg>
      )
    case 'settings':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" {...stroke} />
          <path d="M12 3v2.5M12 18.5V21M4.2 7.2l1.8 1M18 15.8l1.8 1M3 12h2.5M18.5 12H21M4.2 16.8l1.8-1M18 8.2l1.8-1" {...stroke} />
        </svg>
      )
    case 'pin':
      return (
        <svg {...common}>
          <path d="M9 4h6l-1 6 3 3H7l3-3-1-6Z" {...stroke} />
          <path d="M12 16v4" {...stroke} />
        </svg>
      )
    case 'plus':
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" {...stroke} />
        </svg>
      )
    case 'chevron-down':
      return (
        <svg {...common}>
          <path d="m6 9 6 6 6-6" {...stroke} />
        </svg>
      )
    case 'chevron-right':
      return (
        <svg {...common}>
          <path d="m9 6 6 6-6 6" {...stroke} />
        </svg>
      )
    case 'menu':
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" {...stroke} />
        </svg>
      )
    case 'more-horizontal':
      return (
        <svg {...common}>
          <circle cx="6" cy="12" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
          <circle cx="18" cy="12" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'logout':
      return (
        <svg {...common}>
          <path d="M14 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8" {...stroke} />
          <path d="M17 8l4 4-4 4M21 12H10" {...stroke} />
        </svg>
      )
    case 'sliders':
      return (
        <svg {...common}>
          <path d="M4 8h10M18 8h2M4 16h2M10 16h10" {...stroke} />
          <circle cx="16" cy="8" r="2" {...stroke} />
          <circle cx="8" cy="16" r="2" {...stroke} />
        </svg>
      )
    case 'keyboard':
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="12" rx="2" {...stroke} />
          <path d="M7 10h.01M11 10h.01M15 10h.01M8 14h8" {...stroke} />
        </svg>
      )
    case 'building':
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="18" rx="1.5" {...stroke} />
          <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h6v6" {...stroke} />
        </svg>
      )
    case 'sun':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4" {...stroke} />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" {...stroke} />
        </svg>
      )
    case 'inbox':
      return (
        <svg {...common}>
          <path d="M4 13l2.5-7h11L20 13v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5Z" {...stroke} />
          <path d="M4 13h5a3 3 0 0 0 6 0h5" {...stroke} />
        </svg>
      )
    default:
      return null
  }
}
