# Database Schema Direction

No new backend schema is implemented yet. This document describes the future Supabase/Postgres shape.

## Core Identity Tables

- `users`: Supabase auth user id, name, email, default role, avatar, created date.
- `organizations`: brand, agency, management company, or creator company records.
- `organization_members`: user, organization, role, permissions.
- `creator_profiles`: creator user, niche, audience size, social handles, rate guidance, portfolio, reliability score.
- `brand_profiles`: organization, category, approval behavior, payment reliability.
- `agency_profiles`: organization, specialties, managed budget, service fee preferences.

## Campaign Workflow Tables

- `campaigns`: brand, agency, name, objective, budget, timeline, status, owners.
- `campaign_briefs`: campaign, goals, target audience, deliverables, usage needs, creative direction.
- `campaign_creators`: campaign, creator, manager, shortlist status, fit score, quoted fee.
- `deals`: campaign, creator, manager, agency, brand, status, creator fee, agency fee, platform fee.
- `deliverables`: deal, title, format, due date, owner, status, approval state.
- `deliverable_assets`: deliverable, file, platform, preview image, version, approval metadata.
- `communications`: campaign, sender, recipient, topic, message, next step, timestamp.
- `approval_events`: entity type, entity id, actor, status, timestamp, notes.

## Trust, Contracts, And Payments

- `contracts`: deal, document type, file id, status, owner, signed date.
- `ndas`: deal, file id, status, signed date.
- `usage_rights`: deal, duration, platforms, territory, paid usage scope, whitelisting, renewal terms.
- `payment_terms`: deal, custom deposit, milestones, Net terms, production budget, transport allocation, H&MU allocation, usage rights fee, exclusivity loading, kill fee, notes.
- `invoices`: deal, payment term, amount, currency, issue date, due date, status.
- `payments`: invoice, amount, due date, paid date, status, method, notes.
- `reminders`: entity type, entity id, recipient, reminder type, scheduled date, status.
- `audit_events`: actor, entity type, entity id, action, timestamp, metadata.

## AI And Reporting Tables

- `ai_conversations`: user, campaign, role context, created date.
- `ai_messages`: conversation, sender type, content, structured output JSON, created date.
- `ai_outputs`: campaign, output type, title, content JSON, saved state, created by.
- `ai_recommendations`: user or campaign, type, summary, rationale, confidence, dismissed state.
- `storyboards`: campaign, generated output, frames JSON, saved state.
- `campaign_reports`: campaign, summary, next action, generated date.
- `report_metrics`: report, views, reach, ER, likes, comments, saves, shares, CTR, approvals.
- `audience_demographics`: report, dimension, label, percentage.
- `connected_social_accounts`: creator, platform, handle, auth status, last sync.
- `tracked_posts`: campaign, creator, platform, post URL, hashtags, views, ER, status, last sync.

## Workspace And Settings Tables

- `workspace_layouts`: user, workspace, widget layout JSON.
- `user_preferences`: user, sidebar collapsed, notification preferences, default dashboard.
- `billing_profiles`: organization, plan, payment method placeholder, finance contact.
- `security_settings`: user, two-factor status, session metadata.

## RLS Direction

- Creators see their own campaigns, deliverables, contracts, payments, AI conversations, and reports.
- Managers see represented creator data.
- Brands see their campaigns and contracted creator data.
- Agencies see campaigns they operate.
- Organization admins manage members and billing.
- Audiences do not access private business data.

## Important Constraints

- Every deal should retain an audit trail.
- AI outputs should be drafts until a human saves, sends, approves, or applies them.
- Payment terms should remain flexible and negotiated.
- Contract, NDA, payment, and approval states should be visible to permitted parties.
- Live social tracking should require explicit creator account connection and campaign hashtag matching.
