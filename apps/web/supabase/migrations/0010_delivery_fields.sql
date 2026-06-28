-- =============================================================================
-- 0010 — fields for the recognisable Priority Area / Intervention screens
-- (matches the original TBI Delivery Dashboard the client knows).
-- Adds Lead/Co-Lead, spend, planning metadata, a financiers table, and lets
-- targets attach to interventions. Safe to re-run.
-- =============================================================================

alter table priority_areas add column if not exists co_lead text;

alter table interventions add column if not exists co_lead text;
alter table interventions add column if not exists spent numeric;
alter table interventions add column if not exists programme text;
alter table interventions add column if not exists classification text;
alter table interventions add column if not exists region text;
alter table interventions add column if not exists ref text;        -- numbering, e.g. "1.1"

-- Targets can hang off an intervention (the deck attaches targets there).
alter table targets add column if not exists intervention_id uuid references interventions(id) on delete cascade;

-- Financiers — who funds an intervention, and how.
create table if not exists financiers (
  id                 uuid primary key default gen_random_uuid(),
  intervention_id    uuid not null references interventions(id) on delete cascade,
  name               text not null,
  finance_method     text,   -- e.g. Grant, Loan
  procurement_method text,   -- e.g. Tender
  amount             numeric,
  created_at         timestamptz not null default now()
);
create index if not exists idx_financiers_iv on financiers(intervention_id);

alter table financiers enable row level security;
drop policy if exists "auth all" on financiers;
create policy "auth all" on financiers for all to authenticated using (true) with check (true);
