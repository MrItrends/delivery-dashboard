import styles from './StatusChip.module.css'

export type ObjectStatus =
  | 'healthy'
  | 'at-risk'
  | 'critical'
  | 'planned'
  | 'active'
  | 'blocked'
  | 'complete'
  | 'approved'
  | 'draft'
  | 'archived'
  | 'cancelled'

const STATUS_LABELS: Record<ObjectStatus, string> = {
  'healthy':   'Healthy',
  'at-risk':   'At Risk',
  'critical':  'Critical',
  'planned':   'Planned',
  'active':    'Active',
  'blocked':   'Blocked',
  'complete':  'Complete',
  'approved':  'Approved',
  'draft':     'Draft',
  'archived':  'Archived',
  'cancelled': 'Cancelled',
}

const STATUS_STYLE_MAP: Record<ObjectStatus, string> = {
  'healthy':   styles.healthy,
  'at-risk':   styles.atRisk,
  'critical':  styles.critical,
  'planned':   styles.planned,
  'active':    styles.active,
  'blocked':   styles.blocked,
  'complete':  styles.complete,
  'approved':  styles.approved,
  'draft':     styles.draft,
  'archived':  styles.archived,
  'cancelled': styles.cancelled,
}

interface StatusChipProps {
  status: ObjectStatus
  label?: string
  size?: 'sm' | 'md'
}

export function StatusChip({ status, label, size = 'md' }: StatusChipProps) {
  const displayLabel = label ?? STATUS_LABELS[status]

  return (
    <span
      className={[
        styles.chip,
        STATUS_STYLE_MAP[status],
        size === 'sm' ? styles.sm : '',
      ]
        .filter(Boolean)
        .join(' ')}
      role="status"
      aria-label={`Status: ${displayLabel}`}
    >
      <span className={styles.dot} aria-hidden="true" />
      {displayLabel}
    </span>
  )
}
