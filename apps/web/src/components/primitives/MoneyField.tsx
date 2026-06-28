'use client'

import { TextField } from './TextField'
import { formatThousands, digitsOnly } from '@/lib/money'

interface MoneyFieldProps {
  label: string
  /** Stored value is a plain digit string (no commas). */
  value: string
  onChange: (digits: string) => void
  placeholder?: string
}

/** Amount input that shows thousands separators while typing. */
export function MoneyField({ label, value, onChange, placeholder }: MoneyFieldProps) {
  return (
    <TextField
      label={label}
      value={formatThousands(value)}
      placeholder={placeholder}
      onChange={(e) => onChange(digitsOnly(e.target.value))}
    />
  )
}
