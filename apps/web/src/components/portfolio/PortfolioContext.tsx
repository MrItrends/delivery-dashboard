'use client'

import { Icon, type IconName } from '@/components/primitives/Icon'
import {
  RECENT_REPORTS,
  PINNED_SEARCHES,
  PORTFOLIO_DOCUMENTS,
  UPCOMING_REVIEWS,
  RECENT_DECISIONS,
} from '@/lib/mock/portfolio'
import styles from './PortfolioContext.module.css'

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={styles.group} aria-label={title}>
      <h3 className={styles.groupTitle}>{title}</h3>
      <ul className={styles.list} role="list">{children}</ul>
    </section>
  )
}

function Row({ icon, label, context }: { icon: IconName; label: string; context?: string }) {
  return (
    <li>
      <button type="button" className={styles.row}>
        <Icon name={icon} size={15} className={styles.icon} />
        <span className={styles.label}>
          {label}
          {context && <span className={styles.sub}>{context}</span>}
        </span>
      </button>
    </li>
  )
}

export function PortfolioContext() {
  return (
    <aside className={styles.sidebar} aria-label="Supporting context">
      <Group title="Upcoming reviews">
        {UPCOMING_REVIEWS.map((r) => <Row key={r.id} icon="calendar" label={r.label} context={r.context} />)}
      </Group>
      <Group title="Recent decisions">
        {RECENT_DECISIONS.map((d) => <Row key={d.id} icon="check-circle" label={d.label} context={d.context} />)}
      </Group>
      <Group title="Recent reports">
        {RECENT_REPORTS.map((r) => <Row key={r.id} icon="document" label={r.label} context={r.context} />)}
      </Group>
      <Group title="Portfolio documents">
        {PORTFOLIO_DOCUMENTS.map((d) => <Row key={d.id} icon="document" label={d.label} />)}
      </Group>
      <Group title="Pinned searches">
        {PINNED_SEARCHES.map((s) => <Row key={s.id} icon="search" label={s.label} />)}
      </Group>
    </aside>
  )
}
