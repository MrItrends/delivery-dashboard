'use client'

import { useRef, useState, useEffect } from 'react'
import styles from './Tabs.module.css'

export interface TabItem {
  id: string
  label: string
  count?: number
  disabled?: boolean
}

interface TabsProps {
  tabs: TabItem[]
  activeTab: string
  onChange: (id: string) => void
  variant?: 'primary' | 'secondary'
}

const MAX_VISIBLE = 8

export function Tabs({ tabs, activeTab, onChange, variant = 'primary' }: TabsProps) {
  const visible = tabs.slice(0, MAX_VISIBLE)
  const overflow = tabs.slice(MAX_VISIBLE)
  const [overflowOpen, setOverflowOpen] = useState(false)
  const overflowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (overflowRef.current && !overflowRef.current.contains(e.target as Node)) {
        setOverflowOpen(false)
      }
    }
    if (overflowOpen) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [overflowOpen])

  return (
    <div className={`${styles.tabs} ${styles[variant]}`} role="tablist" aria-label="Section navigation">
      {visible.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`tabpanel-${tab.id}`}
          id={`tab-${tab.id}`}
          className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          disabled={tab.disabled}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={styles.count} aria-label={`${tab.count} items`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}

      {overflow.length > 0 && (
        <div className={styles.overflowWrapper} ref={overflowRef}>
          <button
            className={`${styles.tab} ${overflow.some((t) => t.id === activeTab) ? styles.active : ''}`}
            onClick={() => setOverflowOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={overflowOpen}
          >
            More ▾
          </button>
          {overflowOpen && (
            <div className={styles.overflowMenu} role="listbox">
              {overflow.map((tab) => (
                <button
                  key={tab.id}
                  role="option"
                  aria-selected={activeTab === tab.id}
                  className={`${styles.overflowItem} ${activeTab === tab.id ? styles.overflowItemActive : ''}`}
                  onClick={() => { onChange(tab.id); setOverflowOpen(false) }}
                  disabled={tab.disabled}
                >
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className={styles.count}>{tab.count}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

interface TabPanelProps {
  id: string
  activeTab: string
  children: React.ReactNode
}

export function TabPanel({ id, activeTab, children }: TabPanelProps) {
  if (activeTab !== id) return null
  return (
    <div
      id={`tabpanel-${id}`}
      role="tabpanel"
      aria-labelledby={`tab-${id}`}
      tabIndex={0}
    >
      {children}
    </div>
  )
}
