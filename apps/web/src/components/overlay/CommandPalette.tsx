'use client'

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react'
import { useToastStore } from '@/stores/useToastStore'
import { searchAll } from '@/lib/data/search'
import { getRecents, pushRecent } from '@/lib/data/recents'
import { highlight } from '@/lib/highlight'
import styles from './CommandPalette.module.css'

const go = (href: string) => () => { window.location.href = href }
const toast = (msg: string) => () => useToastStore.getState().info(msg)

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
  // Navigate
  { id: 'nav-home', label: 'Go to Home', category: 'Navigate', shortcut: 'G H', action: go('/'), keywords: ['workspace', 'home', 'dashboard'] },
  { id: 'nav-portfolio', label: 'Go to Portfolio', category: 'Navigate', shortcut: 'G P', action: go('/portfolio'), keywords: ['strategy'] },
  { id: 'nav-priority', label: 'Go to Priority Areas', category: 'Navigate', action: go('/priority-areas'), keywords: ['priority', 'objectives'] },
  { id: 'nav-projects', label: 'Go to Projects', category: 'Navigate', shortcut: 'G R', action: go('/projects'), keywords: ['programmes'] },
  { id: 'nav-interventions', label: 'Go to Interventions', category: 'Navigate', shortcut: 'G I', action: go('/interventions'), keywords: ['delivery'] },
  { id: 'nav-calendar', label: 'Go to Calendar', category: 'Navigate', shortcut: 'G C', action: go('/calendar'), keywords: ['schedule', 'reviews'] },
  { id: 'nav-reports', label: 'Go to Reports', category: 'Navigate', action: go('/reports'), keywords: ['reporting'] },
  { id: 'nav-team', label: 'Go to Team', category: 'Navigate', shortcut: 'G T', action: go('/team'), keywords: ['people', 'members'] },
  { id: 'nav-notifications', label: 'Go to Notifications', category: 'Navigate', shortcut: 'G N', action: go('/notifications'), keywords: ['alerts', 'inbox'] },

  // Create
  { id: 'create-project', label: 'Create Project', category: 'Create', shortcut: 'C P', action: toast('New Project — opens in a drawer (coming soon)'), keywords: ['new', 'add', 'programme'] },
  { id: 'create-intervention', label: 'Create Intervention', category: 'Create', shortcut: 'C I', action: toast('New Intervention — coming soon'), keywords: ['new', 'add'] },
  { id: 'create-activity', label: 'Create Activity', category: 'Create', shortcut: 'C', action: toast('New Activity — coming soon'), keywords: ['new', 'task'] },
  { id: 'create-report', label: 'Generate Report', category: 'Create', action: go('/reports'), keywords: ['report', 'export', 'pdf'] },

  // Actions
  { id: 'act-assign', label: 'Assign to…', category: 'Actions', action: toast('Assign — select an object first'), keywords: ['assign', 'owner', 'delegate'] },
  { id: 'act-invite', label: 'Invite team member', category: 'Actions', action: toast('Invite — opens the team panel'), keywords: ['invite', 'add user', 'member'] },

  // Workspace
  { id: 'ws-switch', label: 'Switch workspace…', category: 'Workspace', action: toast('Use the workspace switcher in the sidebar'), keywords: ['change', 'workspace'] },
  { id: 'ws-manage', label: 'Manage workspace', category: 'Workspace', action: go('/settings'), keywords: ['settings', 'admin'] },

  // Preferences
  { id: 'pref-settings', label: 'Open Settings', category: 'Preferences', shortcut: 'G ,', action: go('/settings'), keywords: ['preferences', 'configuration'] },
  { id: 'pref-shortcuts', label: 'Keyboard shortcuts', category: 'Preferences', action: toast('Keyboard shortcuts'), keywords: ['keys', 'hotkeys'] },
  { id: 'pref-appearance', label: 'Appearance', category: 'Preferences', action: toast('Appearance'), keywords: ['theme', 'dark mode'] },
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
  const [entityResults, setEntityResults] = useState<PaletteCommand[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Live entity search across the workspace (debounced).
  useEffect(() => {
    const q = query.trim()
    if (q.length < 2) { setEntityResults([]); return }
    let active = true
    const t = setTimeout(async () => {
      try {
        const res = await searchAll(q)
        if (!active) return
        setEntityResults(res.map((r) => ({
          id: `e-${r.type}-${r.id}`,
          label: r.label,
          description: r.type,
          category: 'Results',
          action: () => { if (r.href) { pushRecent({ label: r.label, href: r.href, type: r.type }); window.location.href = r.href } },
        })))
      } catch { if (active) setEntityResults([]) }
    }, 180)
    return () => { active = false; clearTimeout(t) }
  }, [query])

  // Recently visited — shown when the query is empty.
  const recents = useMemo<PaletteCommand[]>(() => {
    if (query.trim() || !open) return []
    return getRecents().map((r) => ({
      id: `recent-${r.href}`,
      label: r.label,
      description: r.type,
      category: 'Recent',
      action: () => { window.location.href = r.href },
    }))
  }, [query, open])

  const allCommands = useMemo(
    () => [...entityResults, ...recents, ...DEFAULT_COMMANDS, ...extraCommands],
    [entityResults, recents, extraCommands]
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
            placeholder="Search projects, people, reports — or run a command..."
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
              No matches for &ldquo;{query}&rdquo;
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
                        <span className={styles.itemLabel}>{highlight(cmd.label, query)}</span>
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
