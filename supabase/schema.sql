create extension if not exists pgcrypto;

do $$
begin
  create type public.user_role as enum ('creator', 'manager', 'brand', 'agency');
exception
  when duplicate_object then null;
end $$;

alter type public.user_role add value if not exists 'agency';

do $$
begin
  create type public.deal_status as enum ('pending_creator', 'active', 'rejected', 'in_review', 'completed', 'cancelled');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.deliverable_status as enum ('not_started', 'in_progress', 'submitted', 'changes_requested', 'approved');
exception
  when duplicate_object then null;
end $$;

alter type public.deliverable_status add value if not exists 'changes_requested';

do $$
begin
  create type public.payment_status as enum ('not_started', 'scheduled', 'partial', 'paid', 'overdue', 'failed');
exception
  when duplicate_object then null;
end $$;

alter type public.payment_status add value if not exists 'scheduled';
alter type public.payment_status add value if not exists 'partial';
alter type public.payment_status add value if not exists 'overdue';

do $$
begin
  create type public.document_status as enum ('drafting', 'sent', 'review', 'signed', 'blocked', 'not_required');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.campaign_compensation_type as enum ('organic_seeding', 'paid', 'token_fee', 'hybrid');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.campaign_application_status as enum ('submitted', 'shortlisted', 'rejected', 'accepted', 'deal_created');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text not null,
  role public.user_role not null default 'creator',
  company_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  objective text not null,
  brand_id uuid references public.users(id) on delete cascade,
  agency_id uuid references public.users(id) on delete set null,
  status text not null default 'planning',
  campaign_budget numeric(12, 2) not null default 0 check (campaign_budget >= 0),
  currency text not null default 'USD',
  start_date date,
  end_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint campaigns_has_owner check (brand_id is not null or agency_id is not null)
);

alter table public.campaigns alter column brand_id drop not null;
alter table public.campaigns add column if not exists compensation_type public.campaign_compensation_type not null default 'paid';
alter table public.campaigns add column if not exists creator_min_fee numeric(12, 2) not null default 0 check (creator_min_fee >= 0);
alter table public.campaigns add column if not exists creator_max_fee numeric(12, 2) not null default 0 check (creator_max_fee >= 0);
alter table public.campaigns add column if not exists product_value numeric(12, 2) not null default 0 check (product_value >= 0);
alter table public.campaigns add column if not exists token_fee_amount numeric(12, 2) not null default 0 check (token_fee_amount >= 0);
alter table public.campaigns add column if not exists creator_slots integer not null default 1 check (creator_slots >= 1);
alter table public.campaigns add column if not exists application_status text not null default 'open';
alter table public.campaigns add column if not exists target_creator_niches text[] not null default '{}'::text[];
alter table public.campaigns add column if not exists target_platforms text[] not null default '{}'::text[];
alter table public.campaigns add column if not exists target_locations text[] not null default '{}'::text[];
alter table public.campaigns add column if not exists min_followers integer not null default 0 check (min_followers >= 0);
alter table public.campaigns add column if not exists max_followers integer check (max_followers is null or max_followers >= min_followers);
alter table public.campaigns add column if not exists creator_requirements text;

alter table public.campaigns drop constraint if exists campaigns_has_owner;
alter table public.campaigns add constraint campaigns_has_owner check (brand_id is not null or agency_id is not null);

