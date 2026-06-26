'use client'

import { StatusChip } from '@/components/primitives/StatusChip'
import { Sparkline } from '@/components/primitives/Sparkline'
import { Icon } from '@/components/primitives/Icon'
import type { TargetRow } from '@/lib/mock/priorityArea'
import styles from './TargetProgress.module.css'

interface TargetProgressProps {
  targets: TargetRow[]
  loading?: boolean
}

export function TargetProgress({ targets, loading }: TargetProgressProps) {
  if (loading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={styles.cell}>
            <span className={`${styles.skLabel} shimmer`} />
            <span className={`${styles.skValue} shimmer`} />
            <span className={`${styles.skSpark} shimmer`} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={styles.grid} role="list" aria-label="Target progress">
      {targets.map((t) => {
        const tone = t.status === 'healthy' ? 'healthy' : t.status === 'critical' ? 'critical' : 'at-risk'
        const pct = Math.round((t.current / t.target) * 100)
        return (
          <div key={t.id} className={styles.cell} role="listitem">
            <div className={styles.head}>
              <span className={styles.name}>{t.name}</span>
              <StatusChip status={t.status} size="sm" label={t.status === 'healthy' ? 'On track' : t.status === 'critical' ? 'Off track' : 'At risk'} />
            </div>

            <div className={styles.figures}>
              <span className={styles.current}>{t.current.toLocaleString()}<span className={styles.unit}>{t.unit !== '%' ? ` ${t.unit}` : '%'}</span></span>
              <span className={styles.target}>
                <Icon name="target" size={13} className={styles.targetIcon} />
                of {t.target.toLocaleString()}{t.unit === '%' ? '%' : ` ${t.unit}`}
              </span>
            </div>

            <div className={styles.sparkRow}>
              <Sparkline data={t.spark} tone={tone} aria-label={`${t.name} trend`} />
              <span className={styles.pct}>{pct}%</span>
            </div>

            <div className={styles.footer}>
              <span className={styles.forecast}>Forecast: {t.forecast}</span>
              <span className={styles.confidence}>{t.confidence} confidence</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
