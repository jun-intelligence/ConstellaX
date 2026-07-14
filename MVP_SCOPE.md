# MVP Scope

## Goal

Prove that ConstellaX can be the trusted operating layer for creator campaign work before adding real backend, real AI, real payments, or real social integrations.

## In Scope

- Premium frontend product experience using mock data.
- App shell with collapsible sidebar, top search, AI shortcut, notifications shortcut, and mock account menu.
- Placeholder auth pages:
  - `/login`
  - `/signup`
  - `/forgot-password`
- Settings pages:
  - `/settings`
  - `/settings/profile`
  - `/settings/billing`
  - `/settings/notifications`
  - `/settings/security`
  - `/settings/workspace`
- Role dashboards for creators, managers, brands, agencies, and AI Manager.
- AI Manager Chat Studio at `/dashboard/ai-manager/chat-studio`.
- Mock chat interface with role selector, suggested prompts, campaign context, quick actions, structured AI response cards, storyboard output, and save/export/send placeholders.
- Campaign management pages with campaign status visibility, budget breakdowns, creator shortlist, manager communications, approval queue, deliverables tracker, rights and fee records.
- Flexible payment terms module with deposits, milestones, Net terms, production budgets, transport, H&MU, usage rights, exclusivity, kill fees, invoice status, overdue alerts, approval timestamps, and optional trust indicators.
- Contracts and NDA clarity.
- Trust center with audit trail visibility and reminders.
- Campaign report previews with views, reach, ER, likes, comments, saves, shares, gender breakdown, age breakdown, and mock live post tracking by linked accounts and hashtags.
- Modular workspace with mock campaign workflow and draggable/resizable widgets.

## Out Of Scope

- Real Supabase Auth implementation.
- Real AI model calls.
- Real social account connection or live API tracking.
- Real payments or payment enforcement.
- Real contracts, e-signature, or legal approval.
- Real PDF export.
- Real message sending.
- Production RBAC and permissions.
- Production database persistence for new surfaces.
- Full social/community network.

## Product Boundary

ConstellaX should document, advise, organize, and track. It should not silently commit a creator, manager, agency, or brand to a payment term, contract approval, deliverable approval, or outbound message.

The MVP should feel complete as an investor and beta-user demo while remaining honest: mock-only, frontend-first, and ready for future Supabase-backed implementation.
