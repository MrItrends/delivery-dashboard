'use client'

import { create } from 'zustand'

export interface CoachStep {
  id: string
  /** CSS selector for the element to highlight. Omit for a centred step. */
  target?: string
  title: string
  body: string
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

// The tour mirrors the delivery model and the questions each screen answers
// (see docs/NORTH_STAR.md §5). Copy follows docs/UX_WRITING_STANDARD.md —
// plain, confident, no filler.
export const TOUR_STEPS: CoachStep[] = [
  {
    id: 'welcome',
    title: 'A quick tour',
    body: 'Two minutes on how delivery is tracked here. You can skip at any time.',
  },
  {
    id: 'home',
    target: '[data-coach="nav-home"]',
    placement: 'right',
    title: 'Home',
    body: 'Your delivery overview — what is on track, what is behind, and what needs you. This is where you start each day.',
  },
  {
    id: 'priority',
    target: '[data-coach="nav-priority"]',
    placement: 'right',
    title: 'Priority areas',
    body: 'The national priorities you are delivering. Everything else sits beneath a priority area, so this is where you begin.',
  },
  {
    id: 'hierarchy',
    target: '[data-coach="nav-projects"]',
    placement: 'right',
    title: 'Projects, interventions and activities',
    body: 'Each priority area is delivered through projects and interventions, and the day-to-day work is tracked as activities — assigned to one person, with a deadline.',
  },
  {
    id: 'create',
    target: '[data-coach="create"]',
    placement: 'bottom',
    title: 'Create anything',
    body: 'Add a priority area, project, intervention, activity or report from here. If something above it does not exist yet, it is created for you.',
  },
  {
    id: 'search',
    target: '[data-coach="search"]',
    placement: 'bottom',
    title: 'Search',
    body: 'Press ⌘K (or Ctrl K) to find any priority, project, person or report in seconds.',
  },
  {
    id: 'reports',
    target: '[data-coach="nav-reports"]',
    placement: 'right',
    title: 'Reports',
    body: 'Generate a brief for leadership from any level. The numbers come from your records — then export or publish it.',
  },
  {
    id: 'notifications',
    target: '[data-coach="notifications"]',
    placement: 'bottom',
    title: 'Notifications',
    body: 'Approvals, mentions and status changes that need your attention collect here.',
  },
  {
    id: 'finish',
    title: 'You are set up',
    body: 'Create your first priority area to begin tracking delivery. You can reopen this tour from Help.',
  },
]

interface TourState {
  running: boolean
  start: () => void
  stop: () => void
}

export const useTourStore = create<TourState>((set) => ({
  running: false,
  start: () => set({ running: true }),
  stop: () => set({ running: false }),
}))
