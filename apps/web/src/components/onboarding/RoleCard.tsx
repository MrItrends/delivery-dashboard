'use client'

import { Icon } from '@/components/primitives/Icon'
import type { RoleDefinition } from '@/lib/onboarding/options'
import styles from './RoleCard.module.css'

interface RoleCardProps {
  role: RoleDefinition
  selected: boolean
  onSelect: () => void
}

export function RoleCard({ role, selected, onSelect }: RoleCardProps) {
  return (
    <label className={`${styles.card} ${selected ? styles.selected : ''}`}>
      <input
        type="radio"
        name="role"
        value={role.id}
        checked={selected}
        onChange={onSelect}
        className={styles.input}
      />
      <span className={styles.body}>
        <span className={styles.header}>
          <span className={styles.title}>{role.title}</span>
          <span className={styles.indicator} aria-hidden="true">
            {selected && <Icon name="check" size={13} />}
          </span>
        </span>
        <span className={styles.description}>{role.description}</span>
        <span className={styles.responsibilities}>{role.responsibilities}</span>
      </span>
    </label>
  )
}
