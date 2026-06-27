'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { PageHeader } from '@/components/layout/PageHeader'
import { Icon } from '@/components/primitives/Icon'
import { listEvents, type CalEvent } from '@/lib/data/calendar'
import page from '@/components/portfolio/PortfolioWorkspace.module.css'
import c from './Calendar.module.css'

type View = 'month' | 'week' | 'day' | 'list'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const toKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const addDays = (d: Date, n: number) => { const x = new Date(d); x.setDate(x.getDate() + n); return x }
const addMonths = (d: Date, n: number) => { const x = new Date(d); x.setMonth(x.getMonth() + n); return x }
const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1)
const startOfWeekMon = (d: Date) => { const x = new Date(d); const wd = (x.getDay() + 6) % 7; x.setDate(x.getDate() - wd); x.setHours(0, 0, 0, 0); return x }

export function CalendarView() {
  const router = useRouter()
  const { data } = useQuery({ queryKey: ['events'], queryFn: listEvents })
  const [view, setView] = useState<View>('month')
  const [cursor, setCursor] = useState(() => new Date())
  const [rep, setRep] = useState<'list' | 'card'>('list')

  const byDate = useMemo(() => {
    const map = new Map<string, CalEvent[]>()
    for (const e of data ?? []) { const a = map.get(e.date) ?? []; a.push(e); map.set(e.date, a) }
    return map
  }, [data])

  const today = new Date()
  const go = (e: CalEvent) => { if (e.href) router.push(e.href) }

  function step(dir: number) {
    if (view === 'month') setCursor((d) => addMonths(d, dir))
    else if (view === 'week') setCursor((d) => addDays(d, dir * 7))
    else if (view === 'day') setCursor((d) => addDays(d, dir))
    else setCursor((d) => addDays(d, dir * 30))
  }

  const rangeLabel =
    view === 'month' ? cursor.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
    : view === 'week' ? (() => { const s = startOfWeekMon(cursor); const e = addDays(s, 6); return `${s.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })} – ${e.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}` })()
    : view === 'day' ? cursor.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : 'Upcoming'

  function chip(e: CalEvent) {
    return (
      <button key={e.id} type="button" className={`${c.chip} ${e.kind === 'Activity' ? c.chipActivity : c.chipMilestone}`} onClick={() => go(e)} title={`${e.title} · ${e.kind}`}>
        {e.title}
      </button>
    )
  }

  return (
    <div className={page.page}>
      <PageHeader title="Calendar" description="Upcoming milestones and activity deadlines across the workspace." />
      <div className={page.body}>
        <div className={c.toolbar}>
          <div className={c.left}>
            <span className={c.rangeLabel}>{rangeLabel}</span>
            <div className={c.nav}>
              <button className={c.navBtn} aria-label="Previous" onClick={() => step(-1)}><Icon name="arrow-left" size={15} /></button>
              <button className={c.today} onClick={() => setCursor(new Date())}>Today</button>
              <button className={c.navBtn} aria-label="Next" onClick={() => step(1)}><Icon name="arrow-right" size={15} /></button>
            </div>
          </div>
          <div className={c.left}>
            {view === 'list' && (
              <div className={c.seg} role="group" aria-label="Representation">
                {(['list', 'card'] as const).map((r) => (
                  <button key={r} className={`${c.segBtn} ${rep === r ? c.segActive : ''}`} onClick={() => setRep(r)} style={{ textTransform: 'capitalize' }}>{r}</button>
                ))}
              </div>
            )}
            <div className={c.seg} role="group" aria-label="View">
              {(['month', 'week', 'day', 'list'] as View[]).map((v) => (
                <button key={v} className={`${c.segBtn} ${view === v ? c.segActive : ''}`} onClick={() => setView(v)} style={{ textTransform: 'capitalize' }}>{v}</button>
              ))}
            </div>
          </div>
        </div>

        {view === 'month' && <MonthGrid cursor={cursor} today={today} byDate={byDate} chip={chip} onPickDay={(d) => { setCursor(d); setView('day') }} />}
        {view === 'week' && <WeekGrid cursor={cursor} today={today} byDate={byDate} chip={chip} />}
        {view === 'day' && <Agenda dates={[toKey(cursor)]} byDate={byDate} rep="list" onGo={go} emptyText="Nothing due on this day." />}
        {view === 'list' && <Agenda dates={upcomingKeys(cursor, byDate)} byDate={byDate} rep={rep} onGo={go} emptyText="No upcoming deadlines. Add a due date to an activity to see it here." />}
      </div>
    </div>
  )
}

