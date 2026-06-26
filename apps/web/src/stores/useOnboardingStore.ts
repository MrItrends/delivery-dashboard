import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Invite {
  id: string
  email: string
  role: string
  permission: string
}

export interface WorkspaceData {
  name: string
  country: string
  organization: string
  timezone: string
  language: string
  identifier: string
}

export interface OrganizationData {
  orgName: string
  department: string
  sector: string
  country: string
  reportingPeriod: string
  fiscalYear: string
}

export interface PortfolioData {
  name: string
  description: string
  reportingFrequency: string
  owner: string
  strategicTheme: string
}

// 0=Workspace 1=Organization 2=Role 3=Team 4=Portfolio 5=Complete
export type SetupStep = 0 | 1 | 2 | 3 | 4 | 5

interface OnboardingStore {
  hasHydrated: boolean
  step: SetupStep
  startedAt: string | null

  workspace: WorkspaceData
  organization: OrganizationData
  role: string
  invites: Invite[]
  portfolio: PortfolioData
  /** Logo preview is kept in-memory only (never persisted to storage). */
  logoPreview: string | null

  setStep: (step: SetupStep) => void
  patchWorkspace: (data: Partial<WorkspaceData>) => void
  patchOrganization: (data: Partial<OrganizationData>) => void
  setRole: (role: string) => void
  addInvite: (invite: Omit<Invite, 'id'>) => void
  updateInvite: (id: string, data: Partial<Invite>) => void
  removeInvite: (id: string) => void
  patchPortfolio: (data: Partial<PortfolioData>) => void
  setLogoPreview: (preview: string | null) => void

  reset: () => void
}

const emptyWorkspace: WorkspaceData = {
  name: '',
  country: '',
  organization: '',
  timezone: '',
  language: 'en-GB',
  identifier: '',
}

const emptyOrganization: OrganizationData = {
  orgName: '',
  department: '',
  sector: '',
  country: '',
  reportingPeriod: 'quarterly',
  fiscalYear: 'apr-mar',
}

const emptyPortfolio: PortfolioData = {
  name: '',
  description: '',
  reportingFrequency: 'monthly',
  owner: '',
  strategicTheme: '',
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      hasHydrated: false,
      step: 0,
      startedAt: null,

      workspace: emptyWorkspace,
      organization: emptyOrganization,
      role: '',
      invites: [],
      portfolio: emptyPortfolio,
      logoPreview: null,

      setStep: (step) =>
        set((s) => ({ step, startedAt: s.startedAt ?? new Date().toISOString() })),

      patchWorkspace: (data) =>
        set((s) => ({ workspace: { ...s.workspace, ...data } })),

      patchOrganization: (data) =>
        set((s) => ({ organization: { ...s.organization, ...data } })),

      setRole: (role) => set({ role }),

      addInvite: (invite) =>
        set((s) => ({
          invites: [
            ...s.invites,
            { ...invite, id: Math.random().toString(36).slice(2) },
          ],
        })),

      updateInvite: (id, data) =>
        set((s) => ({
          invites: s.invites.map((i) => (i.id === id ? { ...i, ...data } : i)),
        })),

      removeInvite: (id) =>
        set((s) => ({ invites: s.invites.filter((i) => i.id !== id) })),

      patchPortfolio: (data) =>
        set((s) => ({ portfolio: { ...s.portfolio, ...data } })),

      setLogoPreview: (logoPreview) => set({ logoPreview }),

      reset: () =>
        set({
          step: 0,
          startedAt: null,
          workspace: emptyWorkspace,
          organization: emptyOrganization,
          role: '',
          invites: [],
          portfolio: emptyPortfolio,
          logoPreview: null,
        }),
    }),
    {
      name: 'tbi-onboarding',
      // logoPreview and hasHydrated are intentionally excluded from storage.
      partialize: (s) => ({
        step: s.step,
        startedAt: s.startedAt,
        workspace: s.workspace,
        organization: s.organization,
        role: s.role,
        invites: s.invites,
        portfolio: s.portfolio,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state.hasHydrated = true
      },
    }
  )
)
