-- =============================================================================
-- 0006 — add a currency to the dashboard (workspace). Naira by default.
-- The deck defines Currency as a dashboard-level setting; Nigeria-first.
-- =============================================================================

alter table workspaces add column if not exists currency text default 'NGN';
