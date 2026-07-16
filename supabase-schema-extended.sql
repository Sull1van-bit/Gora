-- Extended schema for GORA Mobile Farming Management App
-- Adds komoditas, actions, activities, and issues tables to complement profiles and plots

create table if not exists public.komoditas (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  satuan text not null default 'kg',
  icon text,
  avg_price numeric(12,2) default 0,
  price_trend text default 'stable',
  color text default 'bg-emerald-500 text-white',
  created_at timestamptz not null default now()
);

create table if not exists public.actions (
  id uuid primary key default gen_random_uuid(),
  plot_id uuid not null references public.plots(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'today', -- 'overdue', 'today', 'soon', 'completed'
  due_text text,
  priority text default 'medium',
  activity_type text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  plot_id uuid not null references public.plots(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  activity_type text not null,
  title text not null,
  notes text,
  date_formatted text,
  timestamp timestamptz not null default now()
);

create table if not exists public.issues (
  id uuid primary key default gen_random_uuid(),
  plot_id uuid not null references public.plots(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  severity text not null default 'Medium', -- 'Low', 'Medium', 'High'
  notes text,
  resolved boolean not null default false,
  created_at timestamptz not null default now()
);

-- Enable RLS on all new tables
alter table public.komoditas enable row level security;
alter table public.actions enable row level security;
alter table public.activities enable row level security;
alter table public.issues enable row level security;

-- Policies for komoditas (publicly readable by authenticated/anon users for reference)
drop policy if exists "Komoditas readable by everyone" on public.komoditas;
create policy "Komoditas readable by everyone"
  on public.komoditas
  for select
  using (true);

-- Policies for actions
drop policy if exists "Actions read own rows" on public.actions;
create policy "Actions read own rows"
  on public.actions
  for select
  using (auth.uid() = owner_id);

drop policy if exists "Actions insert own rows" on public.actions;
create policy "Actions insert own rows"
  on public.actions
  for insert
  with check (auth.uid() = owner_id);

drop policy if exists "Actions update own rows" on public.actions;
create policy "Actions update own rows"
  on public.actions
  for update
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

drop policy if exists "Actions delete own rows" on public.actions;
create policy "Actions delete own rows"
  on public.actions
  for delete
  using (auth.uid() = owner_id);

-- Policies for activities
drop policy if exists "Activities read own rows" on public.activities;
create policy "Activities read own rows"
  on public.activities
  for select
  using (auth.uid() = owner_id);

drop policy if exists "Activities insert own rows" on public.activities;
create policy "Activities insert own rows"
  on public.activities
  for insert
  with check (auth.uid() = owner_id);

-- Policies for issues
drop policy if exists "Issues read own rows" on public.issues;
create policy "Issues read own rows"
  on public.issues
  for select
  using (auth.uid() = owner_id);

drop policy if exists "Issues insert own rows" on public.issues;
create policy "Issues insert own rows"
  on public.issues
  for insert
  with check (auth.uid() = owner_id);

drop policy if exists "Issues update own rows" on public.issues;
create policy "Issues update own rows"
  on public.issues
  for update
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);
