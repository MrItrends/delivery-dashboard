'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/primitives/Button'
import { TextField } from '@/components/primitives/TextField'
import { Drawer } from '@/components/overlay/Drawer'
import { useToastStore } from '@/stores/useToastStore'
import { useCapabilities } from '@/lib/data/roles'
import { listTargets, type Target } from '@/lib/data/targets'
import { listTargetUpdates, createTargetUpdate, getTargetSeries, type SeriesPoint } from '@/lib/data/targetUpdates'
import { formatThousands, digitsOnly } from '@/lib/money'
import { timeAgo } from '@/lib/format'
import sect from '@/components/entity/EntityCollection.module.css'
import s from './Targets.module.css'

const fmt = (n: number) => Number(n).toLocaleString('en-US')

function Spark({ points, target, width = 200, height = 40 }: { points: SeriesPoint[]; target: number | null; width?: number; height?: number }) {
  if (points.length === 0) return <div className={s.spark} style={{ display: 'flex', alignItems: 'center', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>No updates yet</div>
  const vals = points.map((p) => p.value)
  const max = Math.max(target ?? 0, ...vals, 1)
  const norm = (v: number) => height - (v / max) * height
  const stepX = points.length > 1 ? width / (points.length - 1) : 0
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${(i * stepX).toFixed(1)},${norm(p.value).toFixed(1)}`).join(' ')
  const ty = target ? norm(target) : null
  return (
    <svg className={s.spark} width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
      {ty !== null && <line x1={0} y1={ty} x2={width} y2={ty} stroke="var(--color-border-strong)" strokeDasharray="3 3" />}
      <path d={d} fill="none" stroke="var(--color-brand-600)" strokeWidth={2} vectorEffect="non-scaling-stroke" />
      {points.length === 1 && <circle cx={0} cy={norm(points[0]!.value)} r={2.5} fill="var(--color-brand-600)" />}
    </svg>
  )
}

export function TargetsSection({ interventionId }: { interventionId: string }) {
  const caps = useCapabilities()
  const { data: targets } = useQuery({ queryKey: ['iv-targets', interventionId], queryFn: () => listTargets(interventionId) })
  const ids = (targets ?? []).map((t) => t.id)
  const { data: series } = useQuery({ queryKey: ['iv-target-series', interventionId, ids.length], queryFn: () => getTargetSeries(ids), enabled: ids.length > 0 })
  const [active, setActive] = useState<Target | null>(null)

  const list = targets ?? []
  if (list.length === 0) return null

  const current = (t: Target) => {
    const pts = series?.[t.id] ?? []
    return pts.length > 0 ? pts[pts.length - 1]!.value : (t.start_amount ?? 0)
  }

  return (
    <section className={sect.section} aria-label="Targets">
      <div className={sect.sectionHeader}>
        <h2 className={sect.sectionTitle}>Targets <span className={sect.count}>{list.length}</span></h2>
      </div>
      <div className={s.grid}>
        {list.map((t) => {
          const cur = current(t)
          const tgt = t.target ?? 0
          const pctVal = tgt > 0 ? Math.min(100, Math.round((cur / tgt) * 100)) : 0
          return (
            <button key={t.id} type="button" className={s.card} onClick={() => setActive(t)}>
              <span className={s.name}>{t.name}</span>
              <Spark points={series?.[t.id] ?? []} target={t.target} />
              <span className={s.value}><strong>{fmt(cur)}</strong> of {fmt(tgt)} {t.unit ?? ''} ({pctVal}%)</span>
              <span className={s.bar}><span className={s.fill} style={{ width: `${pctVal}%` }} /></span>
            </button>
          )
        })}
      </div>

      {active && <TargetPanel target={active} canEdit={caps.canEdit} onClose={() => setActive(null)} interventionId={interventionId} />}
    </section>
  )
}

function TargetPanel({ target, canEdit, onClose, interventionId }: { target: Target; canEdit: boolean; onClose: () => void; interventionId: string }) {
  const qc = useQueryClient()
  const toast = useToastStore()
  const { data: updates } = useQuery({ queryKey: ['target-updates', target.id], queryFn: () => listTargetUpdates(target.id) })
  const [value, setValue] = useState('')
  const [note, setNote] = useState('')

  const add = useMutation({
    mutationFn: () => createTargetUpdate(target.id, Number(value), note.trim() || null),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['target-updates', target.id] })
      qc.invalidateQueries({ queryKey: ['iv-target-series', interventionId] })
      toast.success('Update recorded'); setValue(''); setNote('')
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : 'Could not save'),
  })

  const points = (updates ?? []).map((u) => ({ value: u.value, at: u.created_at }))

  return (
    <Drawer open onClose={onClose} variant="review" title={target.name} description={`Target ${fmt(target.target ?? 0)} ${target.unit ?? ''}`} primaryLabel="Done" onPrimary={onClose}>
      <div style={{ border: '1px solid var(--color-border-default)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
        <Spark points={points} target={target.target} width={320} height={80} />
      </div>

      {canEdit && (
        <div className={s.updateForm}>
          <div className={s.row}>
            <div style={{ flex: 1 }}><TextField label="New value" value={formatThousands(value)} onChange={(e) => setValue(digitsOnly(e.target.value))} placeholder={`in ${target.unit ?? 'units'}`} /></div>
            <Button variant="primary" size="md" loading={add.isPending} disabled={!value} onClick={() => add.mutate()}>Update target</Button>
          </div>
          <TextField label="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} placeholder="What changed?" />
        </div>
      )}

      <ul className={s.log} role="list">
        {(updates ?? []).length === 0 ? (
          <li className={s.empty}>No updates yet.</li>
        ) : (
          [...(updates ?? [])].reverse().map((u) => (
            <li key={u.id} className={s.logItem}>
              <span>
                <span className={s.logVal}>{fmt(u.value)} {target.unit ?? ''}</span>
                {u.note && <span className={s.logNote}> — {u.note}</span>}
              </span>
              <span className={s.logMeta}>{u.author} · {timeAgo(u.created_at)}</span>
            </li>
          ))
        )}
      </ul>
    </Drawer>
  )
}
