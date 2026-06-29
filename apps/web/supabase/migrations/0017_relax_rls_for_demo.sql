-- =============================================================================
-- 0017 — relax RLS to "any signed-in user" for the demo.
-- The strict per-workspace policies repeatedly blocked core flows (creating a
-- workspace, portfolio, targets). For a single-org demo, login-level access is
-- the right trade-off: everyone signed in shares one dataset and can collaborate.
-- This drops every existing policy on the listed tables and sets a single
-- authenticated "auth all" policy. Self-contained and safe to re-run.
--
-- To re-introduce per-workspace isolation later, replace these with membership-
-- scoped policies (see 0007/0016) once the bootstrap (workspace insert) is sound.
-- =============================================================================

do $$
declare
  t text;
  r record;
  tables text[] := array[
    'profiles','workspaces','memberships','portfolios','priority_areas','projects',
    'interventions','activities','milestones','targets','risks','decisions',
    'comments','documents','reports','notifications','audit_log',
    'workspace_invites','financiers','target_updates'
  ];
begin
  foreach t in array tables loop
    -- Skip tables that don't exist in this database.
    if to_regclass('public.' || t) is null then continue; end if;

    -- Drop every existing policy on the table.
    for r in (select policyname from pg_policies where schemaname = 'public' and tablename = t) loop
      execute format('drop policy %I on public.%I', r.policyname, t);
    end loop;

    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "auth all" on public.%I for all to authenticated using (true) with check (true)', t);
  end loop;
end $$;
