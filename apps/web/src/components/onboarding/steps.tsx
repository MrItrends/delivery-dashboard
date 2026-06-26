'use client'

import { forwardRef, useImperativeHandle, useState } from 'react'
import { TextField } from '@/components/primitives/TextField'
import { Select } from '@/components/primitives/Select'
import { Icon } from '@/components/primitives/Icon'
import { useOnboardingStore } from '@/stores/useOnboardingStore'
import {
  workspaceSchema,
  organizationSchema,
  portfolioSchema,
  suggestIdentifier,
} from '@/lib/validation/onboarding'
import {
  COUNTRIES,
  LANGUAGES,
  TIMEZONES,
  SECTORS,
  REPORTING_PERIODS,
  FISCAL_YEARS,
  REPORTING_FREQUENCIES,
  STRATEGIC_THEMES,
  ROLES,
} from '@/lib/onboarding/options'
import { StepHeading, Fields, FieldGrid, FieldFull } from './FormLayout'
import { RoleCard } from './RoleCard'
import { AvatarUpload } from './AvatarUpload'
import { InviteList } from './InviteList'
import type { ZodObject } from 'zod'
import styles from './steps.module.css'

export interface StepHandle {
  validate: () => boolean
}

type Errs = Record<string, string | undefined>

function collectErrors(schema: ZodObject<never>, data: unknown): Errs | null {
  const res = schema.safeParse(data)
  if (res.success) return null
  const e: Errs = {}
  for (const issue of res.error.issues) {
    const key = String(issue.path[0])
    if (!e[key]) e[key] = issue.message
  }
  return e
}

/* ===========================================================================
   STEP 1 — WORKSPACE
   =========================================================================== */
export const WorkspaceStep = forwardRef<StepHandle>(function WorkspaceStep(_, ref) {
  const workspace = useOnboardingStore((s) => s.workspace)
  const patch = useOnboardingStore((s) => s.patchWorkspace)
  const [errors, setErrors] = useState<Errs>({})

  useImperativeHandle(ref, () => ({
    validate() {
      const e = collectErrors(workspaceSchema as unknown as ZodObject<never>, workspace)
      setErrors(e ?? {})
      return e === null
    },
  }))

  const onChange = (key: keyof typeof workspace) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    patch({ [key]: e.target.value })
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }))
  }

  const suggestion = suggestIdentifier(workspace.name) || 'your-workspace'

  return (
    <>
      <StepHeading
        title="Create your workspace"
        description="Your workspace is the home for all delivery across your organisation."
      />
      <Fields>
        <TextField
          label="Workspace name"
          placeholder="e.g. Cabinet Delivery Unit"
          value={workspace.name}
          onChange={onChange('name')}
          error={errors.name}
          autoFocus
        />
        <FieldGrid>
          <Select
            label="Country"
            options={COUNTRIES}
            value={workspace.country}
            onChange={onChange('country')}
            placeholder="Select a country"
            error={errors.country}
          />
          <TextField
            label="Government / Organisation"
            placeholder="e.g. Government of …"
            value={workspace.organization}
            onChange={onChange('organization')}
            error={errors.organization}
          />
          <Select
            label="Timezone"
            options={TIMEZONES}
            value={workspace.timezone}
            onChange={onChange('timezone')}
            placeholder="Select a timezone"
            error={errors.timezone}
          />
          <Select
            label="Language"
            options={LANGUAGES}
            value={workspace.language}
            onChange={onChange('language')}
            error={errors.language}
          />
        </FieldGrid>
        <div className={styles.textareaField}>
          <TextField
            label="Workspace identifier (optional)"
            placeholder={suggestion}
            value={workspace.identifier}
            onChange={onChange('identifier')}
            error={errors.identifier}
          />
          <p className={styles.identifierHint}>
            Used in links: <code>app.tbi.org/{workspace.identifier || suggestion}</code>
          </p>
        </div>
      </Fields>
    </>
  )
})

/* ===========================================================================
   STEP 2 — ORGANIZATION
   =========================================================================== */
export const OrganizationStep = forwardRef<StepHandle>(function OrganizationStep(_, ref) {
  const organization = useOnboardingStore((s) => s.organization)
  const patch = useOnboardingStore((s) => s.patchOrganization)
  const logoPreview = useOnboardingStore((s) => s.logoPreview)
  const setLogoPreview = useOnboardingStore((s) => s.setLogoPreview)
  const [errors, setErrors] = useState<Errs>({})

  useImperativeHandle(ref, () => ({
    validate() {
      const e = collectErrors(organizationSchema as unknown as ZodObject<never>, organization)
      setErrors(e ?? {})
      return e === null
    },
  }))

  const onChange = (key: keyof typeof organization) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    patch({ [key]: e.target.value })
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }))
  }

  return (
    <>
      <StepHeading
        title="Organisation details"
        description="This context shapes reporting periods, fiscal alignment and how your organisation appears across the platform."
      />
      <Fields>
        <FieldGrid>
          <TextField
            label="Organisation name"
            placeholder="e.g. Ministry of Health"
            value={organization.orgName}
            onChange={onChange('orgName')}
            error={errors.orgName}
            autoFocus
          />
          <TextField
            label="Department"
            placeholder="e.g. Delivery Unit"
            value={organization.department}
            onChange={onChange('department')}
            error={errors.department}
          />
          <Select
            label="Sector"
            options={SECTORS}
            value={organization.sector}
            onChange={onChange('sector')}
            placeholder="Select a sector"
            error={errors.sector}
          />
          <Select
            label="Country"
            options={COUNTRIES}
            value={organization.country}
            onChange={onChange('country')}
            placeholder="Select a country"
            error={errors.country}
          />
          <Select
            label="Default reporting period"
            options={REPORTING_PERIODS}
            value={organization.reportingPeriod}
            onChange={onChange('reportingPeriod')}
            error={errors.reportingPeriod}
          />
          <Select
            label="Fiscal year"
            options={FISCAL_YEARS}
            value={organization.fiscalYear}
            onChange={onChange('fiscalYear')}
            error={errors.fiscalYear}
          />
        </FieldGrid>
        <AvatarUpload
          label="Organisation logo (optional)"
          value={logoPreview}
          onChange={setLogoPreview}
          hint="PNG, JPG or SVG, up to 2MB."
        />
      </Fields>
    </>
  )
})

