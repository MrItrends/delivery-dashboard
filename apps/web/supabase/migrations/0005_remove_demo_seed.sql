-- =============================================================================
-- 0005 — remove the demo seed inserted by the old 0002 migration.
-- Safe to run multiple times. Only deletes the specific seeded workspace
-- ('Cabinet Delivery Unit') and everything beneath it. Leaves real user data
-- untouched. See docs/DEMO_INTEGRITY.md.
-- =============================================================================

do $$
declare ws uuid;
begin
  select id into ws from workspaces where identifier = 'cabinet-delivery-unit' limit 1;
  if ws is null then return; end if;

  -- Delete bottom-up so we don't depend on cascade rules.
  delete from activities  where intervention_id in (
    select i.id from interventions i join projects p on p.id = i.project_id
      join priority_areas pa on pa.id = p.priority_area_id
      join portfolios pf on pf.id = pa.portfolio_id where pf.workspace_id = ws);
  delete from milestones  where intervention_id in (
    select i.id from interventions i join projects p on p.id = i.project_id
      join priority_areas pa on pa.id = p.priority_area_id
      join portfolios pf on pf.id = pa.portfolio_id where pf.workspace_id = ws);
  delete from interventions where project_id in (
    select p.id from projects p join priority_areas pa on pa.id = p.priority_area_id
      join portfolios pf on pf.id = pa.portfolio_id where pf.workspace_id = ws);
  delete from risks       where project_id in (
    select p.id from projects p join priority_areas pa on pa.id = p.priority_area_id
      join portfolios pf on pf.id = pa.portfolio_id where pf.workspace_id = ws);
  delete from decisions   where project_id in (
    select p.id from projects p join priority_areas pa on pa.id = p.priority_area_id
      join portfolios pf on pf.id = pa.portfolio_id where pf.workspace_id = ws);
  delete from projects    where priority_area_id in (
    select pa.id from priority_areas pa join portfolios pf on pf.id = pa.portfolio_id where pf.workspace_id = ws);
  delete from targets     where priority_area_id in (
    select pa.id from priority_areas pa join portfolios pf on pf.id = pa.portfolio_id where pf.workspace_id = ws);
  delete from priority_areas where portfolio_id in (select id from portfolios where workspace_id = ws);
  delete from portfolios  where workspace_id = ws;
  delete from workspaces  where id = ws;
end $$;
