// =============================================================================
// Onboarding option sets — kept in one place so every dropdown stays consistent.
// =============================================================================

export interface SelectOption {
  value: string
  label: string
}

// Nigeria first — the platform's primary frame of reference (see NORTH_STAR §3).
export const COUNTRIES: SelectOption[] = [
  { value: 'ng', label: 'Nigeria' },
  { value: 'gh', label: 'Ghana' },
  { value: 'ke', label: 'Kenya' },
  { value: 'za', label: 'South Africa' },
  { value: 'rw', label: 'Rwanda' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'ie', label: 'Ireland' },
  { value: 'sg', label: 'Singapore' },
  { value: 'ae', label: 'United Arab Emirates' },
  { value: 'sa', label: 'Saudi Arabia' },
  { value: 'in', label: 'India' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'other', label: 'Other' },
]

export const LANGUAGES: SelectOption[] = [
  { value: 'en-GB', label: 'English (UK)' },
  { value: 'en-US', label: 'English (US)' },
  { value: 'fr', label: 'French' },
  { value: 'es', label: 'Spanish' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ar', label: 'Arabic' },
  { value: 'sw', label: 'Swahili' },
  { value: 'de', label: 'German' },
]

export const TIMEZONES: SelectOption[] = [
  { value: 'Africa/Lagos', label: '(GMT+01:00) Lagos, West Africa' },
  { value: 'Africa/Nairobi', label: '(GMT+03:00) Nairobi, East Africa' },
  { value: 'Europe/London', label: '(GMT+00:00) London' },
  { value: 'Europe/Dublin', label: '(GMT+00:00) Dublin' },
  { value: 'Europe/Paris', label: '(GMT+01:00) Paris, Berlin, Madrid' },
  { value: 'Asia/Dubai', label: '(GMT+04:00) Dubai, Abu Dhabi' },
  { value: 'Asia/Karachi', label: '(GMT+05:00) Karachi' },
  { value: 'Asia/Kolkata', label: '(GMT+05:30) India' },
  { value: 'Asia/Singapore', label: '(GMT+08:00) Singapore' },
  { value: 'Australia/Sydney', label: '(GMT+10:00) Sydney' },
  { value: 'America/New_York', label: '(GMT−05:00) Eastern Time' },
  { value: 'America/Chicago', label: '(GMT−06:00) Central Time' },
  { value: 'America/Los_Angeles', label: '(GMT−08:00) Pacific Time' },
]

export const SECTORS: SelectOption[] = [
  { value: 'health', label: 'Health & Social Care' },
  { value: 'education', label: 'Education' },
  { value: 'infrastructure', label: 'Infrastructure & Transport' },
  { value: 'justice', label: 'Justice & Home Affairs' },
  { value: 'finance', label: 'Finance & Treasury' },
  { value: 'defence', label: 'Defence & Security' },
  { value: 'environment', label: 'Environment & Climate' },
  { value: 'digital', label: 'Digital & Technology' },
  { value: 'economy', label: 'Economy & Trade' },
  { value: 'housing', label: 'Housing & Communities' },
  { value: 'agriculture', label: 'Agriculture & Rural Affairs' },
  { value: 'foreign', label: 'Foreign Affairs' },
  { value: 'other', label: 'Other' },
]

export const REPORTING_PERIODS: SelectOption[] = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'biannual', label: 'Every 6 months' },
  { value: 'annual', label: 'Annually' },
]

export const FISCAL_YEARS: SelectOption[] = [
  { value: 'apr-mar', label: 'April – March' },
  { value: 'jan-dec', label: 'January – December' },
  { value: 'jul-jun', label: 'July – June' },
  { value: 'oct-sep', label: 'October – September' },
]

export const REPORTING_FREQUENCIES: SelectOption[] = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'fortnightly', label: 'Fortnightly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
]

export const STRATEGIC_THEMES: SelectOption[] = [
  { value: 'economic-growth', label: 'Economic Growth' },
  { value: 'public-service-reform', label: 'Public Service Reform' },
  { value: 'digital-transformation', label: 'Digital Transformation' },
  { value: 'health-outcomes', label: 'Health Outcomes' },
  { value: 'education-outcomes', label: 'Education Outcomes' },
  { value: 'net-zero', label: 'Net Zero & Climate' },
  { value: 'national-security', label: 'National Security' },
  { value: 'infrastructure', label: 'Infrastructure Delivery' },
  { value: 'other', label: 'Other' },
]

// Invite access levels — mirrors the permission model (Observer→Admin)
export const INVITE_PERMISSIONS: SelectOption[] = [
  { value: 'view', label: 'Can view' },
  { value: 'edit', label: 'Can edit' },
  { value: 'manage', label: 'Can manage' },
  { value: 'admin', label: 'Full access' },
]

// Roles — the eight role types, with the detail shown on the selection cards.
export interface RoleDefinition {
  id: string
  title: string
  description: string
  responsibilities: string
}

export const ROLES: RoleDefinition[] = [
  {
    id: 'executive',
    title: 'Executive',
    description: 'Oversee delivery across the whole organisation.',
    responsibilities: 'Strategic oversight, portfolio health, executive reporting',
  },
  {
    id: 'portfolio-manager',
    title: 'Portfolio Manager',
    description: 'Manage a portfolio of priorities and programmes.',
    responsibilities: 'Portfolio performance, prioritisation, cross-programme risk',
  },
  {
    id: 'programme-manager',
    title: 'Programme Manager',
    description: 'Coordinate delivery across related projects.',
    responsibilities: 'Programme governance, decisions, milestone assurance',
  },
  {
    id: 'project-manager',
    title: 'Project Manager',
    description: 'Run individual projects and interventions.',
    responsibilities: 'Project delivery, activities, budgets, day-to-day execution',
  },
  {
    id: 'delivery-team',
    title: 'Delivery Team',
    description: 'Deliver the work and update progress.',
    responsibilities: 'Completing activities, evidence, status updates',
  },
  {
    id: 'finance',
    title: 'Finance',
    description: 'Oversee budgets and financial governance.',
    responsibilities: 'Budget allocation, forecasts, expenditure approvals',
  },
  {
    id: 'observer',
    title: 'Observer',
    description: 'View delivery without making changes.',
    responsibilities: 'Read-only access to dashboards and reports',
  },
  {
    id: 'administrator',
    title: 'Administrator',
    description: 'Manage the workspace, people and settings.',
    responsibilities: 'User management, permissions, integrations, security',
  },
]
