'use client'

import { useState, useEffect } from 'react'
import { Inspector } from '@/components/overlay/Inspector'
import { Button } from '@/components/primitives/Button'
import { StatusChip } from '@/components/primitives/StatusChip'
import { Avatar } from '@/components/primitives/Avatar'
import { Icon } from '@/components/primitives/Icon'
import { useToastStore } from '@/stores/useToastStore'
import type { TabItem } from '@/components/navigation/Tabs'
import type { ActivityRow } from '@/lib/mock/intervention'
import pf from '@/components/portfolio/PriorityAreaInspector.module.css'
import disc from '@/components/project/InterventionInspector.module.css'
import styles from './ActivityInspector.module.css'

const TABS: TabItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'discussion', label: 'Discussion' },
  { id: 'checklist', label: 'Checklist' },
  { id: 'evidence', label: 'Evidence' },
  { id: 'files', label: 'Files' },
  { id: 'history', label: 'History' },
  { id: 'dependencies', label: 'Dependencies' },
  { id: 'approvals', label: 'Approvals' },
  { id: 'metadata', label: 'Metadata' },
]

const INITIAL_CHECKLIST = [
  { id: 'k1', label: 'Confirm delivery window with supplier', done: true },
  { id: 'k2', label: 'Update programme schedule', done: false },
  { id: 'k3', label: 'Notify site team', done: false },
]

const COMMENTS = [
  { id: 'c1', author: 'Ahmed Yusuf', time: '12m ago', text: 'Blocking until we confirm the new date. @Sarah Evans can you chase?' },
  { id: 'c2', author: 'Sarah Evans', time: '8m ago', text: 'On it — escalating to the contingency supplier if no date by EOD.' },
]

interface ActivityInspectorProps {
  open: boolean
  activity: ActivityRow | null
  onClose: () => void
}

export function ActivityInspector({ open, activity, onClose }: ActivityInspectorProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [expanded, setExpanded] = useState(false)
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST)
  const [comment, setComment] = useState('')
  const toast = useToastStore()

  useEffect(() => { if (open) { setActiveTab('overview'); setChecklist(INITIAL_CHECKLIST) } }, [open, activity?.id])

  const done = checklist.filter((c) => c.done).length

  const fields = activity ? [
    { label: 'Owner', value: (<span className={pf.ownerVal}><Avatar name={activity.owner} size="xs" /> {activity.owner}</span>) },
    { label: 'Status', value: <StatusChip status={activity.status} size="sm" /> },
    { label: 'Priority', value: activity.priority[0]!.toUpperCase() + activity.priority.slice(1) },
    { label: 'Due', value: activity.dueLabel },
    { label: 'Progress', value: `${activity.progress}%` },
    { label: 'Dependencies', value: `${activity.dependencies}` },
    { label: 'Evidence', value: `${activity.evidence} files` },
    { label: 'Comments', value: `${activity.comments}` },
  ] : []

  return (
    <Inspector
      open={open}
      onClose={onClose}
      width={expanded ? 'expanded' : 'default'}
      onExpand={() => setExpanded((v) => !v)}
      objectType="Activity"
      title={activity?.name ?? ''}
      status={activity?.status}
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onOpenFullPage={() => {}}
      primaryAction={<Button size="sm" variant="primary" onClick={() => toast.success('Activity saved')}>Save</Button>}
    >
      {activeTab === 'overview' && activity && (
        <div className={pf.body}>
          <dl className={pf.fields}>
            {fields.map((f, i) => (
              <div key={i} className={pf.fieldRow}><dt className={pf.fieldLabel}>{f.label}</dt><dd className={pf.fieldValue}>{f.value}</dd></div>
            ))}
          </dl>
          <div className={pf.descBlock}>
            <p className={pf.descLabel}>Description</p>
            <p className={pf.desc}>This activity is a discrete unit of delivery within the intervention. Edit details, manage its checklist, attach evidence and track approvals here — without leaving the workspace.</p>
          </div>
        </div>
      )}

      {activeTab === 'discussion' && (
        <div className={disc.discussion}>
          <ul className={disc.thread} role="list">
            {COMMENTS.map((c) => (
              <li key={c.id} className={disc.comment}>
                <Avatar name={c.author} size="sm" />
                <div className={disc.commentBody}>
                  <div className={disc.commentHead}><span className={disc.commentAuthor}>{c.author}</span><span className={disc.commentTime}>{c.time}</span></div>
                  <p className={disc.commentText}>{c.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className={disc.composer}>
            <textarea className={disc.composerInput} placeholder="Add a comment… use @ to mention" value={comment} onChange={(e) => setComment(e.target.value)} rows={2} />
            <div className={disc.composerActions}><Button size="sm" variant="primary" disabled={!comment.trim()} onClick={() => { setComment(''); toast.success('Comment added') }}>Comment</Button></div>
          </div>
        </div>
      )}

      {activeTab === 'checklist' && (
        <div className={pf.body}>
          <div className={styles.checklistHead}>
            <span>{done} of {checklist.length} complete</span>
            <span className={styles.checklistBar} aria-hidden="true"><span className={styles.checklistFill} style={{ width: `${(done / checklist.length) * 100}%` }} /></span>
          </div>
          <ul className={styles.checklist} role="list">
            {checklist.map((c) => (
              <li key={c.id}>
                <label className={styles.checkItem}>
                  <input type="checkbox" checked={c.done} onChange={() => setChecklist((list) => list.map((x) => x.id === c.id ? { ...x, done: !x.done } : x))} className={styles.checkbox} />
                  <span className={`${styles.checkBox} ${c.done ? styles.checked : ''}`} aria-hidden="true">{c.done && <Icon name="check" size={12} />}</span>
                  <span className={`${styles.checkLabel} ${c.done ? styles.checkLabelDone : ''}`}>{c.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'evidence' && (
        <div className={pf.body}><ul className={pf.simpleList} role="list">
          <li className={pf.simpleRow}><span>steel-confirmation.pdf</span><span className={pf.muted}>v1</span></li>
        </ul></div>
      )}
      {activeTab === 'files' && <div className={pf.empty}>No files attached.</div>}
      {activeTab === 'history' && (
        <div className={pf.history}>
          <div className={pf.historyRow}><span>Status changed to Blocked</span><time>12m ago</time></div>
          <div className={pf.historyRow}><span>Owner set to Ahmed Yusuf</span><time>Yesterday</time></div>
          <div className={pf.historyRow}><span>Created</span><time>1 week ago</time></div>
        </div>
      )}
      {activeTab === 'dependencies' && (
        <div className={pf.body}><ul className={pf.simpleList} role="list">
          <li className={pf.simpleRow}><span>Blocked by · Confirm steel delivery</span><StatusChip status="blocked" size="sm" /></li>
        </ul></div>
      )}
      {activeTab === 'approvals' && (
        <div className={pf.body}><ul className={pf.simpleList} role="list">
          <li className={pf.simpleRow}><span>Method statement sign-off</span><StatusChip status="approved" size="sm" /></li>
        </ul></div>
      )}
      {activeTab === 'metadata' && (
        <div className={pf.body}><dl className={pf.fields}>
          <div className={pf.fieldRow}><dt className={pf.fieldLabel}>ID</dt><dd className={pf.fieldValue} style={{ fontFamily: 'var(--font-family-mono)' }}>{activity?.id}</dd></div>
          <div className={pf.fieldRow}><dt className={pf.fieldLabel}>Intervention</dt><dd className={pf.fieldValue}>Structural Works</dd></div>
        </dl></div>
      )}
    </Inspector>
  )
}
