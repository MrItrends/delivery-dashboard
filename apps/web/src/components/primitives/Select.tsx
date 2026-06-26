'use client'

import { forwardRef, useId } from 'react'
import { Icon } from './Icon'
import type { SelectOption } from '@/lib/onboarding/options'
import styles from './Select.module.css'

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label: string
  options: SelectOption[]
  placeholder?: string
  hint?: string
  error?: string
  hideLabel?: boolean
}

/**
 * Native <select> styled to match TextField. Native is intentional:
 * it gives correct keyboard, screen-reader and mobile behaviour for free,
 * which matters for a government-grade form.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      placeholder = 'Select…',
      hint,
      error,
      hideLabel = false,
      id: providedId,
      className = '',
      disabled,
      value,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const id = providedId ?? generatedId
    const messageId = `${id}-message`
    const message = error ?? hint
    const isEmpty = value === '' || value === undefined

    return (
      <div className={`${styles.field} ${className}`}>
        <label
          htmlFor={id}
          className={`${styles.label} ${hideLabel ? styles.labelHidden : ''}`}
        >
          {label}
        </label>

        <div
          className={[
            styles.selectWrap,
            error ? styles.error : '',
            disabled ? styles.disabled : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <select
            ref={ref}
            id={id}
            className={`${styles.select} ${isEmpty ? styles.placeholder : ''}`}
            disabled={disabled}
            value={value}
            aria-invalid={!!error}
            aria-describedby={message ? messageId : undefined}
            {...props}
          >
            <option value="" disabled>
              {placeholder}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className={styles.chevron} aria-hidden="true">
            <Icon name="arrow-right" size={16} className={styles.chevronIcon} />
          </span>
        </div>

        {message && (
          <p
            id={messageId}
            className={`${styles.message} ${error ? styles.messageError : ''}`}
            role={error ? 'alert' : undefined}
          >
            {message}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
