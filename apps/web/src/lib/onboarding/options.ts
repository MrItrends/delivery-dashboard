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

// Sectors mirror Nigerian federal ministry portfolios.
export const SECTORS: SelectOption[] = [
  { value: 'health', label: 'Health' },
  { value: 'education', label: 'Education' },
  { value: 'works-housing', label: 'Works & Housing' },
  { value: 'power', label: 'Power' },
  { value: 'agriculture', label: 'Agriculture & Food Security' },
  { value: 'water', label: 'Water Resources' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'finance', label: 'Finance & National Planning' },
  { value: 'humanitarian', label: 'Humanitarian Affairs & Poverty Reduction' },
  { value: 'digital', label: 'Communications & Digital Economy' },
  { value: 'interior', label: 'Interior & Security' },
  { value: 'environment', label: 'Environment' },
  { value: 'other', label: 'Other' },
]

// Currency — Naira first (see NORTH_STAR §3).
export const CURRENCIES: SelectOption[] = [
  { value: 'NGN', label: '₦ Nigerian Naira' },
  { value: 'USD', label: '$ US Dollar' },
  { value: 'GBP', label: '£ British Pound' },
  { value: 'EUR', label: '€ Euro' },
  { value: 'GHS', label: '₵ Ghanaian Cedi' },
  { value: 'KES', label: 'KSh Kenyan Shilling' },
  { value: 'ZAR', label: 'R South African Rand' },
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

// National priorities framed for Nigeria.
export const STRATEGIC_THEMES: SelectOption[] = [
  { value: 'economic-growth', label: 'Economic Growth & Diversification' },
  { value: 'food-security', label: 'Food Security' },
  { value: 'health-outcomes', label: 'Health Outcomes' },
  { value: 'human-capital', label: 'Education & Human Capital' },
  { value: 'power-energy', label: 'Power & Energy' },
  { value: 'infrastructure', label: 'Infrastructure Delivery' },
  { value: 'security-justice', label: 'Security & Justice' },
  { value: 'digital-economy', label: 'Digital Economy' },
  { value: 'poverty-reduction', label: 'Poverty Reduction' },
  { value: 'other', label: 'Other' },
]

// Roles — the four canonical role types, with the detail shown on the selection cards.
export interface RoleDefinition {
  id: string
  title: string
  description: string
  responsibilities: string
}

// The four canonical roles (TBI deck, p.23). See docs/NORTH_STAR.md §4.
export const ROLES: RoleDefinition[] = [
  {
    id: 'admin',
    title: 'Administrator',
    description: 'Run the dashboard end to end.',
    responsibilities: 'Approve milestones, manage financiers, manage people and settings',
  },
  {
    id: 'priority-area-lead',
    title: 'Priority area lead',
    description: 'Lead or co-lead a priority area.',
    responsibilities: 'Create and edit its actions and milestones, manage its people',
  },
  {
    id: 'intervention-lead',
    title: 'Intervention lead',
    description: 'Lead or co-lead an intervention.',
    responsibilities: 'Create and edit its actions and milestones, manage its people',
  },
  {
    id: 'regular',
    title: 'Regular user',
    description: 'Contribute to delivery.',
    responsibilities: 'Update your own actions and raise issues within your intervention',
  },
]
