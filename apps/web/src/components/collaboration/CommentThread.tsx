'use client'

import { useState } from 'react'
import { Avatar } from '@/components/primitives/Avatar'
import { Icon } from '@/components/primitives/Icon'
import { Button } from '@/components/primitives/Button'
import { useToastStore } from '@/stores/useToastStore'
import { useComments, useCommentMutations } from '@/lib/data/useComments'
import { useRealtime } from '@/lib/data/useRealtime'
import type { Comment } from '@/lib/data/comments'
import styles from './CommentThread.module.css'

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
}

function renderMentions(text: string) {
  return text.split(/(@[A-Z][a-z]+ [A-Z][a-z]+)/g).map((part, i) =>
    part.startsWith('@') ? <span key={i} className={styles.mention}>{part}</span> : <span key={i}>{part}</span>
  )
}

interface CommentThreadProps {
  objectType: string
  objectId: string
}

export function CommentThread({ objectType, objectId }: CommentThreadProps) {
  const toast = useToastStore()
  const { data, isLoading } = useComments(objectType, objectId)
  const { add, flag } = useCommentMutations(objectType, objectId)
  useRealtime('comments', ['comments', objectType, objectId], { column: 'object_id', value: objectId })
  const [draft, setDraft] = useState('')
  const [showResolved, setShowResolved] = useState(false)

  function submit() {
    if (!draft.trim()) return
    add.mutate(draft.trim(), {
      onSuccess: () => { setDraft(''); toast.success('Comment added') },
      onError: (e) => toast.error(e instanceof Error ? e.message : 'Could not comment'),
    })
  }

  const comments = data ?? []
  const pinned = comments.filter((c) => c.pinned)
  const rest = comments.filter((c) => !c.pinned)
  const visible = showResolved ? rest : rest.filter((c) => !c.resolved)
  const resolvedCount = rest.filter((c) => c.resolved).length

  return (
    <div className={styles.thread}>
      <div className={styles.composer}>
        <Avatar name="You" size="sm" />
        <div className={styles.composerMain}>
          <textarea
            className={styles.input}
            placeholder="Comment, or use @ to mention a teammate…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={2}
            aria-label="Add a comment"
          />
          <div className={styles.composerActions}>
            <Button size="sm" variant="primary" disabled={!draft.trim() || add.isPending} loading={add.isPending} onClick={submit}>Comment</Button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className={styles.skeletonRow}><span className={`${styles.skAvatar} shimmer`} /><span className={`${styles.skLine} shimmer`} /></div>
      ) : comments.length === 0 ? (
        <p className={styles.empty}>No comments yet. Start the discussion.</p>
      ) : (
        <>
          {pinned.map((c) => <CommentItem key={c.id} c={c} onFlag={flag.mutate} />)}
          <ul className={styles.list} role="feed" aria-label="Comments">
            {visible.map((c) => <li key={c.id}><CommentItem c={c} onFlag={flag.mutate} /></li>)}
          </ul>
          {resolvedCount > 0 && (
            <button type="button" className={styles.showResolved} onClick={() => setShowResolved((v) => !v)}>
              {showResolved ? 'Hide' : 'Show'} {resolvedCount} resolved
            </button>
          )}
        </>
      )}
    </div>
  )
}

function CommentItem({ c, onFlag }: { c: Comment; onFlag: (v: { id: string; patch: { resolved?: boolean; pinned?: boolean } }) => void }) {
  const name = c.author?.name || 'Someone'
  return (
    <div className={`${styles.comment} ${c.resolved ? styles.resolved : ''} ${c.pinned ? styles.pinnedBox : ''}`} role="article">
      <Avatar name={name} size="sm" />
      <div className={styles.body}>
        <div className={styles.head}>
          <span className={styles.author}>{name}</span>
          <span className={styles.time}>{timeAgo(c.created_at)}</span>
          {c.pinned && <span className={styles.pinTag}><Icon name="pin" size={11} /> Pinned</span>}
          {c.resolved && <span className={styles.resolvedTag}>Resolved</span>}
        </div>
        <p className={styles.text}>{renderMentions(c.body)}</p>
        <div className={styles.actions}>
          <button type="button" className={styles.action} onClick={() => onFlag({ id: c.id, patch: { resolved: !c.resolved } })}>{c.resolved ? 'Reopen' : 'Resolve'}</button>
          <button type="button" className={styles.action} onClick={() => onFlag({ id: c.id, patch: { pinned: !c.pinned } })}>{c.pinned ? 'Unpin' : 'Pin'}</button>
        </div>
      </div>
    </div>
  )
}