/* ===========================================================================
   STEP 3 — ROLE
   =========================================================================== */
export const RoleStep = forwardRef<StepHandle>(function RoleStep(_, ref) {
  const role = useOnboardingStore((s) => s.role)
  const setRole = useOnboardingStore((s) => s.setRole)
  const [error, setError] = useState<string | null>(null)

  useImperativeHandle(ref, () => ({
    validate() {
      if (!role) {
        setError('Select a role to continue')
        return false
      }
      setError(null)
      return true
    },
  }))

  return (
    <>
      <StepHeading
        title="What's your role?"
        description="We'll tailor your workspace, default views and permissions to how you work. You can change this later."
      />
      {error && (
        <p style={{ marginBottom: 'var(--space-4)', color: 'var(--color-status-critical-text)', fontSize: 'var(--font-size-sm)' }} role="alert">
          {error}
        </p>
      )}
      <div className={styles.roleGrid} role="radiogroup" aria-label="Select your role">
        {ROLES.map((r) => (
          <RoleCard
            key={r.id}
            role={r}
            selected={role === r.id}
            onSelect={() => { setRole(r.id); setError(null) }}
          />
        ))}
      </div>
    </>
  )
})

/* ===========================================================================
   STEP 4 — TEAM
   =========================================================================== */
export const TeamStep = forwardRef<StepHandle>(function TeamStep(_, ref) {
  const invites = useOnboardingStore((s) => s.invites)
  const addInvite = useOnboardingStore((s) => s.addInvite)
  const updateInvite = useOnboardingStore((s) => s.updateInvite)
  const removeInvite = useOnboardingStore((s) => s.removeInvite)
  const role = useOnboardingStore((s) => s.role)

  // Permission ceiling — only Administrators and Executives can grant full access.
  const canGrantAdmin = role === 'administrator' || role === 'executive'
  const roleLabel = ROLES.find((r) => r.id === role)?.title ?? 'your role'

  useImperativeHandle(ref, () => ({ validate: () => true }))

  return (
    <>
      <StepHeading
        title="Invite your team"
        description="Bring in the people you deliver with. They'll get access as soon as they accept."
      />
      <Fields>
        <InviteList
          invites={invites}
          onAdd={addInvite}
          onUpdate={updateInvite}
          onRemove={removeInvite}
          canGrantAdmin={canGrantAdmin}
        />
        {!canGrantAdmin && (
          <p className={styles.note}>
            <Icon name="shield" size={15} className={styles.noteIcon} />
            <span>
              As {roleLabel}, you can invite collaborators up to your own access
              level. An administrator can grant full access later.
            </span>
          </p>
        )}
      </Fields>
    </>
  )
})

/* ===========================================================================
   STEP 5 — PORTFOLIO
   =========================================================================== */
export const PortfolioStep = forwardRef<StepHandle>(function PortfolioStep(_, ref) {
  const portfolio = useOnboardingStore((s) => s.portfolio)
  const patch = useOnboardingStore((s) => s.patchPortfolio)
  const [errors, setErrors] = useState<Errs>({})

  useImperativeHandle(ref, () => ({
    validate() {
      const e = collectErrors(portfolioSchema as unknown as ZodObject<never>, portfolio)
      setErrors(e ?? {})
      return e === null
    },
  }))

  const onChange = (key: keyof typeof portfolio) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    patch({ [key]: e.target.value })
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }))
  }

  return (
    <>
      <StepHeading
        title="Create your first portfolio"
        description="A portfolio groups the strategic priorities you're accountable for. It's the top of your delivery hierarchy."
      />
      <Fields>
        <TextField
          label="Portfolio name"
          placeholder="e.g. National Health Priorities"
          value={portfolio.name}
          onChange={onChange('name')}
          error={errors.name}
          autoFocus
        />
        <div className={styles.textareaField}>
          <label className={styles.textareaLabel} htmlFor="portfolio-description">
            Description (optional)
          </label>
          <textarea
            id="portfolio-description"
            className={styles.textarea}
            placeholder="What does this portfolio set out to achieve?"
            value={portfolio.description}
            onChange={onChange('description')}
          />
        </div>
        <FieldGrid>
          <Select
            label="Reporting frequency"
            options={REPORTING_FREQUENCIES}
            value={portfolio.reportingFrequency}
            onChange={onChange('reportingFrequency')}
            error={errors.reportingFrequency}
          />
          <TextField
            label="Owner"
            placeholder="e.g. Ahmed Yusuf"
            value={portfolio.owner}
            onChange={onChange('owner')}
            error={errors.owner}
          />
          <FieldFull>
            <Select
              label="Strategic theme"
              options={STRATEGIC_THEMES}
              value={portfolio.strategicTheme}
              onChange={onChange('strategicTheme')}
              placeholder="Select a strategic theme"
              error={errors.strategicTheme}
            />
          </FieldFull>
        </FieldGrid>
      </Fields>
    </>
  )
})
