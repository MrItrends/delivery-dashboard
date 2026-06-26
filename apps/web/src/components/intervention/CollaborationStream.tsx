'use client'

import { useState, useEffect } from 'react'
import { Avatar } from '@/components/primitives/Avatar'
import { Icon, type IconName } from '@/components/primitives/Icon'
import { Button } from '@/components/primitives/Button'
import { useToastStore } from '@/stores/useToastStore'
import { STREAM, type StreamEntry } from '@/lib/mock/intervention'
import styles from './CollaborationStream.module.css'

const EVENT_ICON: Record<string, IconName> = {
  status: 'check-circle', evidence: 'document', approval: 'check', comment: 'mail', assignment: 'arrow-right', report: 'clock',
}

function renderMentions(text: string) {
  return text.split(/(@[A-Z][a-z]+ [A-Z][a-z]+)/g).map((part, i) =>
    part.startsWith('@') ? <span key={i} className={styles.mention}>{part}</span> : <span key={i}>{part}</span>
  )
}

interface CollaborationStreamProps {
  loading?: boolean
}

export function CollaborationStream({ loading }: CollaborationStreamProps) {
  const toast = useToastStore()
  const [entries, setEntries] = useState<StreamEntry[]>(STREAM)
  const [draft, setDraft] = useState('')
  const [showResolved, setShowResolved] = useState(false)
  const [typing, setTyping] = useState(false)

  // Simulated live typing indicator from a teammate.
  useEffect(() => {
    const cycle = setInterval(() => setTyping((t) => !t), 4000)
    return () => clearInterval(cycle)
  }, [])

  function submit() {
    if (!draft.trim()) return
    const newComment: StreamEntry = { id: `c${Date.now()}`, kind: 'comment', actor: 'You', time: 'just now', text: draft.trim(), reactions: 0 }
    setEntries((e) => [newComment, ...e])
    setDraft('')
    toast.success('Comment added')
  }

  function toggle(id: string, key: 'reacted' | 'resolved' | 'pinned') {
    setEntries((list) => list.map((e) => {
      if (e.id !== id || e.kind !== 'comment') return e
      if (key === 'reacted') return { ...e, reacted: !e.reacted, reactions: e.reactions + (e.reacted ? -1 : 1) }
      if (key === 'resolved') return { ...e, resolved: !e.resolved }
      return { ...e, pinned: !e.pinned }
    }))
  }

  if (loading) {
    return (
      <div className={styles.stream}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={styles.skeletonRow}><span className={`${styles.skAvatar} shimmer`} /><span className={`${styles.skLine} shimmer`} /></div>
        ))}
      </div>
    )
  }

  const pinned = entries.filter((e) => e.kind === 'comment' && e.pinned)
  const rest = entries.filter((e) => !(e.kind === 'comment' && e.pinned))
  const visible = showResolved ? rest : rest.filter((e) => !(e.kind === 'comment' && e.resolved))
  const resolvedCount = rest.filter((e) => e.kind === 'comment' && e.resolved).length

  return (
    <div className={styles.stream}>
      {/* Composer */}
      <div className={styles.composer}>
        <Avatar name="You" size="sm" />
        <div className={styles.composerMain}>
          <textarea
            className={styles.composerInput}
            placeholder="Comment, or use @ to mention a teammate…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={2}
            aria-label="Add a comment"
          />
          <div className={styles.composerFooter}>
            <span className={styles.typing} aria-live="polite">
              {typing && (<><span className={styles.typingDots} aria-hidden="true"><i /><i /><i /></span>Priya Sharma is typing…</>)}
            </span>
            <Button size="sm" variant="primary" disabled={!draft.trim()} onClick={submit}>Comment</Button>
          </div>
        </div>
      </div>

      {/* Pinned */}
      {pinned.map((e) => e.kind === 'comment' && (
        <Comment key={e.id} entry={e} onReact={() => toggle(e.id, 'reacted')} onResolve={() => toggle(e.id, 'resolved')} onPin={() => toggle(e.id, 'pinned')} />
      ))}

      {/* Stream */}
      <ul className={styles.list} role="feed" aria-label="Collaboration stream">
        {visible.map((e) => (
          <li key={e.id}>
            {e.kind === 'comment'
              ? <Comment entry={e} onReact={() => toggle(e.id, 'reacted')} onResolve={() => toggle(e.id, 'resolved')} onPin={() => toggle(e.id, 'pinned')} />
              : <Event entry={e} />}
          </li>
        ))}
      </ul>

      {resolvedCount > 0 && (
        <button type="button" className={styles.showResolved} onClick={() => setShowResolved((v) => !v)}>
          {showResolved ? 'Hide' : 'Show'} {resolvedCount} resolved
        </button>
      )}
    </div>
  )
}

function Comment({ entry, onReact, onResolve, onPin }: {
  entry: Extract<StreamEntry, { kind: 'comment' }>
  onReact: () => void; onResolve: () => void; onPin: () => void
}) {
  return (
    <div className={`${styles.comment} ${entry.resolved ? styles.resolved : ''} ${entry.pinned ? styles.pinned : ''}`} role="article">
      <Avatar name={entry.actor} size="sm" />
      <div className={styles.commentBody}>
        <div className={styles.commentHead}>
          <span className={styles.author}>{entry.actor}</span>
          <span className={styles.time}>{entry.time}</span>
          {entry.pinned && <span className={styles.pinTag}><Icon name="pin" size={11} /> Pinned</span>}
          {entry.resolved && <span className={styles.resolvedTag}>Resolved</span>}
        </div>
        <p className={styles.text}>{renderMentions(entry.text)}</p>
        <div className={styles.commentActions}>
          <button type="button" className={`${styles.action} ${entry.reacted ? styles.actionActive : ''}`} onClick={onReact} aria-pressed={entry.reacted}>
            <Icon name="check-circle" size={14} /> {entry.reactions > 0 ? entry.reactions : 'React'}
          </button>
          <button type="button" className={styles.action} onClick={onResolve}>{entry.resolved ? 'Reopen' : 'Resolve'}</button>
          <button type="button" className={styles.action} onClick={onPin}>{entry.pinned ? 'Unpin' : 'Pin'}</button>
        </div>
      </div>
    </div>
  )
}

function Event({ entry }: { entry: Extract<StreamEntry, { kind: 'event' }> }) {
  return (
    <div className={styles.event} role="article">
      <span className={styles.eventIcon} aria-hidden="true"><Icon name={EVENT_ICON[entry.eventKind] ?? 'check-circle'} size={14} /></span>
      <span className={styles.eventText}>
        <span className={styles.eventActor}>{entry.actor}</span> {entry.action} <span className={styles.eventTarget}>{entry.target}</span>
        {entry.context && <span className={styles.eventContext}> · {entry.context}</span>}
        <span className={styles.eventTime}> · {entry.time}</span>
      </span>
    </div>
  )
}
