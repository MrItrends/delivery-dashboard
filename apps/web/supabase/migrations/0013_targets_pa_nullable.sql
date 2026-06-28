-- =============================================================================
-- 0013 — allow targets that belong to an intervention (not a priority area).
-- 0001 made priority_area_id NOT NULL; targets can now attach to an
-- intervention instead, so drop that constraint. Safe to re-run.
-- =============================================================================

alter table targets alter column priority_area_id drop not null;
