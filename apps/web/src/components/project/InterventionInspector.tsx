'use client'

import { useState, useEffect } from 'react'
import { Inspector } from '@/components/overlay/Inspector'
import { Button } from '@/components/primitives/Button'
import { StatusChip } from '@/components/primitives/StatusChip'
import { Avatar } from '@/components/primitives/Avatar'
import { useToastStore } from '@/stores/useToastStore'
import type { TabItem } from '@/components/navigation/Tabs'
import type { InterventionRow } from '@/lib/mock/project'
import pf from '@/components/portfolio/PriorityAreaInspector.module.css'
import styles from './InterventionInspector.module.css'

const TABS: TabItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'activities', label: 'Activities' },
  { id: 'milestones', label: 'Milestones' },
  { id: 'budget', label: 'Budget' },
  { id: 'targets', label: 'Targets' },
  { id: 'risks', label: 'Risks' },
  { id: 'files', label: 'Files' },
  { id: 'discussion', label: 'Discussion' },
  { id: 'history', label: 'History' },
  { id: 'metadata', label: 'Metadata' },
]

const COMMENTS = [
  { id: 'c1', author: 'Ahmed Yusuf', time: '1h ago', text: 'Steel delivery slipped to next week — flagging as blocked. @Sarah Evans can we escalate?' },
  { id: 'c2', author: 'Sarah Evans', time: '40m ago', text: 'Escalated. Contingency drawdown approved to bring in a second supplier.' },
]

interface InterventionInspectorProps {
  open: boolean
  intervention: InterventionRow | null
  onClose: () => void
  onOpenWorkspace: (i: InterventionRow) => void
}

