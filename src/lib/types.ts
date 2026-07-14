export type UserRole = "creator" | "manager" | "brand" | "agency";

export type DealStatus =
  | "pending_creator"
  | "active"
  | "rejected"
  | "in_review"
  | "completed"
  | "cancelled";

export type DeliverableStatus =
  | "not_started"
  | "in_progress"
  | "submitted"
  | "changes_requested"
  | "approved";

export type PaymentStatus = "not_started" | "scheduled" | "partial" | "paid" | "overdue" | "failed";

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  company_name: string | null;
  created_at: string;
};

export type Deal = {
  id: string;
  title: string;
  brief: string;
  brand_id: string;
  creator_id: string;
  manager_id: string | null;
  status: DealStatus;
  budget_amount: number;
  currency: string;
  due_date: string | null;
  created_at: string;
  updated_at: string;
  brand?: Pick<Profile, "id" | "full_name" | "company_name" | "email">;
  creator?: Pick<Profile, "id" | "full_name" | "company_name" | "email">;
  deliverables?: Deliverable[];
  payments?: Payment[];
};

export type Deliverable = {
  id: string;
  deal_id: string;
  title: string;
  description: string | null;
  status: DeliverableStatus;
  due_date: string | null;
  created_at: string;
};

export type Payment = {
  id: string;
  deal_id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paid_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};
