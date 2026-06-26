'use client'

import { useState, useEffect } from 'react'
import { Inspector } from '@/components/overlay/Inspector'
import { Button } from '@/components/primitives/Button'
import { StatusChip } from '@/components/primitives/StatusChip'
import { Avatar } from '@/components/primitives/Avatar'
import type { TabItem } from '@/components/navigation/Tabs'
import type { ProjectRow } from '@/lib/mock/priorityArea'
import styles from '@/components/portfolio/PriorityAreaInspector.module.css'

const TABS: TabItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'interventions', label: 'Interventions' },
  { id: 'budget', label: 'Budget' },
  { id: 'targets', label: 'Targets' },
  { id: 'risks', label: 'Risks' },
  { id: 'discussion', label: 'Discussion' },
  { id: 'files', label: 'Files' },
  { id: 'history', label: 'History' },
  { id: 'metadata', label: 'Metadata' },
]

interface ProjectInspectorProps {
  open: boolean
  project: ProjectRow | null
  onClose: () => void
  onOpenWorkspace: (p: ProjectRow) => void
}

export function ProjectInspector({ open, project, onClose, onOpenWorkspace }: ProjectInspectorProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [expanded, setExpanded] = useState(false)

  useEffect(() => { if (open) setActiveTab('overview') }, [open, project?.id])

  const fields = project ? [
    { label: 'Owner', value: (<span className={styles.ownerVal}><Avatar name={project.owner} size="xs" /> {project.owner}</span>) },
    { label: 'Health', value: <StatusChip status={project.health} size="sm" /> },
    { label: 'Progress', value: `${project.progress}%` },
    { label: 'Budget', value: `${project.budgetPct}% consumed` },
    { label: 'Milestones', value: `${project.milestonesDone}/${project.milestonesTotal} complete` },
    { label: 'Open risks', value: `${project.risks}` },
    { label: 'Target contribution', value: `${project.contribution}%` },
    { label: 'Last updated', value: project.lastUpdated },
  ] : []

  return (
    <Inspector
      open={open}
      onClose={onClose}
      width={expanded ? 'expanded' : 'default'}
      onExpand={() => setExpanded((v) => !v)}
      objectType="Project"
      title={project?.name ?? ''}
      status={project?.health}
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onOpenFullPage={() => project && onOpenWorkspace(project)}
      primaryAction={<Button size="sm" variant="primary" onClick={() => project && onOpenWorkspace(project)}>Open workspace</Button>}
    >
      {activeTab === 'overview' && project && (
        <div className={styles.body}>
          <dl className={styles.fields}>
            {fields.map((f, i) => (
              <div key={i} className={styles.fieldRow}>
                <dt className={styles.fieldLabel}>{f.label}</dt>
                <dd className={styles.fieldValue}>{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className={styles.descBlock}>
            <p className={styles.descLabel}>About</p>
            <p className={styles.desc}>
              This project delivers interventions contributing to the priority area&rsquo;s
              strategic target. Open the workspace to manage its interventions, budget and risks.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'interventions' && (
        <div className={styles.body}>
          <ul className={styles.simpleList} role="list">
            {['Structural works', 'M&E installation', 'Commissioning'].map((p) => (
              <li key={p} className={styles.simpleRow}><span>{p}</span><StatusChip status="active" size="sm" /></li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'budget' && (
        <div className={styles.body}>
          <dl className={styles.fields}>
            <div className={styles.fieldRow}><dt className={styles.fieldLabel}>Approved</dt><dd className={styles.fieldValue}>£6.2M</dd></div>
            <div className={styles.fieldRow}><dt className={styles.fieldLabel}>Committed</dt><dd className={styles.fieldValue}>£5.6M</dd></div>
            <div className={styles.fieldRow}><dt className={styles.fieldLabel}>Forecast outturn</dt><dd className={styles.fieldValue}>£6.5M</dd></div>
          </dl>
        </div>
      )}

      {activeTab === 'targets' && (
        <div className={styles.body}>
          <ul className={styles.simpleList} role="list">
            <li className={styles.simpleRow}><span>Bed capacity contribution</span><span className={styles.muted}>+28%</span></li>
            <li className={styles.simpleRow}><span>Estate condition</span><span className={styles.muted}>On track</span></li>
          </ul>
        </div>
      )}

      {activeTab === 'risks' && (
        <div className={styles.body}>
          <ul className={styles.simpleList} role="list">
            <li className={styles.simpleRow}><span>Construction delay</span><StatusChip status="critical" size="sm" /></li>
            <li className={styles.simpleRow}><span>Supplier capacity</span><StatusChip status="at-risk" size="sm" /></li>
          </ul>
        </div>
      )}

      {activeTab === 'discussion' && <div className={styles.empty}>No comments yet.</div>}
      {activeTab === 'files' && <div className={styles.empty}>No files attached.</div>}
      {activeTab === 'history' && (
        <div className={styles.history}>
          <div className={styles.historyRow}><span>Health changed to current</span><time>2h ago</time></div>
          <div className={styles.historyRow}><span>Milestone achieved</span><time>Yesterday</time></div>
          <div className={styles.historyRow}><span>Created</span><time>2 months ago</time></div>
        </div>
      )}
      {activeTab === 'metadata' && (
        <div className={styles.body}>
          <dl className={styles.fields}>
            <div className={styles.fieldRow}><dt className={styles.fieldLabel}>ID</dt><dd className={styles.fieldValue} style={{ fontFamily: 'var(--font-family-mono)' }}>{project?.id}</dd></div>
            <div className={styles.fieldRow}><dt className={styles.fieldLabel}>Priority area</dt><dd className={styles.fieldValue}>Hospital Estate Renewal</dd></div>
          </dl>
        </div>
      )}
    </Inspector>
  )
}
