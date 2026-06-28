'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { StatusChip, type ObjectStatus } from '@/components/primitives/StatusChip'
import { Avatar } from '@/components/primitives/Avatar'
import type { SelectOption } from '@/lib/onboarding/options'
import type { Row } from './crud'
import t from '@/components/priority-area/ProjectsTable.module.css'

// --- shared option sets ----------------------------------------------------
export const HEALTH_OPTIONS: SelectOption[] = [
  { value: 'healthy', label: 'Healthy' },
  { value: 'at-risk', label: 'At risk' },
  { value: 'critical', label: 'Critical' },
]
export const LIFECYCLE_OPTIONS: SelectOption[] = [
  { value: 'planned', label: 'Planned' },
  { value: 'active', label: 'Active' },
  { value: 'blocked', label: 'Blocked' },
  { value: 'at-risk', label: 'At risk' },
  { value: 'complete', label: 'Complete' },
]
export const PRIORITY_OPTIONS: SelectOption[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' },
]

// --- cell helpers ----------------------------------------------------------
const nameCol = (size = 240): ColumnDef<Row, unknown> => ({
  accessorKey: 'name', header: 'Name', size,
  cell: ({ row }) => <span className={t.name}>{String(row.original.name ?? '')}</span>,
})
const ownerCol = (): ColumnDef<Row, unknown> => ({
  accessorKey: 'owner', header: 'Owner', size: 160,
  cell: ({ row }) => row.original.owner
    ? <span className={t.owner}><Avatar name={String(row.original.owner)} size="xs" /><span className={t.ownerName}>{String(row.original.owner)}</span></span>
    : <span className={t.muted}>—</span>,
})
const statusCol = (key: string, header: string, size = 110): ColumnDef<Row, unknown> => ({
  accessorKey: key, header, size,
  cell: ({ row }) => <StatusChip status={(row.original[key] as ObjectStatus) ?? 'planned'} size="sm" />,
})
const textCol = (key: string, header: string, size = 130): ColumnDef<Row, unknown> => ({
  accessorKey: key, header, size,
  cell: ({ row }) => <span className={t.muted}>{(row.original[key] as string) || '—'}</span>,
})
const priorityCol = (): ColumnDef<Row, unknown> => ({
  accessorKey: 'priority', header: 'Priority', size: 100,
  cell: ({ row }) => {
    const p = String(row.original.priority ?? 'medium')
    return <span className={t.muted} style={{ textTransform: 'capitalize' }}>{p}</span>
  },
})
const progressCol = (): ColumnDef<Row, unknown> => ({
  accessorKey: 'progress', header: 'Progress', size: 90,
  cell: ({ row }) => <span className={t.muted}>{Number(row.original.progress ?? 0)}%</span>,
})

// --- config types ----------------------------------------------------------
export interface ParentRef { key: string; table: string; label: string }
export interface FieldDef {
  name: string
  label: string
  type: 'text' | 'textarea' | 'select' | 'date' | 'number'
  options?: SelectOption[]
  placeholder?: string
  required?: boolean
}
export interface EntityConfig {
  key: string
  table: string
  singular: string
  plural: string
  route: string
  parent?: ParentRef
  childKey?: string
  headerStatusField?: string
  columns: ColumnDef<Row, unknown>[]
  fields: FieldDef[]
  defaults: Record<string, unknown>
}

