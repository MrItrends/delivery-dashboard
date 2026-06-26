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

interface IconProps {
  name: IconName
  size?: number
  className?: string
  'aria-hidden'?: boolean
}

export function Icon({ name, size = 20, className, ...rest }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    className,
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
    default:
      return null
  }
}
