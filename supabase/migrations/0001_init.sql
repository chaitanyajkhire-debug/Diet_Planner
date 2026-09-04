-- NutriPlan schema: anonymous, per-device persistence via Supabase Anonymous Auth.
-- Each browser signs in anonymously (no email/password prompt); auth.uid() then
-- scopes every row to that device's session so RLS can enforce privacy without
-- a login screen.

create table if not exists public.preferences (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- id is client-generated (matches the app's local plan id, e.g. "plan_xxxxx")
-- so the same identifier is used in the local cache and in Supabase.
create table if not exists public.day_plans (
  id text primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  data jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists day_plans_user_id_created_at_idx
  on public.day_plans (user_id, created_at desc);

alter table public.preferences enable row level security;
alter table public.day_plans enable row level security;

create policy "Individuals can manage their own preferences"
  on public.preferences
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Individuals can manage their own day plans"
  on public.day_plans
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Keep only the most recent 10 plans per user.
create or replace function public.trim_day_plans() returns trigger as $$
begin
  delete from public.day_plans
  where user_id = new.user_id
    and id not in (
      select id from public.day_plans
      where user_id = new.user_id
      order by created_at desc
      limit 10
    );
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists trim_day_plans_trigger on public.day_plans;
create trigger trim_day_plans_trigger
  after insert on public.day_plans
  for each row execute function public.trim_day_plans();
