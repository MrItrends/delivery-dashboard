// =============================================================================
// Frame navigation config — the single source of truth for the app shell.
// =============================================================================

import type { IconName } from '@/components/primitives/Icon'
import type { ObjectStatus } from '@/components/primitives/StatusChip'

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
  { label: 'Search', href: '/search', icon: 'search' },
  { label: 'Team', href: '/team', icon: 'users' },
  { label: 'Notifications', href: '/notifications', icon: 'bell' },
]

export const SECONDARY_NAV: NavItem[] = [
  { label: 'Settings', href: '/settings', icon: 'settings' },
]

// Pinned objects — user configurable. Mocked until the API is wired.
export interface PinnedItem {
  id: string
  label: string
  href: string
  icon: IconName
  status?: ObjectStatus
}

export const PINNED_ITEMS: PinnedItem[] = [
  { id: 'pin1', label: 'Hospital Upgrade', href: '/projects/hospital-upgrade', icon: 'folder', status: 'critical' },
  { id: 'pin2', label: 'Digital Identity', href: '/interventions/digital-identity', icon: 'layers', status: 'at-risk' },
  { id: 'pin3', label: 'Q1 Portfolio Summary', href: '/reports/q1-summary', icon: 'document' },
  { id: 'pin4', label: 'Overdue activities', href: '/search?saved=overdue', icon: 'search' },
]

// Recent items — automatically generated, max 8.
export interface RecentItem {
  id: string
  label: string
  href: string
  icon: IconName
  kind: 'Project' | 'Report' | 'Search' | 'File'
}

export const RECENT_ITEMS: RecentItem[] = [
  { id: 'r1', label: 'Curriculum Reform', href: '/projects/curriculum-reform', icon: 'folder', kind: 'Project' },
  { id: 'r2', label: 'May Progress Report', href: '/reports/may-progress', icon: 'document', kind: 'Report' },
  { id: 'r3', label: 'Net Zero Buildings', href: '/projects/net-zero', icon: 'folder', kind: 'Project' },
  { id: 'r4', label: 'Blocked interventions', href: '/search?saved=blocked', icon: 'search', kind: 'Search' },
  { id: 'r5', label: 'Supplier Agreement.pdf', href: '/files/supplier-agreement', icon: 'document', kind: 'File' },
]

// Workspaces — for the switcher.
export interface WorkspaceOption {
  id: string
  name: string
  environment?: 'Production' | 'Staging' | 'Sandbox'
  initial: string
}

export const CURRENT_WORKSPACE: WorkspaceOption = {
  id: 'ws1',
  name: 'Cabinet Delivery Unit',
  environment: 'Production',
  initial: 'C',
}

export const WORKSPACES: WorkspaceOption[] = [
  CURRENT_WORKSPACE,
  { id: 'ws2', name: 'Health Transformation', environment: 'Production', initial: 'H' },
  { id: 'ws3', name: 'Education Delivery', environment: 'Production', initial: 'E' },
  { id: 'ws4', name: 'Demo Workspace', environment: 'Sandbox', initial: 'D' },
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

// Notifications — for the side panel.
export interface FrameNotification {
  id: string
  actor: string
  action: string
  target: string
  context: string
  time: string
  group: 'Today' | 'Yesterday' | 'Earlier'
  category: 'mention' | 'approval' | 'assignment' | 'status'
  unread: boolean
}

export const NOTIFICATIONS: FrameNotification[] = [
  { id: 'n1', actor: 'Sarah Evans', action: 'requested your approval on', target: 'Pilot Launch milestone', context: 'Digital Identity', time: '12m ago', group: 'Today', category: 'approval', unread: true },
  { id: 'n2', actor: 'Priya Sharma', action: 'mentioned you in', target: 'Risk Escalation', context: 'Net Zero Buildings', time: '1h ago', group: 'Today', category: 'mention', unread: true },
  { id: 'n3', actor: 'Ahmed Yusuf', action: 'assigned you', target: 'Draft delivery report', context: 'Hospital Upgrade', time: '3h ago', group: 'Today', category: 'assignment', unread: true },
  { id: 'n4', actor: 'Marcus Johnson', action: 'changed status to Blocked on', target: 'Supplier Onboarding', context: 'Digital Identity', time: 'Yesterday', group: 'Yesterday', category: 'status', unread: false },
  { id: 'n5', actor: 'Sarah Evans', action: 'approved', target: 'Q1 Milestone', context: 'Hospital Upgrade', time: 'Yesterday', group: 'Yesterday', category: 'approval', unread: false },
]
