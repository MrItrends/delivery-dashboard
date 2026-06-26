'use client'

import { useEffect, useRef, useCallback } from 'react'
import { StatusChip, type ObjectStatus } from '@/components/primitives/StatusChip'
import { Tabs, TabPanel, type TabItem } from '@/components/navigation/Tabs'
import styles from './Inspector.module.css'

type InspectorWidth = 'default' | 'expanded'

interface InspectorProps {
  open: boolean
  onClose: () => void
  width?: InspectorWidth
  onExpand?: () => void
  onOpenFullPage?: () => void

  objectType?: string
  title?: string
  status?: ObjectStatus

  tabs: TabItem[]
  activeTab: string
  onTabChange: (id: string) => void
  children: React.ReactNode

  primaryAction?: React.ReactNode
}

export function Inspector({
  open,
  onClose,
  width = 'default',
  onExpand,
  onOpenFullPage,
  objectType,
  title,
  status,
  tabs,
  activeTab,
  onTabChange,
  children,
  primaryAction,
}: InspectorProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  // Focus the close button when opened
  useEffect(() => {
    if (open) {
      closeBtnRef.current?.focus()
    }
  }, [open])

  // ESC to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose()
      }
    },
    [open, onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const panelWidth =
    width === 'expanded'
      ? 'var(--inspector-width-expanded)'
      : 'var(--inspector-width)'

  return (
    <>
      {/* Panel */}
      <div
        ref={panelRef}
        className={`${styles.panel} ${open ? styles.open : styles.closed}`}
        style={{ width: panelWidth }}
        role="complementary"
        aria-label={title ? `${title} details` : 'Details panel'}
        aria-hidden={!open}
        inert={!open ? '' : undefined}
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            {objectType && (
              <span className={styles.objectType}>{objectType}</span>
            )}
          </div>
          <div className={styles.headerActions}>
            {onExpand && (
              <button
                className={styles.headerBtn}
                onClick={onExpand}
                aria-label={width === 'expanded' ? 'Collapse panel' : 'Expand panel'}
                title={width === 'expanded' ? 'Collapse' : 'Expand'}
              >
                {width === 'expanded' ? '⇥' : '⇤'}
              </button>
            )}
            {onOpenFullPage && (
              <button
                className={styles.headerBtn}
                onClick={onOpenFullPage}
                aria-label="Open full page"
                title="Open full page"
              >
                ↗
              </button>
            )}
            <button
              ref={closeBtnRef}
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close panel"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Object identity */}
        {(title || status) && (
          <div className={styles.identity}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {status && <StatusChip status={status} size="sm" />}
          </div>
        )}

        {/* Tabs */}
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={onTabChange}
          variant="secondary"
        />

        {/* Tab content */}
        <div className={styles.body}>
          {tabs.map((tab) => (
            <TabPanel key={tab.id} id={tab.id} activeTab={activeTab}>
              {children}
            </TabPanel>
          ))}
        </div>

        {/* Footer */}
        {(onOpenFullPage || primaryAction) && (
          <div className={styles.footer}>
            {onOpenFullPage && (
              <button
                className={styles.openFullPage}
                onClick={onOpenFullPage}
                aria-label="Open full page"
              >
                Open full page ↗
              </button>
            )}
            {primaryAction && <div>{primaryAction}</div>}
          </div>
        )}
      </div>
    </>
  )
}
