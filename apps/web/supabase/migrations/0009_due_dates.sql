-- =============================================================================
-- 0009 — real due dates so the Calendar can render a date grid.
-- Activities and milestones gain an optional due_date. The existing text
-- due/due_label fields remain as human-readable labels.
-- =============================================================================

alter table activities  add column if not exists due_date date;
alter table milestones  add column if not exists due_date date;

create index if not exists idx_activities_due_date on activities(due_date);
create index if not exists idx_milestones_due_date on milestones(due_date);
