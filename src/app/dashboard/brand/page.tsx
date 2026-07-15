import { RoleDashboard } from "@/components/product/RoleDashboard";
import { RoleAccessGuard } from "@/components/ui/RoleAccessGuard";

export default function BrandDashboardPage() {
  return (
    <RoleAccessGuard allowedRole="brand">
      <RoleDashboard role="brand" />
    </RoleAccessGuard>
  );
}
