# Architecture

ConstellaX is a frontend-first MVP for trusted creator campaign operations. It is designed as the foundation for a future Supabase-backed product, but the current implementation uses mock data only.

## Current Stack

- Next.js App Router.
- React components.
- TypeScript.
- CSS in `src/app/globals.css`.
- Supabase client placeholders from the earlier MVP.
- Mock product, AI, campaign, payment, account, and settings data.

## App Structure

```text
src/app
  page.tsx                              Trust and workflow homepage
  demo                                  Investor demo flow
  dashboard/[role]                      Creator, manager, brand, agency dashboards
  dashboard/ai-manager                  AI Manager dashboard
  dashboard/ai-manager/chat-studio      AI Manager Chat Studio
  ai/*                                  AI recommendations, reports, reputation, notifications
  campaigns                             Campaign list
  campaigns/[id]                        Campaign operating record
  analytics/creator                     Creator analytics
  trust                                 Trust and transparency center
  contracts                             Contracts vault
  payments                              Payment transparency center
  workspace                             Campaign workspace and modular widgets
  settings/*                            Mock account and workspace settings
  login, signup, forgot-password        Mock auth placeholders
  community                             Future community preview
  operating-system                      Platform architecture narrative

src/components
  ui                                    App shell, sidebar, top bar frame, cards, tables, auth/settings helpers
  product                               Product-specific composite components
  workspace                             Modular workspace component

src/lib
  intelligence.ts                       Mock operations, trust, payment, role, and workspace data
  mockAI.ts                             Mock AI recommendations, reports, live tracking
  mockOperatingSystem.ts                Mock platform system data
  mockProduct.ts                        Mock campaigns, agencies, deals
  accountSettings.ts                    Mock user/account settings
  types.ts                              MVP domain types
```

## App Shell

`AppFrame` owns the app-level navigation experience:

- Collapsible sidebar.
- Icon-only collapsed state.
- Top search.
- AI Manager shortcut.
- Notifications shortcut.
- Mock account menu.
- Settings and sign-out placeholder links.

The sidebar collapse state is stored locally with `localStorage`. This is a visual preference only.

## Reusable Components

- `AppShell`: shared page hero and page wrapper.
- `AppFrame`: app-level chrome with sidebar and top bar.
- `Sidebar`: grouped product navigation.
- `MetricCard`: KPI card.
- `StatusBadge`: compact state label.
- `DataTable`: responsive table.
- `AIRecommendationCard`: AI insight card.
- `NotificationPanel`: notification surface.
- `RoleDashboard`: dashboard renderer for user roles.
- `PaymentTermsModule`: flexible payment terms UI.
- `ModularWorkspace`: draggable/resizable mock workspace.
- `MockAuthForm`: login/signup/forgot-password placeholder.
- `SettingsPage`: settings index and section renderer.

## AI Architecture Direction

Current AI is mock-only. Future AI should be introduced behind typed service boundaries:

- `AgentService`: chat, strategic advice, creative direction, negotiation guidance, workflow assistance.
- `BrandIntelligenceService`: creator matching, audience fit, ROI potential, trust score.
- `CreatorIntelligenceService`: trend signals, content forecasting, growth recommendations.
- `ReportService`: campaign reporting, live post metric summaries, audience demographics.
- `TrustService`: approvals, contracts, payment timelines, audit trail summaries.

The frontend should consume structured results, not raw prompts.

## Trust And Payment Architecture

ConstellaX should support flexible negotiated payment terms between creators, managers, agencies, and brands.

The platform's role is:

- Transparency.
- Documentation.
- Workflow tracking.
- Approval records.
- Accountability.
- Reminders and overdue visibility.

The platform should not enforce one rigid payment structure or commit terms without human confirmation.

## Future Backend Direction

Supabase should eventually provide:

- Auth.
- Postgres persistence.
- Row-level security.
- File storage for contracts, NDAs, invoices, and creative assets.
- Realtime updates for approvals, comments, live post sync events, and reminders.

Current route pages are intentionally mock-only.
