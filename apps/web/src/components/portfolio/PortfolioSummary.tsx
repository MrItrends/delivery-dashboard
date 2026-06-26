'use client'

import { StatusChip, type ObjectStatus } from '@/components/primitives/StatusChip'
import { SummaryStrip } from '@/components/workspace/SummaryStrip'
import type { SummaryMetric } from '@/lib/mock/workspace'
import styles from './PortfolioSummary.module.css'

interface PortfolioSummaryProps {
  metrics: SummaryMetric[]
  health: ObjectStatus
  budgetHealth: ObjectStatus
  riskLevel: ObjectStatus
  loading?: boolean
}

const RISK_LABEL: Partial<Record<ObjectStatus, string>> = {
  healthy: 'Low',
  'at-risk': 'Medium',
  critical: 'High',
}

export function PortfolioSummary({
  metrics,
  health,
  budgetHealth,
  riskLevel,
  loading,
}: PortfolioSummaryProps) {
  return (
    <div className={styles.wrap}>
      {/* Status cluster — health / budget / risk as chips, never gauges */}
      <div className={styles.statusRow} role="list" aria-label="Portfolio status">
        <div className={styles.statusItem} role="listitem">
          <span className={styles.statusLabel}>Overall health</span>
          <StatusChip status={health} />
        </div>
        <div className={styles.statusDivider} aria-hidden="true" />
        <div className={styles.statusItem} role="listitem">
          <span className={styles.statusLabel}>Budget</span>
          <StatusChip status={budgetHealth} label={budgetHealth === 'healthy' ? 'On track' : undefined} />
        </div>
        <div className={styles.statusDivider} aria-hidden="true" />
        <div className={styles.statusItem} role="listitem">
          <span className={styles.statusLabel}>Risk level</span>
          <StatusChip status={riskLevel} label={RISK_LABEL[riskLevel]} />
        </div>
      </div>

      <SummaryStrip metrics={metrics} loading={loading} />
    </div>
  )
}
