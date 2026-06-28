/** Keep only digits from a typed string (for money fields). */
export function digitsOnly(s: string): string {
  return s.replace(/[^\d]/g, '')
}

/** Format a number/string as grouped thousands (e.g. 50000000 → "50,000,000"). */
export function formatThousands(v: string | number | null | undefined): string {
  if (v === null || v === undefined || v === '') return ''
  const d = String(v).replace(/[^\d]/g, '')
  if (!d) return ''
  return Number(d).toLocaleString('en-US')
}
