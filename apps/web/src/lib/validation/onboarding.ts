import { z } from 'zod'

/** Per-step schemas. Messages follow the product voice: short, human, helpful. */

export const workspaceSchema = z.object({
  name: z.string().min(2, 'Enter a workspace name'),
  country: z.string().min(1, 'Select a country'),
  organization: z.string().min(2, 'Enter your government or organisation'),
  timezone: z.string().min(1, 'Select a timezone'),
  language: z.string().min(1, 'Select a language'),
  identifier: z
    .string()
    .regex(/^[a-z0-9-]*$/, 'Use lowercase letters, numbers and hyphens only')
    .optional()
    .or(z.literal('')),
})
export type WorkspaceValues = z.infer<typeof workspaceSchema>

export const organizationSchema = z.object({
  orgName: z.string().min(2, 'Enter the organisation name'),
  department: z.string().min(2, 'Enter a department'),
  sector: z.string().min(1, 'Select a sector'),
  country: z.string().min(1, 'Select a country'),
  reportingPeriod: z.string().min(1, 'Select a reporting period'),
  fiscalYear: z.string().min(1, 'Select a fiscal year'),
})
export type OrganizationValues = z.infer<typeof organizationSchema>

export const portfolioSchema = z.object({
  name: z.string().min(2, 'Enter a portfolio name'),
  description: z.string().max(400, 'Keep the description under 400 characters').optional().or(z.literal('')),
  reportingFrequency: z.string().min(1, 'Select a reporting frequency'),
  owner: z.string().min(2, 'Enter an owner'),
  strategicTheme: z.string().min(1, 'Select a strategic theme'),
})
export type PortfolioValues = z.infer<typeof portfolioSchema>

export const inviteEmailSchema = z
  .string()
  .min(1, 'Enter an email address')
  .email('Enter a valid email address')

/** Derives a URL-safe identifier suggestion from a workspace name. */
export function suggestIdentifier(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 32)
    .replace(/^-|-$/g, '')
}
