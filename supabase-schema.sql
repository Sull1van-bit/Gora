create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.plots (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  plot_name text not null,
  komoditas_id uuid,
  location text not null,
  planting_date date not null,
  latitude numeric(10, 6),
  longitude numeric(10, 6),
  estimated_harvest_date date,
  current_growth_stage text,
  initial_recommendation text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.plots enable row level security;

drop policy if exists "Profiles can read own row" on public.profiles;
create policy "Profiles can read own row"
  on public.profiles
  for select
  using (auth.uid() = id);

drop policy if exists "Profiles can update own row" on public.profiles;
create policy "Profiles can update own row"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Plots can read own rows" on public.plots;
create policy "Plots can read own rows"
  on public.plots
  for select
  using (auth.uid() = owner_id);

drop policy if exists "Plots can insert own rows" on public.plots;
create policy "Plots can insert own rows"
  on public.plots
  for insert
  with check (auth.uid() = owner_id);

drop policy if exists "Plots can update own rows" on public.plots;
create policy "Plots can update own rows"
  on public.plots
  for update
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

drop policy if exists "Plots can delete own rows" on public.plots;
create policy "Plots can delete own rows"
  on public.plots
  for delete
  using (auth.uid() = owner_id);

drop trigger if exists on_auth_user_created on auth.users;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', new.email)
  )
  on conflict (id) do nothing;

  insert into public.plots (
    owner_id,
    plot_name,
    komoditas_id,
    location,
    planting_date,
    latitude,
    longitude,
    estimated_harvest_date,
    current_growth_stage,
    initial_recommendation,
    is_active
  )
  values (
    new.id,
    'Plot Utama',
    null,
    'Lokasi belum diatur',
    current_date,
    null,
    null,
    null,
    'Seedling',
    'Tambahkan crop type dan lokasi untuk mulai menghitung progres.',
    true
  );

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- If you are migrating an existing database, run these renames manually only when the old table exists:
-- alter table public.lands rename to plots;
-- alter table public.plots rename column name to plot_name;