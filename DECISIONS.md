# Decisions

## 1. Frontend-First MVP

Decision: Build the MVP as a polished frontend with mock data only.

Reason: The product needs to prove workflow clarity, trust, and investor/beta-user story before backend complexity.

## 2. Product Positioning

Decision: ConstellaX is trusted infrastructure for the business of influence, not an influencer marketplace.

Reason: The strongest wedge is operational trust: approvals, contracts, payment visibility, deliverables, reporting, and audit trail.

## 3. Agencies Are In Scope

Decision: Agencies are a core MVP user type.

Reason: Most brands still operate influencer campaigns through agencies. The product supports the current workflow while creating rails for more direct brand-manager-creator collaboration over time.

## 4. AI Advises, Humans Confirm

Decision: AI Manager can advise, draft, structure options, create storyboards, identify risks, recommend negotiation points, and draft reports. It cannot auto-send messages, approve contracts, or commit payment terms.

Reason: Creator business decisions carry financial, legal, and relationship risk. Human confirmation is essential.

## 5. Flexible Payment Terms

Decision: Do not enforce rigid payment structures.

Reason: Creator, manager, agency, and brand payment terms are negotiated. ConstellaX should document deposits, milestones, Net terms, production budgets, usage fees, exclusivity, kill fees, invoice status, overdue alerts, and approvals.

## 6. Trust And Transparency Over Social Features

Decision: Do not over-expand the social layer in the MVP.

Reason: The product should first establish business trust through real workflow records. Community and audience layers can come later.

## 7. App Shell Matters

Decision: Add collapsible sidebar, top search, AI shortcut, notifications shortcut, account menu, and settings routes.

Reason: The product should feel like a modern productivity system similar in quality to ChatGPT, Notion, and Linear.

## 8. Mock Auth Routes

Decision: Add `/login`, `/signup`, and `/forgot-password` as clean placeholders.

Reason: The app needs account UX, but real Supabase Auth is out of MVP scope for now.

## 9. Reporting Should Include Live Tracking Direction

Decision: Reports should include view counts, reach, ER, likes, comments, saves, shares, gender, age, and mock live post tracking by connected accounts and hashtags.

Reason: Campaign reporting is a core trust surface for brands, agencies, managers, and creators.

## 10. Visual Design Direction

Decision: Keep the app mostly neutral and premium, with calm color accents for status, money, workflow, and icon meaning.

Reason: The product should feel emotionally reassuring and operationally clear, not flashy or gimmicky.
