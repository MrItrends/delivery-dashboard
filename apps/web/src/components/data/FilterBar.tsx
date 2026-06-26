'use client'

import { useState } from 'react'
import { Button } from '@/components/primitives/Button'
import styles from './FilterBar.module.css'

export interface FilterChip {
  id: string
  label: string
  value: string
}

export interface SavedView {
  id: string
  label: string
}

interface FilterBarProps {
  views?: SavedView[]
  activeView?: string
  onViewChange?: (id: string) => void
  activeFilters?: FilterChip[]
  onRemoveFilter?: (id: string) => void
  onClearFilters?: () => void
  onFilter?: () => void
  onSort?: () => void
  onGroup?: () => void
  onColumns?: () => void
  onExport?: () => void
  primaryAction?: React.ReactNode
  search?: React.ReactNode
}

export function FilterBar({
  views = [],
  activeView,
  onViewChange,
  activeFilters = [],
  onRemoveFilter,
  onClearFilters,
  onFilter,
  onSort,
  onGroup,
  onColumns,
  onExport,
  primaryAction,
  search,
}: FilterBarProps) {
  const [sortOpen, setSortOpen] = useState(false)

  return (
    <div className={styles.bar}>
      {/* Top row: views + controls + primary action */}
      <div className={styles.topRow}>
        <div className={styles.left}>
          {/* Views */}
          {views.length > 0 && (
            <div className={styles.views} role="tablist" aria-label="Saved views">
              {views.map((view) => (
                <button
                  key={view.id}
                  role="tab"
                  aria-selected={activeView === view.id}
                  className={`${styles.viewBtn} ${activeView === view.id ? styles.viewBtnActive : ''}`}
                  onClick={() => onViewChange?.(view.id)}
                >
                  {view.label}
                </button>
              ))}
            </div>
          )}

          {/* Inline search */}
          {search && <div className={styles.search}>{search}</div>}
        </div>

        <div className={styles.right}>
          {onFilter && (
            <Button variant="ghost" size="sm" onClick={onFilter} aria-label="Filter">
              Filter ▾
            </Button>
          )}
          {onSort && (
            <Button variant="ghost" size="sm" onClick={onSort} aria-label="Sort">
              Sort ▾
            </Button>
          )}
          {onGroup && (
            <Button variant="ghost" size="sm" onClick={onGroup} aria-label="Group by">
              Group ▾
            </Button>
          )}
          {onColumns && (
            <Button variant="ghost" size="sm" onClick={onColumns} aria-label="Columns">
              Columns
            </Button>
          )}
          {onExport && (
            <Button variant="ghost" size="sm" onClick={onExport} aria-label="Export">
              Export
            </Button>
          )}
          {primaryAction && (
            <div className={styles.primaryAction}>{primaryAction}</div>
          )}
        </div>
      </div>

      {/* Active filter chips */}
      {activeFilters.length > 0 && (
        <div className={styles.chips} role="list" aria-label="Active filters">
          {activeFilters.map((filter) => (
            <div key={filter.id} className={styles.chip} role="listitem">
              <span className={styles.chipLabel}>{filter.label}:</span>
              <span className={styles.chipValue}>{filter.value}</span>
              {onRemoveFilter && (
                <button
                  className={styles.chipRemove}
                  onClick={() => onRemoveFilter(filter.id)}
                  aria-label={`Remove filter: ${filter.label} ${filter.value}`}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          {onClearFilters && (
            <button className={styles.clearAll} onClick={onClearFilters}>
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  )
}
