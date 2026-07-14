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
  approved: "Approved"
};

export const paymentStatusLabels: Record<PaymentStatus, string> = {
  not_started: "Not started",
  pending: "Pending",
  paid: "Paid",
  failed: "Failed"
};
