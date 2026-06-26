interface SparklineProps {
  data: number[]
  width?: number
  height?: number
  /** Visual tone of the line. */
  tone?: 'brand' | 'healthy' | 'at-risk' | 'critical' | 'neutral'
  'aria-label'?: string
}

const TONE_COLOR: Record<NonNullable<SparklineProps['tone']>, string> = {
  brand: 'var(--color-brand-500)',
  healthy: 'var(--color-status-healthy-dot)',
  'at-risk': 'var(--color-status-atrisk-dot)',
  critical: 'var(--color-status-critical-dot)',
  neutral: 'var(--color-neutral-400)',
}

/** Minimal line sparkline — no axes, no grid, no fill. Decisions, not decoration. */
export function Sparkline({
  data,
  width = 96,
  height = 28,
  tone = 'brand',
  ...rest
}: SparklineProps) {
  if (data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pad = 2

  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (width - pad * 2)
    const y = height - pad - ((v - min) / range) * (height - pad * 2)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })

  const last = points[points.length - 1]!.split(',')

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      role="img"
      aria-label={rest['aria-label'] ?? 'Trend'}
    >
      <polyline
        points={points.join(' ')}
        stroke={TONE_COLOR[tone]}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={last[0]} cy={last[1]} r={2.2} fill={TONE_COLOR[tone]} />
    </svg>
  )
}
