// =============================================================================
// Frame navigation config — the single source of truth for the app shell.
// =============================================================================

import type { IconName } from '@/components/primitives/Icon'

export interface NavItem {
  label: string
  href: string
  icon: IconName
}

// Primary navigation. Activities are intentionally absent — they live inside
// Projects and Interventions, never at workspace level.
export const PRIMARY_NAV: NavItem[] = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'Portfolio', href: '/portfolio', icon: 'grid' },
  { label: 'Priority Areas', href: '/priority-areas', icon: 'target' },
  { label: 'Projects', href: '/projects', icon: 'folder' },
  { label: 'Interventions', href: '/interventions', icon: 'layers' },
  { label: 'Calendar', href: '/calendar', icon: 'calendar' },
  { label: 'Reports', href: '/reports', icon: 'document' },
  { label: 'Team', href: '/team', icon: 'users' },
]

export const SECONDARY_NAV: NavItem[] = [
  { label: 'Settings', href: '/settings', icon: 'settings' },
]

// Breadcrumb labels per route segment (frame derives the trail automatically).
export const ROUTE_LABELS: Record<string, string> = {
  '': 'Home',
  portfolio: 'Portfolio',
  'priority-areas': 'Priority Areas',
  projects: 'Projects',
  interventions: 'Interventions',
  calendar: 'Calendar',
  reports: 'Reports',
  search: 'Search',
  team: 'Team',
  notifications: 'Notifications',
  settings: 'Settings',
}
