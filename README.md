# Constellax

MVP backend and frontend for creator deal management. The core flow is:

1. A brand creates a deal brief.
2. A creator accepts or rejects it.
3. Deliverables are tracked.
4. Payment status is recorded.

## Stack

- Next.js App Router
- Supabase Auth
- Supabase Postgres
- Supabase Row Level Security

## Project Structure

```text
src/app
  auth/page.tsx        Login and signup
  dashboard/page.tsx   Brand and creator dashboards
  globals.css          App styling
  layout.tsx           Root layout
  page.tsx             Entry screen
src/lib
  status.ts            UI labels for deal/payment states
  types.ts             MVP domain types
  supabase/client.ts   Supabase browser client
supabase/schema.sql    Database schema and RLS policies
```

## Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Copy `.env.example` to `.env.local`.
4. Add your Supabase project URL and anon key.
5. Install dependencies and start the app:

```bash
npm install
npm run dev
```

## MVP Notes

- A signup creates both the Supabase auth user and a public profile row.
- Brand users can create deals for creator users.
- Creator users can accept or reject pending deals.
- Deliverable statuses can be updated by participants.
- Brand users can create or update the payment record for a deal.
