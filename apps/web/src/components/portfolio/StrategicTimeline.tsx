'use client'

import { useState } from 'react'
import type { TimelineTrack, TimelineItemType } from '@/lib/mock/portfolio'
import styles from './StrategicTimeline.module.css'

const LEGEND: { type: TimelineItemType; label: string }[] = [
  { type: 'milestone', label: 'Milestone' },
  { type: 'review', label: 'Review' },
  { type: 'budget', label: 'Budget release' },
  { type: 'deliverable', label: 'Deliverable' },
]

interface StrategicTimelineProps {
  tracks: TimelineTrack[]
  months: string[]
  loading?: boolean
}

export function StrategicTimeline({ tracks, months, loading }: StrategicTimelineProps) {
  const [monthsShown, setMonthsShown] = useState(6)
  const visibleMonths = months.slice(0, monthsShown)
  const step = 100 / monthsShown

  if (loading) {
    return (
      <div className={styles.timeline}>
        <div className={styles.skeleton}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={styles.skeletonRow}>
              <span className={`${styles.skeletonLabel} shimmer`} />
              <span className={`${styles.skeletonBar} shimmer`} style={{ width: `${30 + i * 10}%` }} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.timeline}>
      {/* Toolbar — legend + zoom */}
      <div className={styles.toolbar}>
        <ul className={styles.legend} role="list">
          {LEGEND.map((l) => (
            <li key={l.type} className={styles.legendItem}>
              <span className={`${styles.marker} ${styles[l.type]}`} aria-hidden="true" />
              {l.label}
            </li>
          ))}
        </ul>
        <div className={styles.zoom} role="group" aria-label="Timeline zoom">
          {[6, 12].map((m) => (
            <button
              key={m}
              type="button"
              className={`${styles.zoomBtn} ${monthsShown === m ? styles.zoomActive : ''}`}
              onClick={() => setMonthsShown(m)}
              aria-pressed={monthsShown === m}
            >
              {m}M
            </button>
          ))}
        </div>
      </div>

      {/* Month axis */}
      <div className={styles.axis}>
        <span className={styles.axisSpacer} />
        <div className={styles.axisMonths}>
          {visibleMonths.map((m, i) => (
            <span key={i} className={styles.axisMonth} style={{ width: `${step}%` }}>{m}</span>
          ))}
        </div>
      </div>

      {/* Tracks */}
      <div className={styles.tracks} role="list" aria-label="Delivery timeline">
        {tracks.map((track) => (
          <div key={track.id} className={styles.track} role="listitem">
            <span className={styles.trackLabel} title={track.name}>{track.name}</span>
            <div className={styles.lane}>
              {/* gridlines */}
              {visibleMonths.map((_, i) => (
                <span key={i} className={styles.gridline} style={{ left: `${i * step}%` }} aria-hidden="true" />
              ))}

              {/* phase bar */}
              {track.bar.startIndex < monthsShown && (
                <span
                  className={`${styles.bar} ${styles[`bar_${track.bar.health}`]}`}
                  style={{
                    left: `${track.bar.startIndex * step}%`,
                    width: `${(Math.min(track.bar.endIndex, monthsShown) - track.bar.startIndex) * step}%`,
                  }}
                  aria-hidden="true"
                />
              )}

              {/* markers */}
              {track.items
                .filter((it) => it.monthIndex < monthsShown)
                .map((it) => (
                  <span
                    key={it.id}
                    className={`${styles.itemMarker} ${styles[it.type]}`}
                    style={{ left: `${(it.monthIndex + 0.5) * step}%` }}
                    title={`${it.label} · ${visibleMonths[it.monthIndex]}`}
                  >
                    <span className="sr-only">{it.label}</span>
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
