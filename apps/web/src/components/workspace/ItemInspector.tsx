'use client'

import { useState, useEffect } from 'react'
import { Inspector } from '@/components/overlay/Inspector'
import { Button } from '@/components/primitives/Button'
import type { ObjectStatus } from '@/components/primitives/StatusChip'
import type { TabItem } from '@/components/navigation/Tabs'
import styles from './ItemInspector.module.css'

export interface InspectorDetail {
  objectType: string
  title: string
  status: ObjectStatus
  fields: { label: string; value: React.ReactNode }[]
  description?: string
}

interface ItemInspectorProps {
  open: boolean
  detail: InspectorDetail | null
  onClose: () => void
}

const TABS: TabItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'discussion', label: 'Discussion' },
  { id: 'history', label: 'History' },
  { id: 'files', label: 'Files' },
]

export function ItemInspector({ open, detail, onClose }: ItemInspectorProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (open) setActiveTab('overview')
  }, [open, detail?.title])

  return (
    <Inspector
      open={open}
      onClose={onClose}
      width={expanded ? 'expanded' : 'default'}
      onExpand={() => setExpanded((v) => !v)}
      objectType={detail?.objectType ?? 'Item'}
      title={detail?.title ?? ''}
      status={detail?.status}
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onOpenFullPage={() => {}}
      primaryAction={<Button size="sm" variant="primary">Open</Button>}
    >
      {activeTab === 'overview' && detail && (
        <div className={styles.overview}>
          <dl className={styles.fields}>
            {detail.fields.map((f, i) => (
              <div key={i} className={styles.fieldRow}>
                <dt className={styles.fieldLabel}>{f.label}</dt>
                <dd className={styles.fieldValue}>{f.value}</dd>
              </div>
            ))}
          </dl>
          {detail.description && (
            <div className={styles.descriptionBlock}>
              <p className={styles.descriptionLabel}>Description</p>
              <p className={styles.description}>{detail.description}</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'discussion' && (
        <div className={styles.empty}>No comments yet. Start the discussion from the full page.</div>
      )}
      {activeTab === 'history' && (
        <div className={styles.history}>
          <div className={styles.historyRow}><span>Status changed to current</span><time>2h ago</time></div>
          <div className={styles.historyRow}><span>Assigned to owner</span><time>Yesterday</time></div>
          <div className={styles.historyRow}><span>Created</span><time>3 days ago</time></div>
        </div>
      )}
      {activeTab === 'files' && (
        <div className={styles.empty}>No files attached.</div>
      )}
    </Inspector>
  )
}
