import { LayoutDashboard, Users, Building2 } from 'lucide-react'
import DashboardLayout from '../../components/shared/DashboardLayout'

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/properties', label: 'Properties', icon: Building2 },
]

function AdminLayout() {
  return <DashboardLayout title="Administrator" links={links} />
}

export default AdminLayout
