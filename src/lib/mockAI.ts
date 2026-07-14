export type AIRecommendationType =
  | "outreach"
  | "campaign"
  | "pricing"
  | "contract"
  | "renewal"
  | "relationship";

export type NotificationPriority = "low" | "medium" | "high";

export const aiManagerProfile = {
  creatorName: "Maya Chen",
  positioning: "Beauty education creator with high-trust skincare content.",
  trustScore: 92,
  reputationSignals: [
    "On-time delivery rate: 97 percent",
    "Payment disputes: none open",
    "Contract completion: 14 of 15 signed",
    "Audience quality: strong repeat engagement"
  ],
  nextActions: [
    "Follow up with Lumina Beauty on usage window approval.",
    "Counter Atlas Performance at a higher creator fee based on audience fit.",
    "Prepare renewal summary for Northstar Social."
  ]
};

export const aiRecommendations: Array<{
  id: string;
  type: AIRecommendationType;
  title: string;
  summary: string;
  rationale: string;
  confidence: number;
}> = [
  {
    id: "rate-lumina",
    type: "pricing",
    title: "Raise the Lumina renewal rate by 18 percent.",
    summary: "Audience saves and completion rate are above the creator benchmark.",
    rationale: "The campaign has strong intent signals and paid usage is likely to extend beyond the first window.",
    confidence: 91
  },
  {
    id: "usage-atlas",
    type: "contract",
    title: "Limit paid usage to 60 days unless fees increase.",
    summary: "The current draft includes broad whitelisting language.",
    rationale: "Usage rights should scale with duration, geography, and paid media spend.",
    confidence: 88
  },
  {
    id: "brand-outreach",
    type: "outreach",
    title: "Send targeted outreach to three clean beauty brands.",
    summary: "Recent audience interest points to SPF, barrier repair, and sensitive skin routines.",
    rationale: "These categories align with creator authority and current audience questions.",
    confidence: 84
  },
  {
    id: "renewal-northstar",
    type: "renewal",
    title: "Open renewal conversation with Northstar Social.",
    summary: "Performance is trending above plan before final report delivery.",
    rationale: "Early renewal timing improves leverage before the campaign fully closes.",
    confidence: 86
  }
];

export const aiReports = [
  {
    id: "lumina-closeout",
    campaign: "Lumina Spring Launch",
    headline: "Strong engagement and high commercial intent.",
    metrics: {
      views: "11.8M",
      reach: "8.4M",
      er: "4.8%",
      likes: "286K",
      comments: "18.2K",
      saves: "142K",
      shares: "31.4K",
      approvals: "18 / 27"
    },
    summary:
      "Performance is ahead of plan, with saves and comments showing clear product consideration.",
    nextAction: "Package a renewal proposal with expanded usage rights and a bundled creator fee.",
    audienceGender: [
      { label: "Women", value: 68 },
      { label: "Men", value: 24 },
      { label: "Non-binary / undisclosed", value: 8 }
    ],
    audienceAge: [
      { label: "18-24", value: 22 },
      { label: "25-34", value: 46 },
      { label: "35-44", value: 21 },
      { label: "45+", value: 11 }
    ],
    liveTracking: {
      linkedAccounts: ["TikTok: @mayachen", "Instagram: @mayachenbeauty", "YouTube Shorts: Maya Chen"],
      hashtags: ["#LuminaSpring", "#BarrierRepair", "#LuminaSerum"],
      status: "Tracking live posts",
      lastSync: "May 08, 14:10",
      posts: [
        { platform: "TikTok", url: "creator linked post", views: "6.2M", er: "5.1%", status: "Live" },
        { platform: "Instagram", url: "creator linked reel", views: "3.8M", er: "4.4%", status: "Live" },
        { platform: "YouTube Shorts", url: "creator linked short", views: "1.8M", er: "3.9%", status: "Live" }
      ]
    }
  },
  {
    id: "atlas-midpoint",
    campaign: "Atlas Run Club",
    headline: "Community comments show strong retail interest.",
    metrics: {
      views: "4.6M",
      reach: "3.1M",
      er: "5.2%",
      likes: "128K",
      comments: "9.6K",
      saves: "63K",
      shares: "14.8K",
      approvals: "9 / 16"
    },
    summary:
      "Creator-led training content is converting attention into store visit questions and product comparisons.",
    nextAction: "Recommend a second drop around race-day preparation.",
    audienceGender: [
      { label: "Women", value: 41 },
      { label: "Men", value: 52 },
      { label: "Non-binary / undisclosed", value: 7 }
    ],
    audienceAge: [
      { label: "18-24", value: 18 },
      { label: "25-34", value: 39 },
      { label: "35-44", value: 28 },
      { label: "45+", value: 15 }
    ],
    liveTracking: {
      linkedAccounts: ["TikTok: @theogrant", "Instagram: @theoruns"],
      hashtags: ["#AtlasRunClub", "#RacePrep", "#AtlasPerformance"],
      status: "Tracking live posts",
      lastSync: "May 08, 13:45",
      posts: [
        { platform: "TikTok", url: "creator linked post", views: "2.7M", er: "5.4%", status: "Live" },
        { platform: "Instagram", url: "creator linked reel", views: "1.9M", er: "4.8%", status: "Live" }
      ]
    }
  }
];

export const aiTimelines = [
  {
    label: "Creator accepted",
    date: "May 06",
    detail: "Deal accepted after manager approval."
  },
  {
    label: "NDA signed",
    date: "May 06",
    detail: "Creator and brand NDA complete."
  },
  {
    label: "Payment scheduled",
    date: "May 07",
    detail: "First installment pending brand finance confirmation."
  },
  {
    label: "Final report due",
    date: "May 14",
    detail: "AI report draft ready after final metric sync."
  }
];

export const smartNotifications: Array<{
  id: string;
  title: string;
  body: string;
  priority: NotificationPriority;
  channel: string;
}> = [
  {
    id: "payment-followup",
    title: "Payment follow-up",
    body: "First installment is scheduled but not marked paid. Send a polite reminder tomorrow.",
    priority: "high",
    channel: "Payments"
  },
  {
    id: "approval-deadline",
    title: "Approval deadline",
    body: "Sofia Lane contract redlines are due in 24 hours.",
    priority: "medium",
    channel: "Approvals"
  },
  {
    id: "report-ready",
    title: "Report draft",
    body: "Lumina closeout report can be generated from current performance metrics.",
    priority: "low",
    channel: "Reports"
  }
];

export const relationshipSignals = [
  {
    entity: "Northstar Social",
    signal: "High trust agency relationship",
    note: "Fast approvals, no disputes, and repeat campaign potential."
  },
  {
    entity: "Lumina Beauty",
    signal: "Renewal likely",
    note: "Brand approvals are quick and performance is above benchmark."
  },
  {
    entity: "Riley Park",
    signal: "Strong manager alignment",
    note: "Consistent terms, clear communication, and low timeline risk."
  }
];
