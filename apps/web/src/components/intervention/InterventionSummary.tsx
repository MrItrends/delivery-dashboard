'use client'

import { StatusChip, type ObjectStatus } from '@/components/primitives/StatusChip'
import { SummaryStrip } from '@/components/workspace/SummaryStrip'
import type { SummaryMetric } from '@/lib/mock/workspace'
import styles from '@/components/priority-area/PriorityAreaSummary.module.css'

interface Props {
  metrics: SummaryMetric[]
  health: ObjectStatus
  budgetHealth: ObjectStatus
  lastUpdate: string
  loading?: boolean
}

export function InterventionSummary({ metrics, health, budgetHealth, lastUpdate, loading }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.statusRow} role="list" aria-label="Intervention status">
        <div className={styles.statusItem} role="listitem">
          <span className={styles.statusLabel}>Health</span>
          <StatusChip status={health} />
        </div>
        <div className={styles.statusDivider} aria-hidden="true" />
        <div className={styles.statusItem} role="listitem">
          <span className={styles.statusLabel}>Budget</span>
          <StatusChip status={budgetHealth} label={budgetHealth === 'healthy' ? 'On track' : undefined} />
        </div>
        <div className={styles.statusDivider} aria-hidden="true" />
        <div className={styles.statusItem} role="listitem">
          <span className={styles.statusLabel}>Last update</span>
          <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>{lastUpdate}</span>
        </div>
      </div>

      <SummaryStrip metrics={metrics} loading={loading} />
    </div>
  )
}
