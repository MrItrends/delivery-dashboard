'use client'

import { StatusChip, type ObjectStatus } from '@/components/primitives/StatusChip'
import { SummaryStrip } from '@/components/workspace/SummaryStrip'
import type { SummaryMetric } from '@/lib/mock/workspace'
import styles from '@/components/priority-area/PriorityAreaSummary.module.css'

interface Props {
  metrics: SummaryMetric[]
  health: ObjectStatus
  deliveryConfidence: ObjectStatus
  budgetHealth: ObjectStatus
  loading?: boolean
}

const CONFIDENCE_LABEL: Partial<Record<ObjectStatus, string>> = {
  healthy: 'High',
  'at-risk': 'Medium',
  critical: 'Low',
}

export function ProgrammeSummary({ metrics, health, deliveryConfidence, budgetHealth, loading }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.statusRow} role="list" aria-label="Programme status">
        <div className={styles.statusItem} role="listitem">
          <span className={styles.statusLabel}>Programme health</span>
          <StatusChip status={health} />
        </div>
        <div className={styles.statusDivider} aria-hidden="true" />
        <div className={styles.statusItem} role="listitem">
          <span className={styles.statusLabel}>Delivery confidence</span>
          <StatusChip status={deliveryConfidence} label={CONFIDENCE_LABEL[deliveryConfidence]} />
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
