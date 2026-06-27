-- =============================================================================
-- 0003 — enable Supabase Realtime for collaboration tables.
-- Run after 0002. (Tables must be in the supabase_realtime publication for
-- postgres_changes subscriptions to fire.)
-- =============================================================================

do $$
begin
  begin execute 'alter publication supabase_realtime add table comments'; exception when duplicate_object then null; end;
  begin execute 'alter publication supabase_realtime add table notifications'; exception when duplicate_object then null; end;
end $$;
