-- =============================================================================
-- 0002 — auto-create a profile when a Supabase auth user signs up.
-- Run after 0001_init.sql.
--
-- NOTE: This migration NO LONGER seeds demo delivery data. Per the North Star
-- (docs/DEMO_INTEGRITY.md), the platform starts empty and fills only with
-- records the user creates. If you previously ran the seeded version of this
-- file, run 0005_remove_demo_seed.sql to clear the example data.
-- =============================================================================

-- Profile on new auth user --------------------------------------------------
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', ''),
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'contributor')
  )
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- No demo seed. The platform starts empty (see docs/DEMO_INTEGRITY.md).
