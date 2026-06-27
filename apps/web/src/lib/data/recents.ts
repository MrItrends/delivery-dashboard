'use client'

const KEY = 'tbi-recent-nav'

export interface RecentItem {
  label: string
  href: string
  type: string
}

export function getRecents(): RecentItem[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]') as RecentItem[]
  } catch {
    return []
  }
}

export function pushRecent(item: RecentItem) {
  if (typeof window === 'undefined') return
  const next = [item, ...getRecents().filter((r) => r.href !== item.href)].slice(0, 6)
  localStorage.setItem(KEY, JSON.stringify(next))
}
