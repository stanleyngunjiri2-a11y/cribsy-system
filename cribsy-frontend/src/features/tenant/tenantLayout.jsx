import { Banknote, LayoutDashboard, User, Wrench } from 'lucide-react'
import DashboardLayout from '../../components/shared/DashboardLayout'

const links = [
  { to: '/tenant', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/tenant/rent-history', label: 'Rent history', icon: Banknote },
  { to: '/tenant/maintenance', label: 'Maintenance', icon: Wrench },
  { to: '/tenant/profile', label: 'Profile', icon: User },
]

function TenantLayout() {
  return <DashboardLayout title="Tenant" links={links} />
}

export default TenantLayout
