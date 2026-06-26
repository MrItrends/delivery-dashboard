'use client'

import { StatusChip } from '@/components/primitives/StatusChip'
import { Icon } from '@/components/primitives/Icon'
import {
  WORKSPACE_HEALTH,
  RECENT_REPORTS,
  SAVED_SEARCHES,
  PINNED_PROJECTS,
  ANNOUNCEMENT,
} from '@/lib/mock/workspace'
import styles from './WorkspaceSidebar.module.css'

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={styles.group} aria-label={title}>
      <h3 className={styles.groupTitle}>{title}</h3>
      {children}
    </section>
  )
}

export function WorkspaceSidebar() {
  const total = WORKSPACE_HEALTH.healthy + WORKSPACE_HEALTH.atRisk + WORKSPACE_HEALTH.critical

  return (
    <aside className={styles.sidebar} aria-label="Supporting context">
      {/* Workspace health */}
      <Group title="Workspace health">
        <div className={styles.healthHeader}>
          <StatusChip status={WORKSPACE_HEALTH.overall} />
          <span className={styles.healthTotal}>{total} projects</span>
        </div>
        <div className={styles.healthBar} aria-hidden="true">
          <span className={styles.barHealthy} style={{ flex: WORKSPACE_HEALTH.healthy }} />
          <span className={styles.barAtRisk} style={{ flex: WORKSPACE_HEALTH.atRisk }} />
          <span className={styles.barCritical} style={{ flex: WORKSPACE_HEALTH.critical }} />
        </div>
        <ul className={styles.healthLegend} role="list">
          <li><span className={`${styles.legendDot} ${styles.dotHealthy}`} />{WORKSPACE_HEALTH.healthy} healthy</li>
          <li><span className={`${styles.legendDot} ${styles.dotAtRisk}`} />{WORKSPACE_HEALTH.atRisk} at risk</li>
          <li><span className={`${styles.legendDot} ${styles.dotCritical}`} />{WORKSPACE_HEALTH.critical} critical</li>
        </ul>
      </Group>

      {/* Pinned projects */}
      <Group title="Pinned projects">
        <ul className={styles.linkList} role="list">
          {PINNED_PROJECTS.map((p) => (
            <li key={p.id}>
              <button type="button" className={styles.linkRow}>
                <span className={`${styles.statusDot} ${styles[`dot_${p.status}`] ?? ''}`} aria-hidden="true" />
                <span className={styles.linkLabel}>{p.label}</span>
                <Icon name="arrow-right" size={14} className={styles.linkArrow} />
              </button>
            </li>
          ))}
        </ul>
      </Group>

      {/* Recent reports */}
      <Group title="Recent reports">
        <ul className={styles.linkList} role="list">
          {RECENT_REPORTS.map((r) => (
            <li key={r.id}>
              <button type="button" className={styles.linkRow}>
                <Icon name="clock" size={15} className={styles.linkIcon} />
                <span className={styles.linkLabel}>
                  {r.label}
                  <span className={styles.linkSub}>{r.context}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Group>

      {/* Saved searches */}
      <Group title="Saved searches">
        <ul className={styles.linkList} role="list">
          {SAVED_SEARCHES.map((s) => (
            <li key={s.id}>
              <button type="button" className={styles.linkRow}>
                <Icon name="mail" size={15} className={styles.linkIcon} />
                <span className={styles.linkLabel}>{s.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </Group>

      {/* Announcement */}
      <Group title="Announcement">
        <div className={styles.announcement}>
          <p className={styles.announcementTitle}>{ANNOUNCEMENT.title}</p>
          <p className={styles.announcementBody}>{ANNOUNCEMENT.body}</p>
        </div>
      </Group>
    </aside>
  )
}
