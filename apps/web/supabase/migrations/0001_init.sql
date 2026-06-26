-- =============================================================================
-- TBI Digital Delivery — Supabase schema (single source of truth)
-- Run in the Supabase SQL editor (or via `supabase db push`).
-- Mirrors the object hierarchy: Workspace → Portfolio → Priority Area →
-- Project → Intervention → Activity, plus collaboration objects.
-- =============================================================================

create extension if not exists "pgcrypto";

-- updated_at trigger helper -------------------------------------------------
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

-- Profiles (1:1 with Supabase auth.users) -----------------------------------
create table if not exists profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  name         text not null default '',
  email        text unique,
  role         text not null default 'contributor',
  avatar_color text,
  created_at   timestamptz not null default now()
);

-- Workspaces ----------------------------------------------------------------
create table if not exists workspaces (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  identifier   text unique,
  organization text,
  country      text,
  timezone     text,
  language     text default 'en-GB',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table if not exists memberships (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references profiles(id) on delete cascade,
  workspace_id uuid not null references workspaces(id) on delete cascade,
  role         text not null default 'contributor',
  unique (user_id, workspace_id)
);

-- Hierarchy -----------------------------------------------------------------
create table if not exists portfolios (
  id               uuid primary key default gen_random_uuid(),
  workspace_id     uuid not null references workspaces(id) on delete cascade,
  name             text not null,
  description      text,
  owner            text,
  reporting_period text,
  health           text not null default 'healthy',
  budget_health    text not null default 'healthy',
  risk_level       text not null default 'healthy',
  archived         boolean not null default false,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create table if not exists priority_areas (
  id            uuid primary key default gen_random_uuid(),
  portfolio_id  uuid not null references portfolios(id) on delete cascade,
  name          text not null,
  mission       text,
  owner         text,
  health        text not null default 'healthy',
  budget_health text not null default 'healthy',
  target_status text not null default 'healthy',
  archived      boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table if not exists projects (
  id                  uuid primary key default gen_random_uuid(),
  priority_area_id    uuid not null references priority_areas(id) on delete cascade,
  name                text not null,
  description         text,
  owner               text,
  start_date          date,
  end_date            date,
  budget              numeric,
  status              text not null default 'planned',
  health              text not null default 'healthy',
  budget_health       text not null default 'healthy',
  delivery_confidence text not null default 'healthy',
  objectives          text,
  success_metrics     text,
  tags                text[] default '{}',
  risk_level          text default 'medium',
  archived            boolean not null default false,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create table if not exists interventions (
  id            uuid primary key default gen_random_uuid(),
  project_id    uuid not null references projects(id) on delete cascade,
  name          text not null,
  objective     text,
  description   text,
  owner         text,
  status        text not null default 'planned',
  health        text not null default 'healthy',
  budget        numeric,
  budget_health text not null default 'healthy',
  target_date   date,
  archived      boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table if not exists activities (
  id              uuid primary key default gen_random_uuid(),
  intervention_id uuid not null references interventions(id) on delete cascade,
  name            text not null,
  description     text,
  owner           text,
  status          text not null default 'planned',
  priority        text not null default 'medium',
  due_date        date,
  due_label       text,
  overdue         boolean not null default false,
  progress        int not null default 0,
  notes           text,
  archived        boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create table if not exists milestones (
  id              uuid primary key default gen_random_uuid(),
  intervention_id uuid not null references interventions(id) on delete cascade,
  name            text not null,
  owner           text,
  due             text,
  status          text not null default 'planned',
  group_label     text not null default 'Upcoming',
  dependency      text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create table if not exists targets (
  id               uuid primary key default gen_random_uuid(),
  priority_area_id uuid not null references priority_areas(id) on delete cascade,
  name             text not null,
  current          numeric not null default 0,
  target           numeric not null default 0,
  unit             text,
  trend            text default 'flat',
  status           text not null default 'healthy',
  forecast         text,
  confidence       text default 'Medium',
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create table if not exists risks (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid references projects(id) on delete cascade,
  title       text not null,
  severity    text not null default 'at-risk',
  owner       text,
  impact      text default 'Medium',
  likelihood  text default 'Medium',
  mitigation  text,
  status      text not null default 'active',
  next_review text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists decisions (
  id                  uuid primary key default gen_random_uuid(),
  project_id          uuid references projects(id) on delete cascade,
  decision            text not null,
  owner               text,
  date                text,
  status              text not null default 'active',
  status_label        text default 'Pending',
  linked_intervention text,
  outcome             text,
  type                text default 'Operational',
  evidence_count      int default 0,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- Collaboration -------------------------------------------------------------
create table if not exists comments (
  id          uuid primary key default gen_random_uuid(),
  object_type text not null,
  object_id   uuid not null,
  author_id   uuid references profiles(id) on delete set null,
  body        text not null,
  resolved    boolean not null default false,
  pinned      boolean not null default false,
  created_at  timestamptz not null default now()
);

create table if not exists documents (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  type            text default 'doc',
  version         int default 1,
  size            text,
  storage_path    text,            -- Supabase Storage object path
  uploaded_by     uuid references profiles(id) on delete set null,
  activity_id     uuid references activities(id) on delete set null,
  intervention_id uuid references interventions(id) on delete set null,
  created_at      timestamptz not null default now()
);

create table if not exists reports (
  id          uuid primary key default gen_random_uuid(),
  scope_type  text not null,       -- portfolio | priority_area | project | intervention | activity | custom
  scope_id    uuid,
  title       text not null,
  period      text,
  audience    text,
  status      text not null default 'draft', -- draft | review | published
  version     int default 1,
  narrative   text,
  recommendations text,
  pdf_path    text,
  created_by  uuid references profiles(id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists notifications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references profiles(id) on delete cascade,
  type       text not null,
  actor      text,
  action     text not null,
  target     text,
  context    text,
  read       boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists audit_log (
  id          uuid primary key default gen_random_uuid(),
  object_type text not null,
  object_id   uuid not null,
  actor_id    uuid references profiles(id) on delete set null,
  action      text not null,
  field       text,
  previous    text,
  next        text,
  created_at  timestamptz not null default now()
);

-- updated_at triggers -------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array[
    'workspaces','portfolios','priority_areas','projects','interventions',
    'activities','milestones','targets','risks','decisions','reports'
  ] loop
    execute format(
      'drop trigger if exists trg_%1$s_updated on %1$s;
       create trigger trg_%1$s_updated before update on %1$s
       for each row execute function set_updated_at();', t);
  end loop;
end $$;

-- Row Level Security --------------------------------------------------------
-- Enable RLS and start with an authenticated-can-do-everything policy.
-- Tighten to workspace membership once auth is wired (see SUPABASE_SETUP.md).
do $$
declare t text;
begin
  foreach t in array array[
    'profiles','workspaces','memberships','portfolios','priority_areas','projects',
    'interventions','activities','milestones','targets','risks','decisions',
    'comments','documents','reports','notifications','audit_log'
  ] loop
    execute format('alter table %I enable row level security;', t);
    execute format('drop policy if exists "auth all" on %I;', t);
    execute format(
      'create policy "auth all" on %I for all
       to authenticated using (true) with check (true);', t);
  end loop;
end $$;

-- Helpful indexes -----------------------------------------------------------
create index if not exists idx_pa_portfolio on priority_areas(portfolio_id);
create index if not exists idx_proj_pa on projects(priority_area_id);
create index if not exists idx_iv_proj on interventions(project_id);
create index if not exists idx_act_iv on activities(intervention_id);
create index if not exists idx_comments_object on comments(object_type, object_id);
create index if not exists idx_notif_user on notifications(user_id, read);
