-- =============================================================================
-- 0011 — target fields shown in the intervention planning template
-- (Target amount = existing `target`; Unit = existing `unit`; add the rest).
-- Safe to re-run.
-- =============================================================================

alter table targets add column if not exists start_amount numeric;
alter table targets add column if not exists start_date date;
alter table targets add column if not exists deadline date;
