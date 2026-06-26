'use client'

import { StatusChip } from '@/components/primitives/StatusChip'
import { Icon } from '@/components/primitives/Icon'
import { DEPENDENCIES, type DependencyRow } from '@/lib/mock/intervention'
import styles from './DependencyList.module.css'

const REL_LABEL: Record<DependencyRow['relationship'], string> = {
  blocks: 'blocks', 'blocked by': 'blocked by', 'depends on': 'depends on',
}

export function DependencyList({ loading }: { loading?: boolean }) {
  if (loading) {
    return <div className={styles.list}>{Array.from({ length: 3 }).map((_, i) => <div key={i} className={`${styles.skeleton} shimmer`} />)}</div>
  }

  return (
    <ul className={styles.list} role="list">
      {DEPENDENCIES.map((d) => (
        <li key={d.id} className={`${styles.row} ${d.critical ? styles.critical : ''}`}>
          <span className={styles.from}>{d.from}</span>
          <span className={`${styles.rel} ${styles[`rel_${d.relationship.replace(' ', '-')}`]}`}>
            <Icon name="arrow-right" size={13} />
            {REL_LABEL[d.relationship]}
          </span>
          <span className={styles.to}>
            <span className={styles.toName}>{d.to}</span>
            <span className={styles.toType}>{d.toType}</span>
          </span>
          <StatusChip status={d.status} size="sm" />
          {d.critical && <span className={styles.criticalTag}>Critical path</span>}
        </li>
      ))}
    </ul>
  )
}
