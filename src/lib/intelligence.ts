export type Role = "creator" | "manager" | "agency" | "brand";

export const roleDashboards: Record<
  Role,
  {
    title: string;
    subtitle: string;
    metrics: Array<{ label: string; value: string; note: string }>;
    priorities: Array<{ title: string; detail: string; status: string }>;
  }
> = {
  creator: {
    title: "Creator dashboard",
    subtitle: "A calm operating room for revenue, deals, deadlines, insights, and representation gaps.",
    metrics: [
      { label: "Booked revenue", value: "$148K", note: "Active and scheduled" },
      { label: "Trust score", value: "92", note: "Reliability composite" },
      { label: "Growth forecast", value: "+6.2%", note: "Next 30 days" }
    ],
    priorities: [
      { title: "Review Lumina usage rights", detail: "AI suggests limiting paid usage to 60 days.", status: "Action" },
      { title: "Send renewal prompt", detail: "Performance is above plan before closeout.", status: "Suggested" },
      { title: "Approve report draft", detail: "Campaign insights are ready for final review.", status: "Ready" }
    ]
  },
  manager: {
    title: "Manager dashboard",
    subtitle: "Portfolio oversight for creator fees, deal terms, approvals, renewals, and brand health.",
    metrics: [
      { label: "Managed creators", value: "18", note: "Active roster" },
      { label: "Open approvals", value: "9", note: "Needs review" },
      { label: "Renewal pipeline", value: "$420K", note: "Next 60 days" }
    ],
    priorities: [
      { title: "Negotiate Atlas rider", detail: "Usage language is broader than the creator fee.", status: "Urgent" },
      { title: "Approve Maya report", detail: "Closeout story is renewal-ready.", status: "Ready" },
      { title: "Check payment timeline", detail: "First installment needs brand finance confirmation.", status: "Watch" }
    ]
  },
  agency: {
    title: "Agency dashboard",
    subtitle: "Campaign control for brands, creators, managers, approvals, budgets, contracts, and reporting.",
    metrics: [
      { label: "Active campaigns", value: "8", note: "Across 4 brands" },
      { label: "Managed budget", value: "$1.84M", note: "Current quarter" },
      { label: "Approval SLA", value: "91%", note: "On time" }
    ],
    priorities: [
      { title: "Finalize Sofia redlines", detail: "Contract is waiting on agency approval.", status: "Due" },
      { title: "Package Lumina reporting", detail: "Strong engagement supports renewal pitch.", status: "Ready" },
      { title: "Shortlist clean beauty creators", detail: "Brand fit model found three strong matches.", status: "AI" }
    ]
  },
  brand: {
    title: "Brand dashboard",
    subtitle: "Campaign intelligence for creator fit, ROI potential, approvals, payments, and partner trust.",
    metrics: [
      { label: "Campaign ROI score", value: "86", note: "Projected" },
      { label: "Creator matches", value: "24", note: "High compatibility" },
      { label: "Open payments", value: "$64K", note: "Scheduled" }
    ],
    priorities: [
      { title: "Approve Maya concept", detail: "Strong fit with audience quality signals.", status: "Approve" },
      { title: "Review creator shortlist", detail: "Brand intelligence ranked ROI potential.", status: "AI" },
      { title: "Confirm payment schedule", detail: "Transparency center will log finance timing.", status: "Finance" }
    ]
  }
};

export const creatorScores = [
  {
    creator: "Maya Chen",
    creatorScore: 94,
    engagementQuality: 91,
    audienceQuality: 93,
    brandCompatibility: 96,
    reliability: 92,
    trend: "Beauty education momentum"
  },
  {
    creator: "Noor Patel",
    creatorScore: 89,
    engagementQuality: 87,
    audienceQuality: 90,
    brandCompatibility: 89,
    reliability: 88,
    trend: "Derm-led content rising"
  },
  {
    creator: "Theo Grant",
    creatorScore: 86,
    engagementQuality: 88,
    audienceQuality: 84,
    brandCompatibility: 83,
    reliability: 91,
    trend: "Retail running intent"
  }
];

export const demoCreators = [
  {
    name: "Maya Chen",
    niche: "Beauty education",
    audience: "1.8M",
    avgRate: "$18K",
    trustScore: 92,
    manager: "Riley Park"
  },
  {
    name: "Noor Patel",
    niche: "Derm-led routines",
    audience: "940K",
    avgRate: "$16K",
    trustScore: 88,
    manager: "Jordan Wells"
  },
  {
    name: "Theo Grant",
    niche: "Running performance",
    audience: "1.2M",
    avgRate: "$22K",
    trustScore: 91,
    manager: "Morgan Lee"
  }
];

export const demoBrands = [
  {
    name: "Lumina Beauty",
    category: "Skincare",
    activeCampaigns: 3,
    paymentReliability: 94,
    approvalSpeed: "Fast"
  },
  {
    name: "Atlas Performance",
    category: "Athletic retail",
    activeCampaigns: 2,
    paymentReliability: 89,
    approvalSpeed: "Medium"
  },
  {
    name: "Everform",
    category: "Wellness",
    activeCampaigns: 1,
    paymentReliability: 91,
    approvalSpeed: "Fast"
  }
];

