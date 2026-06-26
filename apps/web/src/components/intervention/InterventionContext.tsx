'use client'

import { Icon, type IconName } from '@/components/primitives/Icon'
import { Avatar } from '@/components/primitives/Avatar'
import {
  RECENT_REPORTS, LINKED_DECISIONS, UPCOMING_REVIEWS, TEAM_MEMBERS,
} from '@/lib/mock/intervention'
import styles from '@/components/portfolio/PortfolioContext.module.css'

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
    <li><button type="button" className={styles.row}>
      <Icon name={icon} size={15} className={styles.icon} />
      <span className={styles.label}>{label}{context && <span className={styles.sub}>{context}</span>}</span>
    </button></li>
  )
}

export function InterventionContext() {
  return (
    <aside className={styles.sidebar} aria-label="Supporting context">
      <Group title="Team">
        {TEAM_MEMBERS.map((t) => (
          <li key={t.id}><button type="button" className={styles.row}>
            <Avatar name={t.label} size="xs" />
            <span className={styles.label}>{t.label}<span className={styles.sub}>{t.context}</span></span>
          </button></li>
        ))}
      </Group>
      <Group title="Upcoming reviews">
        {UPCOMING_REVIEWS.map((r) => <Row key={r.id} icon="calendar" label={r.label} context={r.context} />)}
      </Group>
      <Group title="Linked decisions">
        {LINKED_DECISIONS.map((d) => <Row key={d.id} icon="check-circle" label={d.label} context={d.context} />)}
      </Group>
      <Group title="Recent reports">
        {RECENT_REPORTS.map((r) => <Row key={r.id} icon="document" label={r.label} context={r.context} />)}
      </Group>
    </aside>
  )
}
