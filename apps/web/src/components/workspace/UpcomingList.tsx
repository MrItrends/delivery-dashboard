'use client'

import type { UpcomingItem } from '@/lib/mock/workspace'
import styles from './UpcomingList.module.css'

const KIND_TONE: Record<UpcomingItem['kind'], string> = {
  Review: styles.review,
  Milestone: styles.milestone,
  Deadline: styles.deadline,
  Funding: styles.funding,
  Meeting: styles.meeting,
}

interface UpcomingListProps {
  items: UpcomingItem[]
  loading?: boolean
}

export function UpcomingList({ items, loading }: UpcomingListProps) {
  if (loading) {
    return (
      <div className={styles.list} aria-hidden="true">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={styles.skeletonRow}>
            <span className={`${styles.skeletonDate} shimmer`} />
            <span className={`${styles.skeletonText} shimmer`} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <ul className={styles.list} role="list">
      {items.map((item) => (
        <li key={item.id} className={styles.row}>
          <span className={styles.date} aria-hidden="true">
            <span className={styles.dateNum}>{item.date}</span>
            <span className={styles.dateDay}>{item.day}</span>
          </span>
          <span className={styles.content}>
            <span className={styles.title}>{item.title}</span>
            <span className={styles.context}>{item.context}</span>
          </span>
          <span className={`${styles.kind} ${KIND_TONE[item.kind]}`}>{item.kind}</span>
        </li>
      ))}
    </ul>
  )
}
