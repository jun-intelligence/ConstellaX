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

alter table public.campaigns alter column brand_id drop not null;
alter table public.campaigns add column if not exists campaign_region text;
alter table public.campaigns add column if not exists compensation_type public.campaign_compensation_type not null default 'paid';
alter table public.campaigns add column if not exists creator_min_fee numeric(12, 2) not null default 0 check (creator_min_fee >= 0);
alter table public.campaigns add column if not exists creator_max_fee numeric(12, 2) not null default 0 check (creator_max_fee >= 0);
alter table public.campaigns add column if not exists product_value numeric(12, 2) not null default 0 check (product_value >= 0);
alter table public.campaigns add column if not exists product_value_min numeric(12, 2) not null default 0 check (product_value_min >= 0);
alter table public.campaigns add column if not exists product_value_max numeric(12, 2) not null default 0 check (product_value_max >= 0);
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
  proposed_fee_min numeric(12, 2) not null default 0 check (proposed_fee_min >= 0),
  proposed_fee_max numeric(12, 2) not null default 0 check (proposed_fee_max >= 0),
  token_fee_amount numeric(12, 2) not null default 0 check (token_fee_amount >= 0),
  product_value numeric(12, 2) not null default 0 check (product_value >= 0),
  follower_count integer not null default 0 check (follower_count >= 0),
  pitch text not null,
  social_handle text,
  portfolio_url text,
  audience_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (campaign_id, creator_id)
);

alter table public.campaign_applications add column if not exists proposed_fee_min numeric(12, 2) not null default 0 check (proposed_fee_min >= 0);
alter table public.campaign_applications add column if not exists proposed_fee_max numeric(12, 2) not null default 0 check (proposed_fee_max >= 0);
alter table public.campaign_applications add column if not exists follower_count integer not null default 0 check (follower_count >= 0);

drop trigger if exists campaign_applications_set_updated_at on public.campaign_applications;
create trigger campaign_applications_set_updated_at before update on public.campaign_applications
for each row execute function public.set_updated_at();

alter table public.campaign_applications enable row level security;

drop policy if exists "Campaign participants can read campaigns" on public.campaigns;
create policy "Campaign participants can read campaigns" on public.campaigns
for select to authenticated
using (auth.uid() = brand_id or auth.uid() = agency_id or application_status = 'open');

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

create index if not exists campaign_applications_campaign_id_idx on public.campaign_applications(campaign_id);
create index if not exists campaign_applications_creator_id_idx on public.campaign_applications(creator_id);
