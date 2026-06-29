-- =============================================================================
-- 0015 — allow signed-in users to CREATE a workspace.
-- 0007's single "members" policy applied is_member() to INSERT too, which can
-- never pass (you can't be a member of a workspace that doesn't exist yet), so
-- new workspace creation 403'd. Split the policy: anyone authenticated may
-- insert; read/update/delete stay member-scoped. Run after 0007. Safe to re-run.
-- =============================================================================

drop policy if exists "members" on workspaces;
drop policy if exists "ws insert" on workspaces;
drop policy if exists "ws select" on workspaces;
drop policy if exists "ws update" on workspaces;
drop policy if exists "ws delete" on workspaces;

create policy "ws insert" on workspaces for insert to authenticated with check (true);
create policy "ws select" on workspaces for select to authenticated using (is_member(id));
create policy "ws update" on workspaces for update to authenticated using (is_member(id)) with check (is_member(id));
create policy "ws delete" on workspaces for delete to authenticated using (is_member(id));