export const demoAgencies = [
  {
    name: "Northstar Social",
    focus: "Beauty and lifestyle launches",
    managedBudget: "$1.84M",
    approvalSla: "91%"
  },
  {
    name: "Kinetic Studio",
    focus: "Performance reporting",
    managedBudget: "$970K",
    approvalSla: "88%"
  }
];

export const intelligenceFeed = [
  {
    title: "Creator-brand fit",
    detail: "Maya Chen is the strongest match for Lumina based on audience saves and trust.",
    score: 96
  },
  {
    title: "Trend prediction",
    detail: "Barrier repair and SPF education are likely to outperform beauty baseline.",
    score: 88
  },
  {
    title: "Algorithm insight",
    detail: "Shorter problem-led hooks are forecasted to improve completion rate.",
    score: 84
  },
  {
    title: "Renewal signal",
    detail: "Northstar Social relationship quality suggests a strong renewal opportunity.",
    score: 86
  }
];

export const workspaceDefaults = [
  { id: "revenue", title: "Revenue", value: "$148K", size: "large", note: "Booked and scheduled" },
  { id: "campaigns", title: "Campaigns", value: "8", size: "medium", note: "In motion" },
  { id: "analytics", title: "Analytics", value: "4.9%", size: "medium", note: "Quality engagement" },
  { id: "ai", title: "AI insights", value: "7", size: "large", note: "Recommended next actions" },
  { id: "calendar", title: "Calendar", value: "5", size: "small", note: "Deadlines this week" },
  { id: "notifications", title: "Notifications", value: "3", size: "small", note: "Needs attention" },
  { id: "circles", title: "Creator circles", value: "3", size: "medium", note: "Trusted groups" }
];

export const operatingNav = [
  { label: "Creator", href: "/dashboard/creator" },
  { label: "Manager", href: "/dashboard/manager" },
  { label: "Brand", href: "/dashboard/brand" },
  { label: "Agency", href: "/dashboard/agency" },
  { label: "AI", href: "/dashboard/ai-manager" },
  { label: "Workspace", href: "/workspace" }
];

export const contracts = [
  { name: "Lumina usage rights", party: "Lumina Beauty", status: "Signed", updated: "May 06" },
  { name: "Atlas paid usage rider", party: "Atlas Performance", status: "Review", updated: "May 07" },
  { name: "Sofia Lane NDA", party: "Northstar Social", status: "Pending", updated: "May 09" }
];

export const payments = [
  { name: "Maya Chen installment", amount: "$9,000", status: "Scheduled", due: "May 10" },
  { name: "Theo Grant partial", amount: "$11,000", status: "Partial", due: "May 12" },
  { name: "Sofia Lane deposit", amount: "$4,350", status: "Not started", due: "Pending" }
];

export const paymentTerms = {
  deal: "Lumina serum launch creator package",
  role:
    "ConstellaX documents negotiated terms, tracks approvals, and makes risk visible. It does not force a rigid payment structure.",
  parties: [
    "Creator: Maya Chen",
    "Manager: Riley Park",
    "Agency: Northstar Social",
    "Brand: Lumina Beauty"
  ],
  metrics: [
    { label: "Invoice status", value: "Issued", note: "Brand finance has acknowledged receipt" },
    { label: "Approval records", value: "6", note: "Contract, NDA, fee, usage, invoice, schedule" },
    { label: "Overdue alerts", value: "1", note: "Usage rights balance needs attention" }
  ],
  terms: [
    { label: "Custom deposit", value: "50%", detail: "Negotiated before production begins" },
    { label: "Milestone payments", value: "2", detail: "First cut approval and final delivery" },
    { label: "Net payment terms", value: "Net 30", detail: "Starts after invoice acceptance" },
    { label: "Production budget", value: "$4,000", detail: "Separated from creator fee for clarity" },
    { label: "Transport allocation", value: "$650", detail: "Receipt-backed transport allowance" },
    { label: "H&MU allocation", value: "$1,200", detail: "Hair and makeup budget documented upfront" },
    { label: "Usage rights fee", value: "$7,500", detail: "60-day paid social usage window" },
    { label: "Exclusivity loading", value: "15%", detail: "Skincare category exclusivity premium" },
    { label: "Kill fee", value: "25%", detail: "Applies after creator-side production approval" }
  ],
  timeline: [
    {
      label: "Terms proposed",
      date: "May 03, 10:18",
      detail: "Agency shared campaign fee structure with creator manager.",
      status: "Logged"
    },
    {
      label: "Deposit approved",
      date: "May 06, 09:15",
      detail: "Brand finance approved 50% deposit and production budget.",
      status: "Approved"
    },
    {
      label: "Invoice issued",
      date: "May 07, 13:40",
      detail: "Creator manager issued invoice with Net 30 balance terms.",
      status: "Issued"
    },
    {
      label: "Usage balance due",
      date: "Jun 06, 17:00",
      detail: "Usage rights fee balance will be flagged if not acknowledged.",
      status: "Watch"
    }
  ],
  approvals: [
    { party: "Brand finance", timestamp: "May 06, 09:15", status: "Deposit approved" },
    { party: "Agency lead", timestamp: "May 06, 09:42", status: "Production budget approved" },
    { party: "Creator manager", timestamp: "May 06, 11:08", status: "Fee terms accepted" },
    { party: "Creator", timestamp: "May 06, 12:20", status: "Usage scope accepted" }
  ],
  invoiceStatus: [
    { label: "Deposit invoice", state: "Scheduled", detail: "Due May 10" },
    { label: "Milestone invoice", state: "Draft", detail: "Triggered by first cut approval" },
    { label: "Usage rights balance", state: "Overdue risk", detail: "Alert set 5 days before due date" }
  ],
  trustIndicators: [
    "Payment schedule approved before creator production",
    "Invoice timestamps visible to permitted parties",
    "Late payment alert prepared for manager and agency",
    "Optional reliability signal attached to brand and agency profiles"
  ]
};

