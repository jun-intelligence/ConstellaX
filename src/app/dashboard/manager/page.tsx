import { RoleDashboard } from "@/components/product/RoleDashboard";
import { RoleAccessGuard } from "@/components/ui/RoleAccessGuard";

export default function ManagerDashboardPage() {
  return (
    <RoleAccessGuard allowedRole="manager">
      <RoleDashboard role="manager" />
    </RoleAccessGuard>
  );
}
