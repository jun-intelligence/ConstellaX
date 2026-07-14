export type CoreUserType = "creator" | "manager" | "brand" | "agency" | "audience";

export type ContractStatus = "drafting" | "sent" | "signed" | "blocked";
export type NdaStatus = "not_required" | "pending" | "signed";
export type ApprovalState = "waiting" | "approved" | "changes_requested";
export type CampaignStatus = "planning" | "active" | "approvals" | "reporting";
export type PaymentState = "not_started" | "scheduled" | "partial" | "paid";

export type DealParty = {
  name: string;
  company?: string;
  email: string;
};

export type AgencyDeal = {
  id: string;
  title: string;
  brand: DealParty;
  agency: DealParty;
  manager: DealParty;
  creator: DealParty;
  campaignBudget: number;
  creatorFee: number;
  agencyFee: number;
  platformFee: number;
  paymentStatus: PaymentState;
  contractStatus: ContractStatus;
  ndaStatus: NdaStatus;
  approvalTimestamps: {
    brandApprovedAt: string | null;
    agencyApprovedAt: string | null;
    managerApprovedAt: string | null;
    creatorAcceptedAt: string | null;
    contentApprovedAt: string | null;
  };
};

export type Campaign = {
  id: string;
  name: string;
  brand: string;
  agency: string;
  status: CampaignStatus;
  objective: string;
  budget: number;
  spent: number;
  creatorFees: number;
  agencyServiceFee: number;
  platformFee: number;
  timeline: string;
  reporting: {
    reach: string;
    engagementRate: string;
    deliverablesApproved: number;
    deliverablesTotal: number;
  };
  deals: AgencyDeal[];
  creatorShortlist: Array<{
    name: string;
    category: string;
    manager: string;
    fitScore: number;
    quotedFee: number;
    status: "shortlisted" | "contacted" | "negotiating" | "selected";
  }>;
  managerCommunications: Array<{
    manager: string;
    topic: string;
    lastTouch: string;
    nextStep: string;
  }>;
  approvalQueue: Array<{
    item: string;
    owner: string;
    state: ApprovalState;
    due: string;
  }>;
};

export const agencies = [
  {
    id: "northstar-social",
    name: "Northstar Social",
    location: "Los Angeles",
    specialty: "Beauty, fashion, and launch campaigns",
    activeCampaigns: 8,
    managedBudget: 1840000,
    serviceFeeRate: "12 percent",
    positioning: "Agency workflow support today, direct collaboration rails tomorrow."
  },
  {
    id: "kinetic-studio",
    name: "Kinetic Studio",
    location: "New York",
    specialty: "Lifestyle creators and performance reporting",
    activeCampaigns: 5,
    managedBudget: 970000,
    serviceFeeRate: "10 percent",
    positioning: "Built for campaign approvals, contracts, invoices, and creator payout visibility."
  },
  {
    id: "halo-partners",
    name: "Halo Partners",
    location: "London",
    specialty: "Global brand activations",
    activeCampaigns: 11,
    managedBudget: 2460000,
    serviceFeeRate: "15 percent",
    positioning: "Keeps agencies in the loop while giving brands and creators shared operating truth."
  }
];

