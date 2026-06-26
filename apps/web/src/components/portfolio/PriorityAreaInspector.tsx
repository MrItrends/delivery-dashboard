'use client'

import { useState, useEffect } from 'react'
import { Inspector } from '@/components/overlay/Inspector'
import { Button } from '@/components/primitives/Button'
import { StatusChip } from '@/components/primitives/StatusChip'
import { Avatar } from '@/components/primitives/Avatar'
import type { TabItem } from '@/components/navigation/Tabs'
import type { PriorityAreaRow } from '@/lib/mock/portfolio'
import styles from './PriorityAreaInspector.module.css'

const TABS: TabItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'projects', label: 'Projects' },
  { id: 'budget', label: 'Budget' },
  { id: 'targets', label: 'Targets' },
  { id: 'risks', label: 'Risks' },
  { id: 'discussion', label: 'Discussion' },
  { id: 'files', label: 'Files' },
  { id: 'history', label: 'History' },
  { id: 'metadata', label: 'Metadata' },
]

interface PriorityAreaInspectorProps {
  open: boolean
  area: PriorityAreaRow | null
  onClose: () => void
  onOpenWorkspace: (area: PriorityAreaRow) => void
}

export function PriorityAreaInspector({ open, area, onClose, onOpenWorkspace }: PriorityAreaInspectorProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [expanded, setExpanded] = useState(false)

  useEffect(() => { if (open) setActiveTab('overview') }, [open, area?.id])

  const fields = area
    ? [
        { label: 'Owner', value: (<span className={styles.ownerVal}><Avatar name={area.owner} size="xs" /> {area.owner}</span>) },
        { label: 'Health', value: <StatusChip status={area.health} size="sm" /> },
        { label: 'Projects', value: String(area.projects) },
        { label: 'Budget', value: `${area.budgetPct}% consumed` },
        { label: 'Progress', value: `${area.progress}%` },
        { label: 'Risks', value: `${area.risks} active` },
        { label: 'Milestones', value: `${area.milestonesDone}/${area.milestonesTotal} complete` },
        { label: 'Last updated', value: area.lastUpdated },
      ]
    : []

  return (
    <Inspector
      open={open}
      onClose={onClose}
      width={expanded ? 'expanded' : 'default'}
      onExpand={() => setExpanded((v) => !v)}
      objectType="Priority Area"
      title={area?.name ?? ''}
      status={area?.health}
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onOpenFullPage={() => area && onOpenWorkspace(area)}
      primaryAction={<Button size="sm" variant="primary" onClick={() => area && onOpenWorkspace(area)}>Open workspace</Button>}
    >
      {activeTab === 'overview' && area && (
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
              This priority area groups the projects and interventions delivering against
              a single strategic objective. Open the workspace to manage its projects,
              budget and risks.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className={styles.body}>
          <ul className={styles.simpleList} role="list">
            {['Estate Phase 1', 'Estate Phase 2', 'Decant & Logistics'].map((p) => (
              <li key={p} className={styles.simpleRow}><span>{p}</span><StatusChip status="active" size="sm" /></li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'budget' && (
        <div className={styles.body}>
          <dl className={styles.fields}>
            <div className={styles.fieldRow}><dt className={styles.fieldLabel}>Approved</dt><dd className={styles.fieldValue}>£18.0M</dd></div>
            <div className={styles.fieldRow}><dt className={styles.fieldLabel}>Committed</dt><dd className={styles.fieldValue}>£14.2M</dd></div>
            <div className={styles.fieldRow}><dt className={styles.fieldLabel}>Forecast outturn</dt><dd className={styles.fieldValue}>£18.9M</dd></div>
          </dl>
        </div>
      )}

      {activeTab === 'targets' && (
        <div className={styles.body}>
          <ul className={styles.simpleList} role="list">
            <li className={styles.simpleRow}><span>Bed capacity +12%</span><span className={styles.muted}>On track</span></li>
            <li className={styles.simpleRow}><span>Wait times −18%</span><span className={styles.muted}>At risk</span></li>
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
          <div className={styles.historyRow}><span>Budget forecast updated</span><time>Yesterday</time></div>
          <div className={styles.historyRow}><span>Created</span><time>3 months ago</time></div>
        </div>
      )}
      {activeTab === 'metadata' && (
        <div className={styles.body}>
          <dl className={styles.fields}>
            <div className={styles.fieldRow}><dt className={styles.fieldLabel}>ID</dt><dd className={styles.fieldValue} style={{ fontFamily: 'var(--font-family-mono)' }}>{area?.id}</dd></div>
            <div className={styles.fieldRow}><dt className={styles.fieldLabel}>Portfolio</dt><dd className={styles.fieldValue}>Healthcare Transformation</dd></div>
          </dl>
        </div>
      )}
    </Inspector>
  )
}
