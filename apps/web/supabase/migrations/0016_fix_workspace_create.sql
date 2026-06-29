-- =============================================================================
-- 0016 — SELF-CONTAINED fix for "We couldn't create your workspace" (403).
-- Run this on its own — it does not depend on any earlier RLS migration.
-- It (re)defines is_member and sets the workspaces policies so any signed-in
-- user can CREATE a workspace, while read/update/delete stay member-scoped.
-- Safe to re-run.
-- =============================================================================

-- Helper used by the membership-scoped policies.
create or replace function is_member(ws uuid)
returns boolean language sql security definer stable set search_path = public as $$
  select exists (select 1 from memberships m where m.workspace_id = ws and m.user_id = auth.uid());
$$;

alter table workspaces enable row level security;

-- Clear any prior workspace policies so we end in a known state.
drop policy if exists "auth all" on workspaces;
drop policy if exists "members" on workspaces;
drop policy if exists "ws insert" on workspaces;
drop policy if exists "ws select" on workspaces;
drop policy if exists "ws update" on workspaces;
drop policy if exists "ws delete" on workspaces;

-- Anyone signed in may create a workspace (they add themselves as a member next).
create policy "ws insert" on workspaces for insert to authenticated with check (true);
-- Reading/changing a workspace requires membership.
create policy "ws select" on workspaces for select to authenticated using (is_member(id));
create policy "ws update" on workspaces for update to authenticated using (is_member(id)) with check (is_member(id));
create policy "ws delete" on workspaces for delete to authenticated using (is_member(id));

-- Memberships must be insertable so the creator can add themselves.
alter table memberships enable row level security;
drop policy if exists "auth all" on memberships;
create policy "auth all" on memberships for all to authenticated using (true) with check (true);
