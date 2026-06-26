'use client'

import { StatusChip } from '@/components/primitives/StatusChip'
import { Avatar } from '@/components/primitives/Avatar'
import { Icon } from '@/components/primitives/Icon'
import { useToastStore } from '@/stores/useToastStore'
import { MILESTONES, type MilestoneRow } from '@/lib/mock/intervention'
import styles from './MilestonesList.module.css'

const GROUP_ORDER: MilestoneRow['group'][] = ['Delayed', 'Upcoming', 'Completed']

export function MilestonesList({ loading }: { loading?: boolean }) {
  const toast = useToastStore()

  if (loading) {
    return (
      <div className={styles.list}>
        {Array.from({ length: 3 }).map((_, i) => <div key={i} className={`${styles.skeleton} shimmer`} />)}
      </div>
    )
  }

  const groups = GROUP_ORDER.map((g) => ({ group: g, items: MILESTONES.filter((m) => m.group === g) })).filter((g) => g.items.length)

  return (
    <div className={styles.list}>
      {groups.map(({ group, items }) => (
        <div key={group} className={styles.group}>
          <p className={styles.groupLabel}>{group}</p>
          <ul role="list">
            {items.map((m) => (
              <li key={m.id} className={styles.row}>
                <span className={`${styles.diamond} ${styles[`d_${m.status}`]}`} aria-hidden="true" />
                <span className={styles.main}>
                  <span className={styles.name}>{m.name}</span>
                  {m.dependency && <span className={styles.dep}>depends on {m.dependency}</span>}
                </span>
                <span className={styles.owner}><Avatar name={m.owner} size="xs" /><span className={styles.ownerName}>{m.owner}</span></span>
                <span className={styles.due}>{m.due}</span>
                <StatusChip status={m.status} size="sm" />
                <span className={styles.actions}>
                  {m.status !== 'complete' && (
                    <button type="button" className={styles.actionBtn} aria-label="Approve milestone" onClick={() => toast.success('Milestone approved')}><Icon name="check" size={15} /></button>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
