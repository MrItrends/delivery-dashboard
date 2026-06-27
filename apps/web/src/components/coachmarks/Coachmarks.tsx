'use client'

import { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/primitives/Button'
import { TOUR_STEPS, useTourStore } from '@/lib/coachmarks/tour'
import styles from './Coachmarks.module.css'

const DONE_KEY = 'tbi-tour-done'
const POP_W = 320
const MARGIN = 12

export function Coachmarks() {
  const running = useTourStore((s) => s.running)
  const start = useTourStore((s) => s.start)
  const stop = useTourStore((s) => s.stop)

  const [mounted, setMounted] = useState(false)
  const [index, setIndex] = useState(0)
  const [rect, setRect] = useState<DOMRect | null>(null)

  useEffect(() => { setMounted(true) }, [])

  // Auto-start once per user (first visit).
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem(DONE_KEY) === '1') return
    const t = setTimeout(() => start(), 900)
    return () => clearTimeout(t)
  }, [start])

  const step = running ? TOUR_STEPS[index] : undefined

  const measure = useCallback(() => {
    if (!step?.target) { setRect(null); return }
    const el = document.querySelector(step.target) as HTMLElement | null
    setRect(el ? el.getBoundingClientRect() : null)
  }, [step])

  useEffect(() => {
    if (!step) return
    const el = step.target ? (document.querySelector(step.target) as HTMLElement | null) : null
    el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    const t = setTimeout(measure, 220)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, true)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure, true)
    }
  }, [step, measure])

  function finish() {
    if (typeof window !== 'undefined') localStorage.setItem(DONE_KEY, '1')
    setIndex(0)
    stop()
  }
  function next() { if (index >= TOUR_STEPS.length - 1) finish(); else setIndex((i) => i + 1) }
  function back() { setIndex((i) => Math.max(0, i - 1)) }

  if (!mounted || !running || !step) return null

  const isLast = index >= TOUR_STEPS.length - 1
  const popStyle = popoverStyle(rect, step.placement)

  return createPortal(
    <>
      <div className={styles.backdrop} style={{ background: rect ? 'transparent' : 'rgba(15, 23, 42, 0.55)' }} />
      {rect && (
        <div
          className={styles.spotlight}
          style={{ top: rect.top - 6, left: rect.left - 6, width: rect.width + 12, height: rect.height + 12 }}
        />
      )}
      <div className={styles.popover} style={popStyle} role="dialog" aria-label="Product tour">
        <div className={styles.counter}>{index + 1} of {TOUR_STEPS.length}</div>
        <h3 className={styles.title}>{step.title}</h3>
        <p className={styles.body}>{step.body}</p>
        <div className={styles.dots} aria-hidden="true">
          {TOUR_STEPS.map((s, i) => <span key={s.id} className={`${styles.dot} ${i === index ? styles.dotActive : ''}`} />)}
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.skip} onClick={finish}>Skip tour</button>
          <div className={styles.navBtns}>
            {index > 0 && <Button variant="secondary" size="sm" onClick={back}>Back</Button>}
            <Button variant="primary" size="sm" onClick={next}>{isLast ? 'Done' : 'Next'}</Button>
          </div>
        </div>
      </div>
    </>,
    document.body
  )
}

function popoverStyle(rect: DOMRect | null, placement: string | undefined): React.CSSProperties {
  if (typeof window === 'undefined' || !rect) {
    return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: POP_W }
  }
  const vw = window.innerWidth
  const vh = window.innerHeight
  let top: number
  let left: number
  switch (placement) {
    case 'right': left = rect.right + MARGIN; top = rect.top; break
    case 'left': left = rect.left - POP_W - MARGIN; top = rect.top; break
    case 'top': left = rect.left; top = rect.top - 220; break
    default: left = rect.left; top = rect.bottom + MARGIN // bottom
  }
  // Keep on screen.
  left = Math.min(Math.max(MARGIN, left), vw - POP_W - MARGIN)
  top = Math.min(Math.max(MARGIN, top), vh - 240)
  return { top, left, width: POP_W }
}