export const trustOperations = {
  campaignStatus: [
    { label: "Brief", state: "Complete", detail: "Budget, owners, objectives, and usage needs captured." },
    { label: "Approvals", state: "In progress", detail: "Manager approval pending for one creator package." },
    { label: "Contracts", state: "Clear", detail: "Primary contract and NDA signed for selected creator." },
    { label: "Payment", state: "Scheduled", detail: "Deposit invoice acknowledged by brand finance." },
    { label: "Reporting", state: "Queued", detail: "Closeout report starts after final deliverable approval." }
  ],
  communications: [
    {
      from: "Riley Park",
      role: "Creator manager",
      topic: "Usage rights",
      detail: "Confirmed 60-day paid social window and requested renewal option language.",
      lastTouch: "May 06, 11:08",
      nextStep: "Brand legal to confirm renewal language"
    },
    {
      from: "Northstar Social",
      role: "Agency lead",
      topic: "Payment schedule",
      detail: "Shared deposit, milestone, usage rights fee, and Net 30 balance with all parties.",
      lastTouch: "May 06, 09:42",
      nextStep: "Finance confirmation before production"
    },
    {
      from: "Elena Brooks",
      role: "Brand owner",
      topic: "Concept approval",
      detail: "Approved Maya Chen concept board with one product claim revision.",
      lastTouch: "May 06, 14:20",
      nextStep: "Creator to upload first cut"
    }
  ],
  deliverables: [
    { item: "Concept board", owner: "Maya Chen", due: "May 08", status: "Approved", notes: "Brand approved with claim revision." },
    { item: "First cut", owner: "Maya Chen", due: "May 12", status: "In progress", notes: "Reminder scheduled 48 hours before due date." },
    { item: "Final video", owner: "Maya Chen", due: "May 18", status: "Waiting", notes: "Unlocks milestone invoice after approval." },
    { item: "Usage asset pack", owner: "Northstar Social", due: "May 21", status: "Waiting", notes: "Requires final rights confirmation." }
  ],
  documents: [
    { document: "Creator agreement", status: "Signed", owner: "Brand legal", clarity: "Fee, deliverables, kill fee, and revisions included." },
    { document: "NDA", status: "Signed", owner: "Agency operations", clarity: "Covers pre-launch product details and claim guidance." },
    { document: "Usage rights rider", status: "Review", owner: "Creator manager", clarity: "60-day paid usage, renewal option, and exclusivity loading." },
    { document: "Invoice packet", status: "Issued", owner: "Brand finance", clarity: "Deposit, milestone, usage rights fee, and Net 30 balance separated." }
  ],
  auditTrail: [
    { event: "Campaign brief created", actor: "Northstar Social", time: "May 03, 10:18", evidence: "Budget, target, deliverables, and rights needs logged." },
    { event: "Creator recommended", actor: "ConstellaX Intelligence", time: "May 04, 09:30", evidence: "Compatibility, audience quality, and reliability rationale attached." },
    { event: "Fee terms accepted", actor: "Riley Park", time: "May 06, 11:08", evidence: "Creator fee, deposit, usage fee, and kill fee acknowledged." },
    { event: "Contract signed", actor: "Lumina Beauty", time: "May 06, 16:30", evidence: "Agreement and NDA status updated for all permitted parties." },
    { event: "Invoice issued", actor: "Park Talent", time: "May 07, 13:40", evidence: "Invoice timestamp and Net 30 balance visible in payment center." }
  ],
  reminders: [
    { title: "Deposit due", timing: "May 10", severity: "Watch", detail: "Finance reminder prepared if payment is not marked scheduled." },
    { title: "First cut due", timing: "May 12", severity: "Normal", detail: "Creator and manager reminder scheduled 48 hours before due date." },
    { title: "Usage balance risk", timing: "Jun 01", severity: "Important", detail: "Alert triggers five days before usage fee balance is due." }
  ]
};
