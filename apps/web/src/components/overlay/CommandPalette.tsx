'use client'

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react'
import styles from './CommandPalette.module.css'

export interface PaletteCommand {
  id: string
  label: string
  description?: string
  category: string
  shortcut?: string
  icon?: string
  action: () => void
  keywords?: string[]
}

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  commands?: PaletteCommand[]
}

const DEFAULT_COMMANDS: PaletteCommand[] = [
  {
    id: 'nav-home',
    label: 'Go to Home',
    description: 'Workspace home',
    category: 'Navigate',
    shortcut: 'G H',
    icon: '⌂',
    action: () => { window.location.href = '/' },
    keywords: ['workspace', 'home', 'dashboard'],
  },
  {
    id: 'nav-portfolio',
    label: 'Go to Portfolio',
    category: 'Navigate',
    shortcut: 'G P',
    icon: '◈',
    action: () => { window.location.href = '/portfolio' },
    keywords: ['portfolio', 'strategy'],
  },
  {
    id: 'nav-my-work',
    label: 'Go to My Work',
    category: 'Navigate',
    shortcut: 'G W',
    icon: '✓',
    action: () => { window.location.href = '/my-work' },
    keywords: ['my work', 'activities', 'assigned'],
  },
  {
    id: 'nav-notifications',
    label: 'Go to Notifications',
    category: 'Navigate',
    shortcut: 'G N',
    icon: '◎',
    action: () => { window.location.href = '/notifications' },
    keywords: ['notifications', 'alerts', 'inbox'],
  },
  {
    id: 'nav-search',
    label: 'Go to Search',
    category: 'Navigate',
    shortcut: 'G S',
    icon: '⌕',
    action: () => { window.location.href = '/search' },
    keywords: ['search', 'find'],
  },
  {
    id: 'nav-settings',
    label: 'Go to Settings',
    category: 'Navigate',
    shortcut: 'G ,',
    icon: '⚙',
    action: () => { window.location.href = '/settings' },
    keywords: ['settings', 'preferences', 'configuration'],
  },
]

function normalize(str: string) {
  return str.toLowerCase().replace(/\s+/g, ' ').trim()
}

function scoreCommand(cmd: PaletteCommand, query: string): number {
  const q = normalize(query)
  const label = normalize(cmd.label)
  const desc = normalize(cmd.description ?? '')
  const keywords = (cmd.keywords ?? []).map(normalize).join(' ')

  if (label === q) return 100
  if (label.startsWith(q)) return 80
  if (label.includes(q)) return 60
  if (desc.includes(q)) return 40
  if (keywords.includes(q)) return 20
  return -1
}

function groupBy<T>(arr: T[], key: (item: T) => string): Map<string, T[]> {
  const map = new Map<string, T[]>()
  for (const item of arr) {
    const k = key(item)
    if (!map.has(k)) map.set(k, [])
    map.get(k)!.push(item)
  }
  return map
}

export function CommandPalette({
  open,
  onClose,
  commands: extraCommands = [],
}: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const allCommands = useMemo(
    () => [...DEFAULT_COMMANDS, ...extraCommands],
    [extraCommands]
  )

  const results = useMemo(() => {
    if (!query.trim()) return allCommands
    return allCommands
      .map((cmd) => ({ cmd, score: scoreCommand(cmd, query) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ cmd }) => cmd)
  }, [query, allCommands])

  // Reset on open
  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  // Global ⌘K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (open) onClose()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setActiveIndex((i) => Math.min(i + 1, results.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setActiveIndex((i) => Math.max(i - 1, 0))
          break
        case 'Enter': {
          e.preventDefault()
          const cmd = results[activeIndex]
          if (cmd) { cmd.action(); onClose() }
          break
        }
        case 'Escape':
          e.preventDefault()
          onClose()
          break
      }
    },
    [results, activeIndex, onClose]
  )

  // Keep active item scrolled into view
  useEffect(() => {
    const container = listRef.current
    if (!container) return
    const active = container.querySelector('[data-active="true"]') as HTMLElement | null
    active?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  const grouped = groupBy(results, (cmd) => cmd.category)

  if (!open) return null

  return (
    <>
      <div
        className={styles.backdrop}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={styles.palette}
        role="dialog"
        aria-label="Command palette"
        aria-modal="true"
        onKeyDown={handleKeyDown}
      >
        {/* Search input */}
        <div className={styles.inputWrapper}>
          <span className={styles.searchIcon} aria-hidden="true">⌕</span>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIndex(0) }}
            aria-label="Search commands"
            aria-autocomplete="list"
            aria-controls="palette-results"
            aria-activedescendant={
              results[activeIndex] ? `palette-item-${results[activeIndex]!.id}` : undefined
            }
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className={styles.escKbd} aria-label="Press Escape to close">ESC</kbd>
        </div>

        {/* Results */}
        <div
          ref={listRef}
          id="palette-results"
          className={styles.results}
          role="listbox"
          aria-label="Commands"
        >
          {results.length === 0 ? (
            <div className={styles.noResults}>
              No commands found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            Array.from(grouped.entries()).map(([category, cmds]) => (
              <div key={category} className={styles.group}>
                <div className={styles.groupLabel} aria-hidden="true">
                  {category}
                </div>
                {cmds.map((cmd) => {
                  const globalIndex = results.indexOf(cmd)
                  const isActive = globalIndex === activeIndex
                  return (
                    <button
                      key={cmd.id}
                      id={`palette-item-${cmd.id}`}
                      className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
                      role="option"
                      aria-selected={isActive}
                      data-active={isActive}
                      onMouseEnter={() => setActiveIndex(globalIndex)}
                      onClick={() => { cmd.action(); onClose() }}
                    >
                      {cmd.icon && (
                        <span className={styles.itemIcon} aria-hidden="true">
                          {cmd.icon}
                        </span>
                      )}
                      <span className={styles.itemContent}>
                        <span className={styles.itemLabel}>{cmd.label}</span>
                        {cmd.description && (
                          <span className={styles.itemDesc}>{cmd.description}</span>
                        )}
                      </span>
                      {cmd.shortcut && (
                        <span className={styles.itemShortcut} aria-label={`Shortcut: ${cmd.shortcut}`}>
                          {cmd.shortcut.split(' ').map((key, i) => (
                            <kbd key={i} className={styles.kbd}>{key}</kbd>
                          ))}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}
