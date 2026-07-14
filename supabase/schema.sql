create extension if not exists pgcrypto;

create type public.user_role as enum ('creator', 'manager', 'brand');
create type public.deal_status as enum ('pending_creator', 'active', 'rejected', 'in_review', 'completed', 'cancelled');
create type public.deliverable_status as enum ('not_started', 'in_progress', 'submitted', 'approved');
create type public.payment_status as enum ('not_started', 'pending', 'paid', 'failed');

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text not null,
  role public.user_role not null,
  company_name text,
  created_at timestamptz not null default now()
);

create table public.deals (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  brief text not null,
  brand_id uuid not null references public.users(id) on delete cascade,
  creator_id uuid not null references public.users(id) on delete cascade,
  manager_id uuid references public.users(id) on delete set null,
  status public.deal_status not null default 'pending_creator',
  budget_amount numeric(12, 2) not null check (budget_amount >= 0),
  currency text not null default 'USD',
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.deliverables (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid not null references public.deals(id) on delete cascade,
  title text not null,
  description text,
  status public.deliverable_status not null default 'not_started',
  due_date date,
  created_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid not null unique references public.deals(id) on delete cascade,
  amount numeric(12, 2) not null check (amount >= 0),
  currency text not null default 'USD',
  status public.payment_status not null default 'not_started',
  paid_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, full_name, role, company_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    coalesce((new.raw_user_meta_data ->> 'role')::public.user_role, 'creator'),
    nullif(new.raw_user_meta_data ->> 'company_name', '')
  )
  on conflict (id) do update
  set
    email = excluded.email,
    full_name = excluded.full_name,
    role = excluded.role,
    company_name = excluded.company_name;

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger deals_set_updated_at
before update on public.deals
for each row execute function public.set_updated_at();

create trigger payments_set_updated_at
before update on public.payments
for each row execute function public.set_updated_at();

alter table public.users enable row level security;
alter table public.deals enable row level security;
alter table public.deliverables enable row level security;
alter table public.payments enable row level security;

create policy "Users can create their profile"
on public.users for insert
to authenticated
with check (auth.uid() = id);

create policy "Authenticated users can read profiles"
on public.users for select
to authenticated
using (true);

create policy "Users can update their profile"
on public.users for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Brands and creators can read their deals"
on public.deals for select
to authenticated
using (auth.uid() = brand_id or auth.uid() = creator_id or auth.uid() = manager_id);

create policy "Brands can create deals"
on public.deals for insert
to authenticated
with check (
  auth.uid() = brand_id
  and exists (
    select 1 from public.users
    where users.id = auth.uid()
    and users.role = 'brand'
  )
);

create policy "Participants can update their deals"
on public.deals for update
to authenticated
using (auth.uid() = brand_id or auth.uid() = creator_id or auth.uid() = manager_id)
with check (auth.uid() = brand_id or auth.uid() = creator_id or auth.uid() = manager_id);

create policy "Participants can read deliverables"
on public.deliverables for select
to authenticated
using (
  exists (
    select 1 from public.deals
    where deals.id = deliverables.deal_id
    and (auth.uid() = deals.brand_id or auth.uid() = deals.creator_id or auth.uid() = deals.manager_id)
  )
);

create policy "Brands can create deliverables"
on public.deliverables for insert
to authenticated
with check (
  exists (
    select 1 from public.deals
    where deals.id = deliverables.deal_id
    and auth.uid() = deals.brand_id
  )
);

create policy "Participants can update deliverables"
on public.deliverables for update
to authenticated
using (
  exists (
    select 1 from public.deals
    where deals.id = deliverables.deal_id
    and (auth.uid() = deals.brand_id or auth.uid() = deals.creator_id or auth.uid() = deals.manager_id)
  )
)
with check (
  exists (
    select 1 from public.deals
    where deals.id = deliverables.deal_id
    and (auth.uid() = deals.brand_id or auth.uid() = deals.creator_id or auth.uid() = deals.manager_id)
  )
);

create policy "Participants can read payments"
on public.payments for select
to authenticated
using (
  exists (
    select 1 from public.deals
    where deals.id = payments.deal_id
    and (auth.uid() = deals.brand_id or auth.uid() = deals.creator_id or auth.uid() = deals.manager_id)
  )
);

create policy "Brands can log payments"
on public.payments for insert
to authenticated
with check (
  exists (
    select 1 from public.deals
    where deals.id = payments.deal_id
    and auth.uid() = deals.brand_id
  )
);

create policy "Brands can update payments"
on public.payments for update
to authenticated
using (
  exists (
    select 1 from public.deals
    where deals.id = payments.deal_id
    and auth.uid() = deals.brand_id
  )
)
with check (
  exists (
    select 1 from public.deals
    where deals.id = payments.deal_id
    and auth.uid() = deals.brand_id
  )
);

create index deals_brand_id_idx on public.deals(brand_id);
create index deals_creator_id_idx on public.deals(creator_id);
create index deals_manager_id_idx on public.deals(manager_id);
create index deliverables_deal_id_idx on public.deliverables(deal_id);
