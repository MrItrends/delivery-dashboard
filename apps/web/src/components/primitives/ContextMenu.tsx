'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Icon, type IconName } from './Icon'
import styles from './ContextMenu.module.css'

export interface ContextMenuItem {
  label: string
  icon?: IconName
  onClick: () => void
  danger?: boolean
  separatorBefore?: boolean
}

interface ContextMenuState {
  x: number
  y: number
  items: ContextMenuItem[]
}

/**
 * Hook that wires a reusable right-click menu. Returns an `onContextMenu`
 * factory and the menu element to render once at the root.
 */
export function useContextMenu() {
  const [state, setState] = useState<ContextMenuState | null>(null)

  const open = useCallback(
    (items: ContextMenuItem[]) => (e: React.MouseEvent) => {
      e.preventDefault()
      setState({ x: e.clientX, y: e.clientY, items })
    },
    []
  )

  const close = useCallback(() => setState(null), [])

  const menu = state ? (
    <ContextMenu x={state.x} y={state.y} items={state.items} onClose={close} />
  ) : null

  return { open, menu }
}

function ContextMenu({
  x,
  y,
  items,
  onClose,
}: ContextMenuState & { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ left: x, top: y })

  useEffect(() => {
    // Flip if the menu would overflow the viewport.
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    let left = x
    let top = y
    if (x + rect.width > window.innerWidth - 8) left = x - rect.width
    if (y + rect.height > window.innerHeight - 8) top = y - rect.height
    setPos({ left, top })
  }, [x, y])

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onClose, true)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onClose, true)
    }
  }, [onClose])

  return (
    <div
      ref={ref}
      className={styles.menu}
      style={{ left: pos.left, top: pos.top }}
      role="menu"
    >
      {items.map((item, i) => (
        <div key={i}>
          {item.separatorBefore && <div className={styles.separator} role="separator" />}
          <button
            type="button"
            role="menuitem"
            className={`${styles.item} ${item.danger ? styles.danger : ''}`}
            onClick={() => { item.onClick(); onClose() }}
          >
            {item.icon && (
              <Icon name={item.icon} size={15} className={styles.icon} />
            )}
            {item.label}
          </button>
        </div>
      ))}
    </div>
  )
}
