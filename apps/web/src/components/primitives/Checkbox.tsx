'use client'

import { forwardRef, useId } from 'react'
import { Icon } from './Icon'
import styles from './Checkbox.module.css'

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id: providedId, className = '', ...props }, ref) => {
    const generatedId = useId()
    const id = providedId ?? generatedId

    return (
      <label htmlFor={id} className={`${styles.wrap} ${className}`}>
        <span className={styles.box}>
          <input
            ref={ref}
            id={id}
            type="checkbox"
            className={styles.input}
            {...props}
          />
          <span className={styles.visual} aria-hidden="true">
            <Icon name="check" size={14} className={styles.check} />
          </span>
        </span>
        <span className={styles.label}>{label}</span>
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'