export function InterventionInspector({ open, intervention, onClose, onOpenWorkspace }: InterventionInspectorProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [expanded, setExpanded] = useState(false)
  const [comment, setComment] = useState('')
  const toast = useToastStore()

  useEffect(() => { if (open) setActiveTab('overview') }, [open, intervention?.id])

  const fields = intervention ? [
    { label: 'Owner', value: (<span className={pf.ownerVal}><Avatar name={intervention.owner} size="xs" /> {intervention.owner}</span>) },
    { label: 'Status', value: <StatusChip status={intervention.status} size="sm" /> },
    { label: 'Health', value: <StatusChip status={intervention.health} size="sm" /> },
    { label: 'Progress', value: `${intervention.progress}%` },
    { label: 'Budget', value: `${intervention.budgetPct}% consumed` },
    { label: 'Activities', value: `${intervention.activities} open` },
    { label: 'Milestones', value: `${intervention.milestonesDone}/${intervention.milestonesTotal} complete` },
    { label: 'Dependencies', value: `${intervention.dependencies}` },
  ] : []

  return (
    <Inspector
      open={open}
      onClose={onClose}
      width={expanded ? 'expanded' : 'default'}
      onExpand={() => setExpanded((v) => !v)}
      objectType="Intervention"
      title={intervention?.name ?? ''}
      status={intervention?.health}
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onOpenFullPage={() => intervention && onOpenWorkspace(intervention)}
      primaryAction={<Button size="sm" variant="primary" onClick={() => intervention && onOpenWorkspace(intervention)}>Open workspace</Button>}
    >
      {activeTab === 'overview' && intervention && (
        <div className={pf.body}>
          <dl className={pf.fields}>
            {fields.map((f, i) => (
              <div key={i} className={pf.fieldRow}><dt className={pf.fieldLabel}>{f.label}</dt><dd className={pf.fieldValue}>{f.value}</dd></div>
            ))}
          </dl>
          <div className={pf.descBlock}>
            <p className={pf.descLabel}>About</p>
            <p className={pf.desc}>This intervention coordinates the activities delivering a discrete part of the programme. Open the workspace to manage its activities, milestones and evidence.</p>
          </div>
        </div>
      )}

      {activeTab === 'activities' && (
        <div className={pf.body}>
          <ul className={pf.simpleList} role="list">
            {['Excavation & piling', 'Steel frame erection', 'Slab pours'].map((p) => (
              <li key={p} className={pf.simpleRow}><span>{p}</span><StatusChip status="active" size="sm" /></li>
            ))}
          </ul>
        </div>
      )}
      {activeTab === 'milestones' && (
        <div className={pf.body}>
          <ul className={pf.simpleList} role="list">
            <li className={pf.simpleRow}><span>Foundations complete</span><StatusChip status="complete" size="sm" /></li>
            <li className={pf.simpleRow}><span>Frame topped out</span><StatusChip status="at-risk" size="sm" /></li>
          </ul>
        </div>
      )}
      {activeTab === 'budget' && (
        <div className={pf.body}>
          <dl className={pf.fields}>
            <div className={pf.fieldRow}><dt className={pf.fieldLabel}>Approved</dt><dd className={pf.fieldValue}>£4.8M</dd></div>
            <div className={pf.fieldRow}><dt className={pf.fieldLabel}>Committed</dt><dd className={pf.fieldValue}>£4.4M</dd></div>
            <div className={pf.fieldRow}><dt className={pf.fieldLabel}>Forecast outturn</dt><dd className={pf.fieldValue}>£5.0M</dd></div>
          </dl>
        </div>
      )}
      {activeTab === 'targets' && (
        <div className={pf.body}><ul className={pf.simpleList} role="list"><li className={pf.simpleRow}><span>Bed capacity contribution</span><span className={pf.muted}>+24 beds</span></li></ul></div>
      )}
      {activeTab === 'risks' && (
        <div className={pf.body}><ul className={pf.simpleList} role="list"><li className={pf.simpleRow}><span>Structural delay</span><StatusChip status="critical" size="sm" /></li></ul></div>
      )}

      {/* Files — evidence (collaboration) */}
      {activeTab === 'files' && (
        <div className={pf.body}>
          <ul className={pf.simpleList} role="list">
            <li className={pf.simpleRow}><span>Structural survey.pdf</span><span className={pf.muted}>Evidence</span></li>
            <li className={pf.simpleRow}><span>Recovery plan v2.docx</span><span className={pf.muted}>Evidence</span></li>
          </ul>
        </div>
      )}

      {/* Discussion — comments + mentions (collaboration) */}
      {activeTab === 'discussion' && (
        <div className={styles.discussion}>
          <ul className={styles.thread} role="list">
            {COMMENTS.map((c) => (
              <li key={c.id} className={styles.comment}>
                <Avatar name={c.author} size="sm" />
                <div className={styles.commentBody}>
                  <div className={styles.commentHead}>
                    <span className={styles.commentAuthor}>{c.author}</span>
                    <span className={styles.commentTime}>{c.time}</span>
                  </div>
                  <p className={styles.commentText}>{renderMentions(c.text)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.composer}>
            <textarea
              className={styles.composerInput}
              placeholder="Add a comment… use @ to mention"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={2}
            />
            <div className={styles.composerActions}>
              <Button size="sm" variant="primary" disabled={!comment.trim()} onClick={() => { setComment(''); toast.success('Comment added') }}>Comment</Button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className={pf.history}>
          <div className={pf.historyRow}><span>Status changed to Blocked</span><time>40m ago</time></div>
          <div className={pf.historyRow}><span>Budget approved · £3.1M</span><time>Yesterday</time></div>
          <div className={pf.historyRow}><span>Created</span><time>3 months ago</time></div>
        </div>
      )}
      {activeTab === 'metadata' && (
        <div className={pf.body}>
          <dl className={pf.fields}>
            <div className={pf.fieldRow}><dt className={pf.fieldLabel}>ID</dt><dd className={pf.fieldValue} style={{ fontFamily: 'var(--font-family-mono)' }}>{intervention?.id}</dd></div>
            <div className={pf.fieldRow}><dt className={pf.fieldLabel}>Project</dt><dd className={pf.fieldValue}>Ward 4 Reconstruction</dd></div>
          </dl>
        </div>
      )}
    </Inspector>
  )
}

/** Highlights @mentions inside comment text. */
function renderMentions(text: string) {
  return text.split(/(@[A-Z][a-z]+ [A-Z][a-z]+)/g).map((part, i) =>
    part.startsWith('@') ? <span key={i} className={styles.mention}>{part}</span> : <span key={i}>{part}</span>
  )
}
