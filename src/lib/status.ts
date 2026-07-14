import type { DealStatus, DeliverableStatus, PaymentStatus } from "./types";

export const dealStatusLabels: Record<DealStatus, string> = {
  pending_creator: "Pending creator",
  active: "Active",
  rejected: "Rejected",
  in_review: "In review",
  completed: "Completed",
  cancelled: "Cancelled"
};

export const deliverableStatusLabels: Record<DeliverableStatus, string> = {
  not_started: "Not started",
  in_progress: "In progress",
  submitted: "Submitted",
  changes_requested: "Changes requested",
  approved: "Approved"
};

export const paymentStatusLabels: Record<PaymentStatus, string> = {
  not_started: "Not started",
  scheduled: "Scheduled",
  partial: "Partial",
  paid: "Paid",
  overdue: "Overdue",
  failed: "Failed"
};