create table if not exists public.deals (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references public.campaigns(id) on delete cascade,
  title text not null,
  brief text not null,
  brand_id uuid not null references public.users(id) on delete cascade,
  agency_id uuid references public.users(id) on delete set null,
  manager_id uuid references public.users(id) on delete set null,
  creator_id uuid not null references public.users(id) on delete cascade,
  status public.deal_status not null default 'pending_creator',
  campaign_budget numeric(12, 2) not null default 0 check (campaign_budget >= 0),
  creator_fee numeric(12, 2) not null default 0 check (creator_fee >= 0),
  agency_fee numeric(12, 2) not null default 0 check (agency_fee >= 0),
  platform_fee numeric(12, 2) not null default 0 check (platform_fee >= 0),
  currency text not null default 'USD',
  payment_status public.payment_status not null default 'not_started',
  contract_status public.document_status not null default 'drafting',
  nda_status public.document_status not null default 'not_required',
  due_date date,
  brand_approved_at timestamptz,
  agency_approved_at timestamptz,
  manager_approved_at timestamptz,
  creator_accepted_at timestamptz,
  content_approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.deals alter column brand_id drop not null;
alter table public.deals add column if not exists compensation_type public.campaign_compensation_type not null default 'paid';
alter table public.deals add column if not exists usage_rights text;
alter table public.deals drop constraint if exists deals_has_owner;
alter table public.deals add constraint deals_has_owner check (brand_id is not null or agency_id is not null);

create table if not exists public.campaign_applications (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.campaigns(id) on delete cascade,
  creator_id uuid not null references public.users(id) on delete cascade,
  status public.campaign_application_status not null default 'submitted',
  compensation_type public.campaign_compensation_type not null default 'paid',
  proposed_fee numeric(12, 2) not null default 0 check (proposed_fee >= 0),
  token_fee_amount numeric(12, 2) not null default 0 check (token_fee_amount >= 0),
  product_value numeric(12, 2) not null default 0 check (product_value >= 0),
  pitch text not null,
  social_handle text,
  portfolio_url text,
  audience_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (campaign_id, creator_id)
);

create table if not exists public.deliverables (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid not null references public.deals(id) on delete cascade,
  title text not null,
  description text,
  format text,
  owner_id uuid references public.users(id) on delete set null,
  status public.deliverable_status not null default 'not_started',
  due_date date,
  submitted_at timestamptz,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payment_terms (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid not null unique references public.deals(id) on delete cascade,
  custom_deposit numeric(12, 2) default 0 check (custom_deposit >= 0),
  milestone_payments jsonb not null default '[]'::jsonb,
  net_terms text,
  production_budget numeric(12, 2) default 0 check (production_budget >= 0),
  transport_allocation numeric(12, 2) default 0 check (transport_allocation >= 0),
  hmu_allocation numeric(12, 2) default 0 check (hmu_allocation >= 0),
  usage_rights_fee numeric(12, 2) default 0 check (usage_rights_fee >= 0),
  exclusivity_loading numeric(12, 2) default 0 check (exclusivity_loading >= 0),
  kill_fee numeric(12, 2) default 0 check (kill_fee >= 0),
  late_payment_tracking boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid not null references public.deals(id) on delete cascade,
  payment_term_id uuid references public.payment_terms(id) on delete set null,
  amount numeric(12, 2) not null check (amount >= 0),
  currency text not null default 'USD',
  status public.payment_status not null default 'scheduled',
  issued_at timestamptz,
  due_at timestamptz,
  paid_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid references public.invoices(id) on delete cascade,
  deal_id uuid not null references public.deals(id) on delete cascade,
  amount numeric(12, 2) not null check (amount >= 0),
  currency text not null default 'USD',
  status public.payment_status not null default 'not_started',
  paid_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contracts (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid not null references public.deals(id) on delete cascade,
  document_type text not null default 'creator_agreement',
  status public.document_status not null default 'drafting',
  owner_id uuid references public.users(id) on delete set null,
  signed_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.approval_events (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id uuid not null,
  actor_id uuid references public.users(id) on delete set null,
  status text not null,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.users(id) on delete set null,
  entity_type text not null,
  entity_id uuid not null,
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
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
    company_name = excluded.company_name,
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
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

drop trigger if exists users_set_updated_at on public.users;
create trigger users_set_updated_at before update on public.users
for each row execute function public.set_updated_at();

drop trigger if exists campaigns_set_updated_at on public.campaigns;
create trigger campaigns_set_updated_at before update on public.campaigns
for each row execute function public.set_updated_at();

drop trigger if exists campaign_applications_set_updated_at on public.campaign_applications;
create trigger campaign_applications_set_updated_at before update on public.campaign_applications
for each row execute function public.set_updated_at();

drop trigger if exists deals_set_updated_at on public.deals;
create trigger deals_set_updated_at before update on public.deals
for each row execute function public.set_updated_at();

drop trigger if exists deliverables_set_updated_at on public.deliverables;
create trigger deliverables_set_updated_at before update on public.deliverables
for each row execute function public.set_updated_at();

drop trigger if exists payment_terms_set_updated_at on public.payment_terms;
create trigger payment_terms_set_updated_at before update on public.payment_terms
for each row execute function public.set_updated_at();

drop trigger if exists invoices_set_updated_at on public.invoices;
create trigger invoices_set_updated_at before update on public.invoices
for each row execute function public.set_updated_at();

drop trigger if exists payments_set_updated_at on public.payments;
create trigger payments_set_updated_at before update on public.payments
for each row execute function public.set_updated_at();

drop trigger if exists contracts_set_updated_at on public.contracts;
create trigger contracts_set_updated_at before update on public.contracts
for each row execute function public.set_updated_at();

alter table public.users enable row level security;
alter table public.campaigns enable row level security;
alter table public.campaign_applications enable row level security;
alter table public.deals enable row level security;
alter table public.deliverables enable row level security;
alter table public.payment_terms enable row level security;
alter table public.invoices enable row level security;
alter table public.payments enable row level security;
alter table public.contracts enable row level security;
alter table public.approval_events enable row level security;
alter table public.audit_events enable row level security;

drop policy if exists "Users can read visible profiles" on public.users;
create policy "Users can read visible profiles" on public.users
for select to authenticated using (true);

drop policy if exists "Users can update own profile" on public.users;
create policy "Users can update own profile" on public.users
for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "Users can create own profile" on public.users;
create policy "Users can create own profile" on public.users
for insert to authenticated with check (auth.uid() = id);

drop policy if exists "Campaign participants can read campaigns" on public.campaigns;
create policy "Campaign participants can read campaigns" on public.campaigns
for select to authenticated
using (auth.uid() = brand_id or auth.uid() = agency_id or application_status = 'open');

drop policy if exists "Brands and agencies can create campaigns" on public.campaigns;
create policy "Brands and agencies can create campaigns" on public.campaigns
for insert to authenticated
with check (
  auth.uid() = brand_id
  or auth.uid() = agency_id
);

drop policy if exists "Campaign owners can update campaigns" on public.campaigns;
create policy "Campaign owners can update campaigns" on public.campaigns
for update to authenticated
using (auth.uid() = brand_id or auth.uid() = agency_id)
with check (auth.uid() = brand_id or auth.uid() = agency_id);

drop policy if exists "Creators can create campaign applications" on public.campaign_applications;
create policy "Creators can create campaign applications" on public.campaign_applications
for insert to authenticated
with check (
  auth.uid() = creator_id
  and exists (
    select 1 from public.campaigns
    where campaigns.id = campaign_applications.campaign_id
    and campaigns.application_status = 'open'
  )
);

drop policy if exists "Campaign application participants can read" on public.campaign_applications;
create policy "Campaign application participants can read" on public.campaign_applications
for select to authenticated
using (
  auth.uid() = creator_id
  or exists (
    select 1 from public.campaigns
    where campaigns.id = campaign_applications.campaign_id
    and (auth.uid() = campaigns.brand_id or auth.uid() = campaigns.agency_id)
  )
);

drop policy if exists "Creators can update own campaign applications" on public.campaign_applications;
create policy "Creators can update own campaign applications" on public.campaign_applications
for update to authenticated
using (auth.uid() = creator_id and status = 'submitted')
with check (auth.uid() = creator_id and status = 'submitted');

drop policy if exists "Campaign owners can manage applications" on public.campaign_applications;
create policy "Campaign owners can manage applications" on public.campaign_applications
for update to authenticated
using (
  exists (
    select 1 from public.campaigns
    where campaigns.id = campaign_applications.campaign_id
    and (auth.uid() = campaigns.brand_id or auth.uid() = campaigns.agency_id)
  )
)
with check (
  exists (
    select 1 from public.campaigns
    where campaigns.id = campaign_applications.campaign_id
    and (auth.uid() = campaigns.brand_id or auth.uid() = campaigns.agency_id)
  )
);

drop policy if exists "Deal participants can read deals" on public.deals;
create policy "Deal participants can read deals" on public.deals
for select to authenticated
using (
  auth.uid() = brand_id
  or auth.uid() = agency_id
  or auth.uid() = manager_id
  or auth.uid() = creator_id
);

drop policy if exists "Brands and agencies can create deals" on public.deals;
create policy "Brands and agencies can create deals" on public.deals
for insert to authenticated
with check (
  auth.uid() = brand_id
  or auth.uid() = agency_id
);

drop policy if exists "Deal participants can update deals" on public.deals;
create policy "Deal participants can update deals" on public.deals
for update to authenticated
using (
  auth.uid() = brand_id
  or auth.uid() = agency_id
  or auth.uid() = manager_id
  or auth.uid() = creator_id
)
with check (
  auth.uid() = brand_id
  or auth.uid() = agency_id
  or auth.uid() = manager_id
  or auth.uid() = creator_id
);

drop policy if exists "Participants can read deliverables" on public.deliverables;
create policy "Participants can read deliverables" on public.deliverables
for select to authenticated
using (
  exists (
    select 1 from public.deals
    where deals.id = deliverables.deal_id
    and (
      auth.uid() = deals.brand_id
      or auth.uid() = deals.agency_id
      or auth.uid() = deals.manager_id
      or auth.uid() = deals.creator_id
    )
  )
);

drop policy if exists "Deal owners can create deliverables" on public.deliverables;
create policy "Deal owners can create deliverables" on public.deliverables
for insert to authenticated
with check (
  exists (
    select 1 from public.deals
    where deals.id = deliverables.deal_id
    and (auth.uid() = deals.brand_id or auth.uid() = deals.agency_id or auth.uid() = deals.manager_id)
  )
);

drop policy if exists "Participants can update deliverables" on public.deliverables;
create policy "Participants can update deliverables" on public.deliverables
for update to authenticated
using (
  exists (
    select 1 from public.deals
    where deals.id = deliverables.deal_id
    and (
      auth.uid() = deals.brand_id
      or auth.uid() = deals.agency_id
      or auth.uid() = deals.manager_id
      or auth.uid() = deals.creator_id
    )
  )
)
with check (
  exists (
    select 1 from public.deals
    where deals.id = deliverables.deal_id
    and (
      auth.uid() = deals.brand_id
      or auth.uid() = deals.agency_id
      or auth.uid() = deals.manager_id
      or auth.uid() = deals.creator_id
    )
  )
);

drop policy if exists "Participants can read payment terms" on public.payment_terms;
create policy "Participants can read payment terms" on public.payment_terms
for select to authenticated
using (
  exists (
    select 1 from public.deals
    where deals.id = payment_terms.deal_id
    and (
      auth.uid() = deals.brand_id
      or auth.uid() = deals.agency_id
      or auth.uid() = deals.manager_id
      or auth.uid() = deals.creator_id
    )
  )
);

drop policy if exists "Brands agencies and managers can manage payment terms" on public.payment_terms;
create policy "Brands agencies and managers can manage payment terms" on public.payment_terms
for all to authenticated
using (
  exists (
    select 1 from public.deals
    where deals.id = payment_terms.deal_id
    and (auth.uid() = deals.brand_id or auth.uid() = deals.agency_id or auth.uid() = deals.manager_id)
  )
)
with check (
  exists (
    select 1 from public.deals
    where deals.id = payment_terms.deal_id
    and (auth.uid() = deals.brand_id or auth.uid() = deals.agency_id or auth.uid() = deals.manager_id)
  )
);

drop policy if exists "Participants can read financial records" on public.invoices;
create policy "Participants can read financial records" on public.invoices
for select to authenticated
using (
  exists (
    select 1 from public.deals
    where deals.id = invoices.deal_id
    and (
      auth.uid() = deals.brand_id
      or auth.uid() = deals.agency_id
      or auth.uid() = deals.manager_id
      or auth.uid() = deals.creator_id
    )
  )
);

drop policy if exists "Brands agencies and managers can manage invoices" on public.invoices;
create policy "Brands agencies and managers can manage invoices" on public.invoices
for all to authenticated
using (
  exists (
    select 1 from public.deals
    where deals.id = invoices.deal_id
    and (auth.uid() = deals.brand_id or auth.uid() = deals.agency_id or auth.uid() = deals.manager_id)
  )
)
with check (
  exists (
    select 1 from public.deals
    where deals.id = invoices.deal_id
    and (auth.uid() = deals.brand_id or auth.uid() = deals.agency_id or auth.uid() = deals.manager_id)
  )
);

drop policy if exists "Participants can read payments" on public.payments;
create policy "Participants can read payments" on public.payments
for select to authenticated
using (
  exists (
    select 1 from public.deals
    where deals.id = payments.deal_id
    and (
      auth.uid() = deals.brand_id
      or auth.uid() = deals.agency_id
      or auth.uid() = deals.manager_id
      or auth.uid() = deals.creator_id
    )
  )
);

drop policy if exists "Brands agencies and managers can manage payments" on public.payments;
create policy "Brands agencies and managers can manage payments" on public.payments
for all to authenticated
using (
  exists (
    select 1 from public.deals
    where deals.id = payments.deal_id
    and (auth.uid() = deals.brand_id or auth.uid() = deals.agency_id or auth.uid() = deals.manager_id)
  )
)
with check (
  exists (
    select 1 from public.deals
    where deals.id = payments.deal_id
    and (auth.uid() = deals.brand_id or auth.uid() = deals.agency_id or auth.uid() = deals.manager_id)
  )
);

drop policy if exists "Participants can read contracts" on public.contracts;
create policy "Participants can read contracts" on public.contracts
for select to authenticated
using (
  exists (
    select 1 from public.deals
    where deals.id = contracts.deal_id
    and (
      auth.uid() = deals.brand_id
      or auth.uid() = deals.agency_id
      or auth.uid() = deals.manager_id
      or auth.uid() = deals.creator_id
    )
  )
);

drop policy if exists "Brands agencies and managers can manage contracts" on public.contracts;
create policy "Brands agencies and managers can manage contracts" on public.contracts
for all to authenticated
using (
  exists (
    select 1 from public.deals
    where deals.id = contracts.deal_id
    and (auth.uid() = deals.brand_id or auth.uid() = deals.agency_id or auth.uid() = deals.manager_id)
  )
)
with check (
  exists (
    select 1 from public.deals
    where deals.id = contracts.deal_id
    and (auth.uid() = deals.brand_id or auth.uid() = deals.agency_id or auth.uid() = deals.manager_id)
  )
);

drop policy if exists "Participants can read approval events" on public.approval_events;
create policy "Participants can read approval events" on public.approval_events
for select to authenticated using (actor_id = auth.uid());

drop policy if exists "Authenticated users can create approval events" on public.approval_events;
create policy "Authenticated users can create approval events" on public.approval_events
for insert to authenticated with check (actor_id = auth.uid());

drop policy if exists "Participants can read audit events" on public.audit_events;
create policy "Participants can read audit events" on public.audit_events
for select to authenticated using (actor_id = auth.uid());

drop policy if exists "Authenticated users can create audit events" on public.audit_events;
create policy "Authenticated users can create audit events" on public.audit_events
for insert to authenticated with check (actor_id = auth.uid());

create index if not exists campaigns_brand_id_idx on public.campaigns(brand_id);
create index if not exists campaigns_agency_id_idx on public.campaigns(agency_id);
create index if not exists campaign_applications_campaign_id_idx on public.campaign_applications(campaign_id);
create index if not exists campaign_applications_creator_id_idx on public.campaign_applications(creator_id);
create index if not exists deals_campaign_id_idx on public.deals(campaign_id);
create index if not exists deals_brand_id_idx on public.deals(brand_id);
create index if not exists deals_agency_id_idx on public.deals(agency_id);
create index if not exists deals_manager_id_idx on public.deals(manager_id);
create index if not exists deals_creator_id_idx on public.deals(creator_id);
create index if not exists deliverables_deal_id_idx on public.deliverables(deal_id);
create index if not exists payment_terms_deal_id_idx on public.payment_terms(deal_id);
create index if not exists invoices_deal_id_idx on public.invoices(deal_id);
create index if not exists payments_deal_id_idx on public.payments(deal_id);
create index if not exists contracts_deal_id_idx on public.contracts(deal_id);
create index if not exists approval_events_entity_idx on public.approval_events(entity_type, entity_id);
create index if not exists audit_events_entity_idx on public.audit_events(entity_type, entity_id);
