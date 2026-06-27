-- =============================================================================
-- 0002 — auto-create a profile when a Supabase auth user signs up, + demo seed.
-- Run after 0001_init.sql.
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

-- Demo data (idempotent: only seeds when there are no workspaces yet) --------
do $$
declare ws uuid; pf uuid; pa uuid; pr uuid; iv uuid;
begin
  if exists (select 1 from workspaces) then return; end if;

  insert into workspaces(name, identifier, organization, country, timezone)
    values ('Cabinet Delivery Unit','cabinet-delivery-unit','Government of the United Kingdom','gb','Europe/London')
    returning id into ws;

  insert into portfolios(workspace_id, name, description, owner, reporting_period, health, budget_health, risk_level)
    values (ws,'Healthcare Transformation','Improving health outcomes and system resilience across the national healthcare estate.','Dr. Amara Okonkwo','Q2 2026 · Apr–Jun','at-risk','healthy','critical')
    returning id into pf;

  insert into priority_areas(portfolio_id, name, mission, owner, health, budget_health, target_status)
    values (pf,'Hospital Estate Renewal','Modernise the national hospital estate to expand capacity and improve patient safety by 2028.','Ahmed Yusuf','at-risk','at-risk','at-risk')
    returning id into pa;
  insert into priority_areas(portfolio_id, name, owner, health, budget_health, target_status)
    values (pf,'Digital Health Records','Sarah Evans','at-risk','healthy','at-risk'),
           (pf,'Workforce & Training','Marcus Johnson','healthy','healthy','healthy');

  insert into targets(priority_area_id, name, current, target, unit, trend, status, forecast, confidence)
    values (pa,'Additional bed capacity',580,1000,'beds','up','at-risk','870 by Q4','Medium'),
           (pa,'Theatre utilisation',82,90,'%','up','healthy','91% by Q3','High');

  insert into projects(priority_area_id, name, description, owner, health, budget_health, delivery_confidence)
    values (pa,'Ward 4 Reconstruction','Full reconstruction of Ward 4 to deliver 120 additional beds and modern theatre capacity by Q2 2027.','Sarah Evans','at-risk','critical','at-risk')
    returning id into pr;

  insert into decisions(project_id, decision, owner, date, status, status_label, linked_intervention, outcome, type, evidence_count)
    values (pr,'Accelerate structural works programme','Sarah Evans','24 Jun','approved','Approved','Structural Works','6-week recovery plan agreed','Operational',2),
           (pr,'Approve £3.1M contingency drawdown','Ahmed Yusuf','22 Jun','approved','Approved','Structural Works','Funded from portfolio reserve','Financial',3);

  insert into risks(project_id, title, severity, owner, impact, likelihood, mitigation, status, next_review)
    values (pr,'Construction delay on Ward 4','critical','Ahmed Yusuf','High','High','Accelerated works programme','active','28 Jun'),
           (pr,'Budget overrun across estate','critical','Sarah Evans','High','Medium','Reforecast and contingency review','active','30 Jun');

  insert into interventions(project_id, name, objective, owner, status, health, budget_health, target_date)
    values (pr,'Structural Works','Complete the Ward 4 structural frame and foundations to enable M&E and fit-out by Q4.','Ahmed Yusuf','blocked','critical','at-risk','2026-09-30')
    returning id into iv;

  insert into milestones(intervention_id, name, owner, due, status, group_label, dependency)
    values (iv,'Foundations complete','Marcus Johnson','15 Jul','at-risk','Delayed','Steel delivery'),
           (iv,'Frame topped out','Marcus Johnson','30 Aug','planned','Upcoming',null),
           (iv,'Site mobilisation','Ahmed Yusuf','12 Apr','complete','Completed',null);

  insert into activities(intervention_id, name, owner, status, priority, due_label, overdue, progress)
    values (iv,'Confirm steel delivery schedule','Ahmed Yusuf','blocked','critical','Overdue · 2d',true,20),
           (iv,'Pour foundation slab — Zone A','Marcus Johnson','active','high','Today',false,65),
           (iv,'Erect frame — Grid 1–4','Marcus Johnson','active','high','In 3 days',false,40),
           (iv,'Structural engineer sign-off','Priya Sharma','planned','medium','In 6 days',false,0),
           (iv,'Site survey — Zone B','James Chen','complete','low','Done',false,100);
end $$;
