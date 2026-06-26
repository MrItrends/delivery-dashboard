'use client'

import type { SummaryMetric } from '@/lib/mock/workspace'
import styles from './SummaryStrip.module.css'

interface SummaryStripProps {
  metrics: SummaryMetric[]
  onSelect?: (metric: SummaryMetric) => void
  loading?: boolean
}

export function SummaryStrip({ metrics, onSelect, loading }: SummaryStripProps) {
  if (loading) {
    return (
      <div className={styles.strip} aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.item}>
            <span className={`${styles.skeletonValue} shimmer`} />
            <span className={`${styles.skeletonLabel} shimmer`} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={styles.strip} role="list" aria-label="Operational summary">
      {metrics.map((metric) => {
        const interactive = !!onSelect && !!metric.bucket
        const Tag = interactive ? 'button' : 'div'
        return (
          <Tag
            key={metric.id}
            role="listitem"
            className={`${styles.item} ${interactive ? styles.interactive : ''}`}
            onClick={interactive ? () => onSelect?.(metric) : undefined}
            {...(interactive ? { type: 'button' as const } : {})}
          >
            <span className={styles.valueRow}>
              <span className={`${styles.dot} ${styles[metric.tone]}`} aria-hidden="true" />
              <span className={styles.value}>{metric.value}</span>
            </span>
            <span className={styles.label}>{metric.label}</span>
          </Tag>
        )
      })}
    </div>
  )
}
