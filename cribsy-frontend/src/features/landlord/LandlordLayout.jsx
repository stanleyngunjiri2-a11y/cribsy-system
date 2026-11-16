// OWNER: Member 4 - Nato. Sidebar layout for the landlord area.
import { Building2, LayoutDashboard, Users, Wrench } from "lucide-react";
import DashboardLayout from "../../components/shared/DashboardLayout";

const links = [
  { to: "/landlord", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/landlord/properties", label: "My properties", icon: Building2 },
  { to: "/landlord/tenants", label: "Tenants", icon: Users },
  { to: "/landlord/maintenance", label: "Maintenance", icon: Wrench },
];

function LandlordLayout() {
  return <DashboardLayout title="Landlord" links={links} />;
}

export default LandlordLayout;
