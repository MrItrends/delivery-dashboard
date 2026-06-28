-- =============================================================================
-- 0014 — target progress updates. Each update records a value at a point in
-- time, which drives a target's current value and its trend line.
-- Safe to re-run.
-- =============================================================================

create table if not exists target_updates (
  id          uuid primary key default gen_random_uuid(),
  target_id   uuid not null references targets(id) on delete cascade,
  value       numeric not null,
  note        text,
  created_by  uuid references profiles(id) on delete set null,
  created_at  timestamptz not null default now()
);
create index if not exists idx_target_updates_target on target_updates(target_id);

alter table target_updates enable row level security;
drop policy if exists "auth all" on target_updates;
create policy "auth all" on target_updates for all to authenticated using (true) with check (true);
