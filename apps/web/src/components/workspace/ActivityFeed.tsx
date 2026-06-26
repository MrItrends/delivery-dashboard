'use client'

import { Avatar } from '@/components/primitives/Avatar'
import { Icon, type IconName } from '@/components/primitives/Icon'
import type { FeedEntry } from '@/lib/mock/workspace'
import styles from './ActivityFeed.module.css'

const KIND_ICON: Record<FeedEntry['kind'], IconName> = {
  assignment: 'arrow-right',
  status: 'check-circle',
  comment: 'mail',
  evidence: 'shield',
  approval: 'check',
  report: 'clock',
}

interface ActivityFeedProps {
  entries: FeedEntry[]
  loading?: boolean
}

export function ActivityFeed({ entries, loading }: ActivityFeedProps) {
  if (loading) {
    return (
      <div className={styles.feed} aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={styles.skeletonRow}>
            <span className={`${styles.skeletonAvatar} shimmer`} />
            <span className={`${styles.skeletonLine} shimmer`} />
          </div>
        ))}
      </div>
    )
  }

  // group preserving order
  const groups: { label: string; items: FeedEntry[] }[] = []
  for (const entry of entries) {
    let group = groups.find((g) => g.label === entry.group)
    if (!group) {
      group = { label: entry.group, items: [] }
      groups.push(group)
    }
    group.items.push(entry)
  }

  return (
    <div className={styles.feed} role="feed" aria-label="Recent activity">
      {groups.map((group) => (
        <section key={group.label} className={styles.group} aria-label={group.label}>
          <h3 className={styles.groupLabel}>{group.label}</h3>
          <ul className={styles.list} role="list">
            {group.items.map((entry) => (
              <li key={entry.id} className={styles.entry} role="article">
                <span className={styles.rail} aria-hidden="true">
                  <Avatar name={entry.actor} size="xs" />
                </span>
                <span className={styles.body}>
                  <span className={styles.text}>
                    <span className={styles.actor}>{entry.actor}</span>{' '}
                    {entry.action}{' '}
                    <span className={styles.target}>{entry.target}</span>
                  </span>
                  <span className={styles.meta}>
                    <Icon name={KIND_ICON[entry.kind]} size={12} className={styles.metaIcon} />
                    {entry.context} · {entry.time}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
