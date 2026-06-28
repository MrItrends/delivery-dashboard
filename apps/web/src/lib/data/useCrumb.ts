'use client'

import { create } from 'zustand'

interface CrumbState {
  labels: Record<string, string>
  setLabel: (segment: string, label: string) => void
}

/** Lets a detail page tell the breadcrumb the human name for an id segment. */
export const useCrumbStore = create<CrumbState>((set) => ({
  labels: {},
  setLabel: (segment, label) =>
    set((s) => (s.labels[segment] === label ? s : { labels: { ...s.labels, [segment]: label } })),
}))
