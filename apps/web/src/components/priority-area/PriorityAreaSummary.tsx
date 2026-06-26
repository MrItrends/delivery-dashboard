'use client'

import { StatusChip, type ObjectStatus } from '@/components/primitives/StatusChip'
import { SummaryStrip } from '@/components/workspace/SummaryStrip'
import type { SummaryMetric } from '@/lib/mock/workspace'
import styles from './PriorityAreaSummary.module.css'

interface Props {
  metrics: SummaryMetric[]
  health: ObjectStatus
  budgetHealth: ObjectStatus
  targetStatus: ObjectStatus
  loading?: boolean
}

const ON_TRACK_LABEL: Partial<Record<ObjectStatus, string>> = {
  healthy: 'On track',
  'at-risk': 'Behind',
  critical: 'Off track',
}

export function PriorityAreaSummary({ metrics, health, budgetHealth, targetStatus, loading }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.statusRow} role="list" aria-label="Strategic status">
        <div className={styles.statusItem} role="listitem">
          <span className={styles.statusLabel}>Overall health</span>
          <StatusChip status={health} />
        </div>
        <div className={styles.statusDivider} aria-hidden="true" />
        <div className={styles.statusItem} role="listitem">
          <span className={styles.statusLabel}>Target</span>
          <StatusChip status={targetStatus} label={ON_TRACK_LABEL[targetStatus]} />
        </div>
        <div className={styles.statusDivider} aria-hidden="true" />
        <div className={styles.statusItem} role="listitem">
          <span className={styles.statusLabel}>Budget</span>
          <StatusChip status={budgetHealth} label={budgetHealth === 'healthy' ? 'On track' : undefined} />
        </div>
      </div>

      <SummaryStrip metrics={metrics} loading={loading} />
    </div>
  )
}
