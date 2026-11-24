import { Building2, LayoutDashboard, PlusSquare, Users, Wrench, ClipboardList } from 'lucide-react'
import DashboardLayout from '../../components/shared/DashboardLayout'

const links = [
  { to: '/landlord', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/landlord/properties', label: 'My properties', icon: Building2 },
  { to: '/landlord/properties/new', label: 'Add property', icon: PlusSquare },
  { to: '/landlord/tenants', label: 'Tenants', icon: Users },
  { to: '/landlord/applications', label: 'Applications', icon: ClipboardList },
  { to: '/landlord/maintenance', label: 'Maintenance', icon: Wrench },
]

function LandlordLayout() {
  return <DashboardLayout title="Landlord" links={links} />
}

export default LandlordLayout
