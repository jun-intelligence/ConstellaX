import { RoleDashboard } from "@/components/product/RoleDashboard";
import { RoleAccessGuard } from "@/components/ui/RoleAccessGuard";

export default function CreatorDashboardPage() {
  return (
    <RoleAccessGuard allowedRole="creator">
      <RoleDashboard role="creator" />
    </RoleAccessGuard>
  );
}