// --- the four levels -------------------------------------------------------
export const ENTITIES: Record<string, EntityConfig> = {
  // Portfolio is listed via its own screen (workspace-scoped create), but its
  // detail drill-down reuses the generic engine.
  portfolio: {
    key: 'portfolio', table: 'portfolios', singular: 'Portfolio', plural: 'Portfolios',
    route: '/portfolio', childKey: 'priorityArea', headerStatusField: 'health',
    columns: [nameCol(), ownerCol(), statusCol('health', 'Health'), statusCol('budget_health', 'Budget'), statusCol('risk_level', 'Risk'), textCol('updated_at', 'Updated', 100)],
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'owner', label: 'Owner', type: 'text' },
      { name: 'reporting_period', label: 'Reporting period', type: 'text' },
      { name: 'health', label: 'Overall health', type: 'select', options: HEALTH_OPTIONS },
      { name: 'budget_health', label: 'Budget health', type: 'select', options: HEALTH_OPTIONS },
      { name: 'risk_level', label: 'Risk level', type: 'select', options: HEALTH_OPTIONS },
    ],
    defaults: { health: 'healthy', budget_health: 'healthy', risk_level: 'healthy' },
  },

  priorityArea: {
    key: 'priorityArea', table: 'priority_areas', singular: 'Priority area', plural: 'Priority areas',
    route: '/priority-areas', parent: { key: 'portfolio_id', table: 'portfolios', label: 'Portfolio' },
    childKey: 'project', headerStatusField: 'health',
    columns: [nameCol(), ownerCol(), statusCol('health', 'Health'), statusCol('budget_health', 'Budget'), statusCol('target_status', 'Target'), textCol('updated_at', 'Updated', 100)],
    fields: [
      { name: 'name', label: 'Name', type: 'text', placeholder: 'e.g. Primary Healthcare Access', required: true },
      { name: 'mission', label: 'Mission', type: 'textarea', placeholder: 'The national objective this priority area delivers.' },
      { name: 'owner', label: 'Lead', type: 'text', placeholder: 'e.g. Aisha Bello' },
      { name: 'co_lead', label: 'Co-Lead', type: 'text', placeholder: 'e.g. Musa Ibrahim' },
      { name: 'health', label: 'Overall health', type: 'select', options: HEALTH_OPTIONS },
      { name: 'budget_health', label: 'Budget health', type: 'select', options: HEALTH_OPTIONS },
      { name: 'target_status', label: 'Target status', type: 'select', options: HEALTH_OPTIONS },
    ],
    defaults: { health: 'healthy', budget_health: 'healthy', target_status: 'healthy' },
  },

  project: {
    key: 'project', table: 'projects', singular: 'Project', plural: 'Projects',
    route: '/projects', parent: { key: 'priority_area_id', table: 'priority_areas', label: 'Priority area' },
    childKey: 'intervention', headerStatusField: 'health',
    columns: [nameCol(), ownerCol(), statusCol('health', 'Health'), statusCol('budget_health', 'Budget'), statusCol('delivery_confidence', 'Confidence', 120), textCol('updated_at', 'Updated', 100)],
    fields: [
      { name: 'name', label: 'Name', type: 'text', placeholder: 'e.g. Revitalise 774 Primary Health Centres', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'owner', label: 'Owner', type: 'text' },
      { name: 'health', label: 'Health', type: 'select', options: HEALTH_OPTIONS },
      { name: 'budget_health', label: 'Budget health', type: 'select', options: HEALTH_OPTIONS },
      { name: 'delivery_confidence', label: 'Delivery confidence', type: 'select', options: HEALTH_OPTIONS },
      { name: 'budget', label: 'Budget (₦)', type: 'number', placeholder: '0' },
      { name: 'start_date', label: 'Start date', type: 'date' },
      { name: 'end_date', label: 'End date', type: 'date' },
      { name: 'objectives', label: 'Objectives', type: 'textarea' },
      { name: 'success_metrics', label: 'Success metrics', type: 'textarea' },
    ],
    defaults: { health: 'healthy', budget_health: 'healthy', delivery_confidence: 'healthy', status: 'planned' },
  },

  intervention: {
    key: 'intervention', table: 'interventions', singular: 'Intervention', plural: 'Interventions',
    route: '/interventions', parent: { key: 'project_id', table: 'projects', label: 'Project' },
    childKey: 'activity', headerStatusField: 'health',
    columns: [nameCol(), ownerCol(), statusCol('status', 'Status'), statusCol('health', 'Health'), statusCol('budget_health', 'Budget'), textCol('target_date', 'Target', 110), textCol('updated_at', 'Updated', 100)],
    fields: [
      { name: 'name', label: 'Name', type: 'text', placeholder: 'e.g. PHC facility upgrades', required: true },
      { name: 'objective', label: 'Objective', type: 'textarea' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'owner', label: 'Owner', type: 'text' },
      { name: 'status', label: 'Delivery status', type: 'select', options: LIFECYCLE_OPTIONS },
      { name: 'health', label: 'Health', type: 'select', options: HEALTH_OPTIONS },
      { name: 'budget', label: 'Budget (₦)', type: 'number' },
      { name: 'budget_health', label: 'Budget health', type: 'select', options: HEALTH_OPTIONS },
      { name: 'target_date', label: 'Target date', type: 'date' },
    ],
    defaults: { status: 'planned', health: 'healthy', budget_health: 'healthy' },
  },

  activity: {
    key: 'activity', table: 'activities', singular: 'Activity', plural: 'Activities',
    route: '/activities', parent: { key: 'intervention_id', table: 'interventions', label: 'Intervention' },
    headerStatusField: 'status',
    columns: [nameCol(), ownerCol(), statusCol('status', 'Status'), priorityCol(), progressCol(), textCol('due_label', 'Due', 110), textCol('updated_at', 'Updated', 100)],
    fields: [
      { name: 'name', label: 'Title', type: 'text', placeholder: 'e.g. Procure medical equipment', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'owner', label: 'Owner', type: 'text' },
      { name: 'status', label: 'Status', type: 'select', options: LIFECYCLE_OPTIONS },
      { name: 'priority', label: 'Priority', type: 'select', options: PRIORITY_OPTIONS },
      { name: 'due_date', label: 'Due date', type: 'date' },
      { name: 'due_label', label: 'Due (short note)', type: 'text', placeholder: 'e.g. Today, In 3 days' },
      { name: 'progress', label: 'Progress (%)', type: 'number' },
      { name: 'notes', label: 'Notes', type: 'textarea' },
    ],
    defaults: { status: 'planned', priority: 'medium', progress: 0 },
  },
}
