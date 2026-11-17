// OWNER: Member 6 - Lynn. Sidebar layout for the administrator area.
import { Building2, LayoutDashboard, Users } from 'lucide-react'
import DashboardLayout from '../../components/shared/DashboardLayout'

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/properties', label: 'Properties', icon: Building2 },
]

function AdminLayout() {
  return <DashboardLayout title="Admin" links={links} />
}

export default AdminLayout