export const campaigns: Campaign[] = [
  {
    id: "lumina-spring-launch",
    name: "Lumina Spring Launch",
    brand: "Lumina Beauty",
    agency: "Northstar Social",
    status: "active",
    objective: "Launch a serum line through credible beauty creators with usage rights for paid social.",
    budget: 260000,
    spent: 148500,
    creatorFees: 118000,
    agencyServiceFee: 31200,
    platformFee: 7800,
    timeline: "Apr 22 - Jun 14",
    reporting: {
      reach: "8.4M",
      engagementRate: "4.8%",
      deliverablesApproved: 18,
      deliverablesTotal: 27
    },
    creatorShortlist: [
      {
        name: "Maya Chen",
        category: "Beauty education",
        manager: "Riley Park",
        fitScore: 94,
        quotedFee: 18000,
        status: "selected"
      },
      {
        name: "Sofia Lane",
        category: "Clean skincare",
        manager: "Avery Stone",
        fitScore: 89,
        quotedFee: 14500,
        status: "negotiating"
      },
      {
        name: "Noor Patel",
        category: "Derm-led routines",
        manager: "Jordan Wells",
        fitScore: 86,
        quotedFee: 16000,
        status: "contacted"
      }
    ],
    managerCommunications: [
      {
        manager: "Riley Park",
        topic: "Whitelisting terms",
        lastTouch: "May 06",
        nextStep: "Confirm 60-day usage window"
      },
      {
        manager: "Avery Stone",
        topic: "Creator fee negotiation",
        lastTouch: "May 05",
        nextStep: "Approve revised fee"
      }
    ],
    approvalQueue: [
      {
        item: "Maya Chen concept board",
        owner: "Brand",
        state: "approved",
        due: "May 08"
      },
      {
        item: "Sofia Lane contract redlines",
        owner: "Agency",
        state: "waiting",
        due: "May 09"
      },
      {
        item: "Final reporting brief",
        owner: "Manager",
        state: "changes_requested",
        due: "May 10"
      }
    ],
    deals: [
      {
        id: "deal-maya-chen",
        title: "Maya Chen serum launch package",
        brand: {
          name: "Elena Brooks",
          company: "Lumina Beauty",
          email: "elena@luminabeauty.example"
        },
        agency: {
          name: "Northstar Social",
          email: "ops@northstarsocial.example"
        },
        manager: {
          name: "Riley Park",
          company: "Park Talent",
          email: "riley@parktalent.example"
        },
        creator: {
          name: "Maya Chen",
          email: "maya@creator.example"
        },
        campaignBudget: 260000,
        creatorFee: 18000,
        agencyFee: 31200,
        platformFee: 7800,
        paymentStatus: "scheduled",
        contractStatus: "signed",
        ndaStatus: "signed",
        approvalTimestamps: {
          brandApprovedAt: "2026-05-06T09:15:00Z",
          agencyApprovedAt: "2026-05-06T10:20:00Z",
          managerApprovedAt: "2026-05-06T12:45:00Z",
          creatorAcceptedAt: "2026-05-06T13:10:00Z",
          contentApprovedAt: null
        }
      },
      {
        id: "deal-sofia-lane",
        title: "Sofia Lane clean routine integration",
        brand: {
          name: "Elena Brooks",
          company: "Lumina Beauty",
          email: "elena@luminabeauty.example"
        },
        agency: {
          name: "Northstar Social",
          email: "ops@northstarsocial.example"
        },
        manager: {
          name: "Avery Stone",
          company: "Stone Management",
          email: "avery@stonemgmt.example"
        },
        creator: {
          name: "Sofia Lane",
          email: "sofia@creator.example"
        },
        campaignBudget: 260000,
        creatorFee: 14500,
        agencyFee: 31200,
        platformFee: 7800,
        paymentStatus: "not_started",
        contractStatus: "sent",
        ndaStatus: "pending",
        approvalTimestamps: {
          brandApprovedAt: "2026-05-05T08:00:00Z",
          agencyApprovedAt: "2026-05-05T09:25:00Z",
          managerApprovedAt: null,
          creatorAcceptedAt: null,
          contentApprovedAt: null
        }
      }
    ]
  },
  {
    id: "atlas-run-club",
    name: "Atlas Run Club",
    brand: "Atlas Performance",
    agency: "Kinetic Studio",
    status: "approvals",
    objective: "Convert creator-led training stories into creator whitelisting and retail traffic.",
    budget: 180000,
    spent: 96000,
    creatorFees: 74000,
    agencyServiceFee: 18000,
    platformFee: 5400,
    timeline: "May 01 - Jul 02",
    reporting: {
      reach: "3.1M",
      engagementRate: "5.2%",
      deliverablesApproved: 9,
      deliverablesTotal: 16
    },
    creatorShortlist: [
      {
        name: "Theo Grant",
        category: "Running performance",
        manager: "Morgan Lee",
        fitScore: 92,
        quotedFee: 22000,
        status: "selected"
      },
      {
        name: "Iris Wong",
        category: "Everyday training",
        manager: "Direct",
        fitScore: 84,
        quotedFee: 9000,
        status: "shortlisted"
      }
    ],
    managerCommunications: [
      {
        manager: "Morgan Lee",
        topic: "Retail visit schedule",
        lastTouch: "May 06",
        nextStep: "Lock store locations"
      }
    ],
    approvalQueue: [
      {
        item: "Theo Grant first cut",
        owner: "Brand",
        state: "waiting",
        due: "May 11"
      },
      {
        item: "Paid usage rider",
        owner: "Agency",
        state: "approved",
        due: "May 07"
      }
    ],
    deals: [
      {
        id: "deal-theo-grant",
        title: "Theo Grant race prep series",
        brand: {
          name: "Marcus Hill",
          company: "Atlas Performance",
          email: "marcus@atlas.example"
        },
        agency: {
          name: "Kinetic Studio",
          email: "campaigns@kinetic.example"
        },
        manager: {
          name: "Morgan Lee",
          company: "Lee Creative",
          email: "morgan@leecreative.example"
        },
        creator: {
          name: "Theo Grant",
          email: "theo@creator.example"
        },
        campaignBudget: 180000,
        creatorFee: 22000,
        agencyFee: 18000,
        platformFee: 5400,
        paymentStatus: "partial",
        contractStatus: "signed",
        ndaStatus: "not_required",
        approvalTimestamps: {
          brandApprovedAt: "2026-05-04T14:00:00Z",
          agencyApprovedAt: "2026-05-04T14:30:00Z",
          managerApprovedAt: "2026-05-04T16:00:00Z",
          creatorAcceptedAt: "2026-05-04T16:30:00Z",
          contentApprovedAt: null
        }
      }
    ]
  }
];

export function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

export function getCampaign(id: string) {
  return campaigns.find((campaign) => campaign.id === id);
}
