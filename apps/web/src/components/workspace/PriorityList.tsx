'use client'

import { StatusChip } from '@/components/primitives/StatusChip'
import { Icon } from '@/components/primitives/Icon'
import type { PriorityItem } from '@/lib/mock/workspace'
import styles from './PriorityList.module.css'

interface PriorityListProps {
  items: PriorityItem[]
  onSelect?: (item: PriorityItem) => void
  loading?: boolean
}

const TONE: Record<string, string> = {
  critical: styles.critical,
  blocked: styles.critical,
  'at-risk': styles.warning,
  active: styles.info,
}

export function PriorityList({ items, onSelect, loading }: PriorityListProps) {
  if (loading) {
    return (
      <div className={styles.list} aria-hidden="true">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={styles.skeletonRow}>
            <span className={`${styles.skeletonIcon} shimmer`} />
            <span className={`${styles.skeletonText} shimmer`} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <ul className={styles.list} role="list">
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            className={styles.row}
            onClick={() => onSelect?.(item)}
          >
            <span className={`${styles.icon} ${TONE[item.status] ?? styles.info}`} aria-hidden="true">
              <Icon name={item.icon} size={18} />
            </span>

            <span className={styles.content}>
              <span className={styles.topLine}>
                <span className={styles.kind}>{item.kind}</span>
                <StatusChip status={item.status} size="sm" />
              </span>
              <span className={styles.title}>{item.title}</span>
              <span className={styles.context}>{item.context}</span>
            </span>

            <span className={styles.action}>
              {item.action}
              <Icon name="arrow-right" size={15} className={styles.actionIcon} />
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}
