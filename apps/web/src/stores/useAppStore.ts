import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  role: string
  avatarUrl?: string
}

interface Workspace {
  id: string
  name: string
}

type Density = 'comfortable' | 'compact'

interface AppStore {
  // Auth
  user: User | null
  setUser: (user: User | null) => void

  // Workspace
  workspace: Workspace | null
  setWorkspace: (workspace: Workspace | null) => void

  // UI Preferences
  density: Density
  setDensity: (density: Density) => void
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void

  // Inspector
  inspectorOpen: boolean
  setInspectorOpen: (open: boolean) => void
  inspectorExpanded: boolean
  setInspectorExpanded: (expanded: boolean) => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),

      workspace: null,
      setWorkspace: (workspace) => set({ workspace }),

      density: 'comfortable',
      setDensity: (density) => set({ density }),

      sidebarCollapsed: false,
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),

      inspectorOpen: false,
      setInspectorOpen: (inspectorOpen) => set({ inspectorOpen }),

      inspectorExpanded: false,
      setInspectorExpanded: (inspectorExpanded) => set({ inspectorExpanded }),
    }),
    {
      name: 'delivery-dashboard-app',
      partialize: (state) => ({
        density: state.density,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    }
  )
)
