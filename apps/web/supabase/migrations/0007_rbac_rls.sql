-- =============================================================================
-- 0007 — tighten RLS from "any authenticated user" to "workspace members only"
-- for the delivery hierarchy, and scope notifications to their owner.
--
-- SAFETY: this migration first BACKFILLS a membership for every existing user
-- so no one is locked out, then replaces the permissive policies. Run it only
-- after you have signed in successfully at least once.
--
-- ROLLBACK: re-run the "auth all" loop from 0001_init.sql to restore the
-- permissive policies on these tables.
-- =============================================================================

-- 1) Backfill: every profile without a membership joins the earliest workspace
--    as admin (single-workspace model). No-op once everyone has a membership.
insert into memberships (user_id, workspace_id, role)
select pr.id, (select id from workspaces order by created_at asc limit 1), 'admin'
from profiles pr
where exists (select 1 from workspaces)
  and not exists (select 1 from memberships m where m.user_id = pr.id);

-- 2) Helper: is the current user a member of workspace ws?
create or replace function is_member(ws uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from memberships m
    where m.workspace_id = ws and m.user_id = auth.uid()
  );
$$;

-- 3) Membership-scoped policies on the hierarchy ----------------------------
drop policy if exists "auth all" on workspaces;
create policy "members" on workspaces for all to authenticated
  using (is_member(id)) with check (is_member(id));

drop policy if exists "auth all" on portfolios;
create policy "members" on portfolios for all to authenticated
  using (is_member(workspace_id)) with check (is_member(workspace_id));

drop policy if exists "auth all" on priority_areas;
create policy "members" on priority_areas for all to authenticated
  using (exists (select 1 from portfolios p where p.id = priority_areas.portfolio_id and is_member(p.workspace_id)))
  with check (exists (select 1 from portfolios p where p.id = priority_areas.portfolio_id and is_member(p.workspace_id)));

drop policy if exists "auth all" on projects;
create policy "members" on projects for all to authenticated
  using (exists (select 1 from priority_areas pa join portfolios p on p.id = pa.portfolio_id where pa.id = projects.priority_area_id and is_member(p.workspace_id)))
  with check (exists (select 1 from priority_areas pa join portfolios p on p.id = pa.portfolio_id where pa.id = projects.priority_area_id and is_member(p.workspace_id)));

drop policy if exists "auth all" on interventions;
create policy "members" on interventions for all to authenticated
  using (exists (select 1 from projects pr join priority_areas pa on pa.id = pr.priority_area_id join portfolios p on p.id = pa.portfolio_id where pr.id = interventions.project_id and is_member(p.workspace_id)))
  with check (exists (select 1 from projects pr join priority_areas pa on pa.id = pr.priority_area_id join portfolios p on p.id = pa.portfolio_id where pr.id = interventions.project_id and is_member(p.workspace_id)));

drop policy if exists "auth all" on activities;
create policy "members" on activities for all to authenticated
  using (exists (select 1 from interventions i join projects pr on pr.id = i.project_id join priority_areas pa on pa.id = pr.priority_area_id join portfolios p on p.id = pa.portfolio_id where i.id = activities.intervention_id and is_member(p.workspace_id)))
  with check (exists (select 1 from interventions i join projects pr on pr.id = i.project_id join priority_areas pa on pa.id = pr.priority_area_id join portfolios p on p.id = pa.portfolio_id where i.id = activities.intervention_id and is_member(p.workspace_id)));

drop policy if exists "auth all" on targets;
create policy "members" on targets for all to authenticated
  using (exists (select 1 from priority_areas pa join portfolios p on p.id = pa.portfolio_id where pa.id = targets.priority_area_id and is_member(p.workspace_id)))
  with check (exists (select 1 from priority_areas pa join portfolios p on p.id = pa.portfolio_id where pa.id = targets.priority_area_id and is_member(p.workspace_id)));

drop policy if exists "auth all" on milestones;
create policy "members" on milestones for all to authenticated
  using (exists (select 1 from interventions i join projects pr on pr.id = i.project_id join priority_areas pa on pa.id = pr.priority_area_id join portfolios p on p.id = pa.portfolio_id where i.id = milestones.intervention_id and is_member(p.workspace_id)))
  with check (exists (select 1 from interventions i join projects pr on pr.id = i.project_id join priority_areas pa on pa.id = pr.priority_area_id join portfolios p on p.id = pa.portfolio_id where i.id = milestones.intervention_id and is_member(p.workspace_id)));

drop policy if exists "auth all" on risks;
create policy "members" on risks for all to authenticated
  using (exists (select 1 from projects pr join priority_areas pa on pa.id = pr.priority_area_id join portfolios p on p.id = pa.portfolio_id where pr.id = risks.project_id and is_member(p.workspace_id)))
  with check (exists (select 1 from projects pr join priority_areas pa on pa.id = pr.priority_area_id join portfolios p on p.id = pa.portfolio_id where pr.id = risks.project_id and is_member(p.workspace_id)));

drop policy if exists "auth all" on decisions;
create policy "members" on decisions for all to authenticated
  using (exists (select 1 from projects pr join priority_areas pa on pa.id = pr.priority_area_id join portfolios p on p.id = pa.portfolio_id where pr.id = decisions.project_id and is_member(p.workspace_id)))
  with check (exists (select 1 from projects pr join priority_areas pa on pa.id = pr.priority_area_id join portfolios p on p.id = pa.portfolio_id where pr.id = decisions.project_id and is_member(p.workspace_id)));

-- 4) Notifications belong to their owner.
drop policy if exists "auth all" on notifications;
create policy "own notifications" on notifications for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- profiles, memberships, comments, documents, reports and audit_log keep the
-- existing authenticated-level policy: they are needed for joins (author names,
-- team) and are not workspace-sensitive in this single-tenant deployment.
