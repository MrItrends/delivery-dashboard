-- =============================================================================
-- 0012 — fix targets RLS for intervention-scoped targets.
-- 0007 only allowed targets reachable via priority_area_id. Since 0010 lets
-- targets hang off an intervention, allow membership via EITHER path.
-- Run after 0007 and 0010. Safe to re-run.
-- =============================================================================

drop policy if exists "members" on targets;
create policy "members" on targets for all to authenticated
  using (
    (priority_area_id is not null and exists (
      select 1 from priority_areas pa join portfolios p on p.id = pa.portfolio_id
      where pa.id = targets.priority_area_id and is_member(p.workspace_id)))
    or
    (intervention_id is not null and exists (
      select 1 from interventions i
        join projects pr on pr.id = i.project_id
        join priority_areas pa on pa.id = pr.priority_area_id
        join portfolios p on p.id = pa.portfolio_id
      where i.id = targets.intervention_id and is_member(p.workspace_id)))
  )
  with check (
    (priority_area_id is not null and exists (
      select 1 from priority_areas pa join portfolios p on p.id = pa.portfolio_id
      where pa.id = targets.priority_area_id and is_member(p.workspace_id)))
    or
    (intervention_id is not null and exists (
      select 1 from interventions i
        join projects pr on pr.id = i.project_id
        join priority_areas pa on pa.id = pr.priority_area_id
        join portfolios p on p.id = pa.portfolio_id
      where i.id = targets.intervention_id and is_member(p.workspace_id)))
  );
