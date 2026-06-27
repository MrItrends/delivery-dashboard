-- =============================================================================
-- 0008 — real collaboration: invited people join the SAME workspace and work
-- together. Adds a workspace_invites table, auto-joins invitees on sign-up,
-- and turns on realtime for the delivery hierarchy so edits appear live.
-- Run after 0007 (uses is_member). Safe to re-run.
-- =============================================================================

-- Defensive: ensure is_member exists even if 0007 hasn't run.
create or replace function is_member(ws uuid)
returns boolean language sql security definer stable set search_path = public as $$
  select exists (select 1 from memberships m where m.workspace_id = ws and m.user_id = auth.uid());
$$;

-- 1) Pending invitations -----------------------------------------------------
create table if not exists workspace_invites (
  id           uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  email        text not null,
  role         text not null default 'regular',
  invited_by   uuid references profiles(id) on delete set null,
  created_at   timestamptz not null default now(),
  unique (workspace_id, email)
);
create index if not exists idx_invites_email on workspace_invites(lower(email));

alter table workspace_invites enable row level security;
drop policy if exists "invite read" on workspace_invites;
create policy "invite read" on workspace_invites for select to authenticated
  using (is_member(workspace_id) or lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));
drop policy if exists "invite manage" on workspace_invites;
create policy "invite manage" on workspace_invites for all to authenticated
  using (is_member(workspace_id)) with check (is_member(workspace_id));

-- 2) On sign-up: create the profile AND consume any pending invites so the new
--    user joins the workspace(s) they were invited to.
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name, email, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', ''), new.email,
          coalesce(new.raw_user_meta_data->>'role', 'regular'))
  on conflict (id) do nothing;

  insert into public.memberships (user_id, workspace_id, role)
  select new.id, wi.workspace_id, wi.role
  from public.workspace_invites wi
  where lower(wi.email) = lower(new.email)
  on conflict (user_id, workspace_id) do nothing;

  delete from public.workspace_invites where lower(email) = lower(new.email);
  return new;
end; $$;

-- 3) Realtime for the hierarchy so collaborators see each other's changes live.
do $$
declare t text;
begin
  foreach t in array array['portfolios','priority_areas','projects','interventions','activities'] loop
    begin
      execute format('alter publication supabase_realtime add table %I;', t);
    exception when duplicate_object then null;
    end;
  end loop;
end $$;