function MonthGrid({ cursor, today, byDate, chip, onPickDay }: { cursor: Date; today: Date; byDate: Map<string, CalEvent[]>; chip: (e: CalEvent) => React.ReactNode; onPickDay: (d: Date) => void }) {
  const start = startOfWeekMon(startOfMonth(cursor))
  const days = Array.from({ length: 42 }, (_, i) => addDays(start, i))
  const month = cursor.getMonth()
  return (
    <div className={c.grid}>
      <div className={c.weekdayRow}>{WEEKDAYS.map((w) => <div key={w} className={c.weekday}>{w}</div>)}</div>
      <div className={c.month}>
        {days.map((d) => {
          const key = toKey(d)
          const events = byDate.get(key) ?? []
          const isToday = toKey(today) === key
          const isOther = d.getMonth() !== month
          return (
            <div key={key} className={`${c.cell} ${isOther ? c.cellOther : ''}`}>
              <button className={`${c.dayNum} ${isToday ? c.dayNumToday : ''} ${isOther ? c.dayNumOther : ''}`} onClick={() => onPickDay(d)}>{d.getDate()}</button>
              {events.slice(0, 3).map(chip)}
              {events.length > 3 && <button className={c.more} onClick={() => onPickDay(d)}>+{events.length - 3} more</button>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function WeekGrid({ cursor, today, byDate, chip }: { cursor: Date; today: Date; byDate: Map<string, CalEvent[]>; chip: (e: CalEvent) => React.ReactNode }) {
  const start = startOfWeekMon(cursor)
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i))
  return (
    <div className={c.week}>
      {days.map((d, i) => {
        const key = toKey(d)
        const events = byDate.get(key) ?? []
        const isToday = toKey(today) === key
        return (
          <div key={key} className={c.weekCol} style={i === 6 ? { borderRight: 'none' } : undefined}>
            <div className={c.weekHead}>
              <div className={c.weekHeadName}>{WEEKDAYS[i]}</div>
              <div className={`${c.weekHeadNum} ${isToday ? c.weekHeadToday : ''}`}>{d.getDate()}</div>
            </div>
            {events.map(chip)}
          </div>
        )
      })}
    </div>
  )
}

function Agenda({ dates, byDate, rep, onGo, emptyText }: { dates: string[]; byDate: Map<string, CalEvent[]>; rep: 'list' | 'card'; onGo: (e: CalEvent) => void; emptyText: string }) {
  const groups = dates.map((k) => ({ key: k, events: byDate.get(k) ?? [] })).filter((g) => g.events.length > 0)
  if (groups.length === 0) return <div className={c.empty}>{emptyText}</div>
  const label = (k: string) => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' }) }
  return (
    <div className={c.agenda}>
      {groups.map((g) => (
        <div key={g.key} className={c.agendaDay}>
          <div className={c.agendaDate}>{label(g.key)}</div>
          {rep === 'card' ? (
            <div className={c.cards}>
              {g.events.map((e) => (
                <button key={e.id} type="button" className={c.card} onClick={() => onGo(e)}>
                  <div className={c.cardDate}>{e.kind}</div>
                  <div className={c.cardTitle}>{e.title}</div>
                </button>
              ))}
            </div>
          ) : (
            g.events.map((e) => (
              <div key={e.id} className={c.row} onClick={() => onGo(e)}>
                <Icon name={e.kind === 'Milestone' ? 'target' : 'check-circle'} size={16} style={{ color: 'var(--color-text-tertiary)' }} />
                <span className={c.rowTitle}>{e.title}</span>
                <span className={c.tag}>{e.kind}</span>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  )
}

function upcomingKeys(cursor: Date, byDate: Map<string, CalEvent[]>): string[] {
  const start = new Date(cursor); start.setHours(0, 0, 0, 0)
  return Array.from(byDate.keys())
    .filter((k) => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d) >= start })
    .sort()
}
