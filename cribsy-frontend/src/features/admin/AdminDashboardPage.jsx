import { Users, Building2, UserCheck, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeading from '../../components/shared/PageHeading'
import SampleDataNotice from '../../components/shared/SampleDataNotice'
import { adminUsers, adminProperties } from './adminData'

function AdminDashboardPage() {
  const stats = [
    { label: 'Registered users', value: adminUsers.length, icon: Users },
    { label: 'Listed properties', value: adminProperties.length, icon: Building2 },
    { label: 'Active users', value: adminUsers.filter((user) => user.status === 'Active').length, icon: UserCheck },
    { label: 'Pending reviews', value: adminProperties.filter((property) => property.status === 'Pending').length, icon: Clock },
  ]

  return (
    <>
      <PageHeading title="Administrator dashboard" description="Monitor users, property listings and platform activity." />
      <SampleDataNotice />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="surface-card p-5">
            <div className="flex h-10 w-10 items-center justify-center bg-brand-50 text-brand-800"><Icon size={20} /></div>
            <p className="mt-4 text-sm text-muted">{label}</p>
            <p className="mt-1 text-2xl font-bold text-ink">{value}</p>
          </div>
        ))}
      </div>

      <section className="surface-card mt-7 overflow-hidden">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="font-semibold text-ink">Recent property submissions</h2>
          <Link to="/admin/properties" className="text-sm font-semibold text-brand-800">Manage properties</Link>
        </div>
        {adminProperties.map((property) => (
          <div key={property.id} className="flex flex-col justify-between gap-2 border-b border-border px-5 py-4 last:border-0 sm:flex-row">
            <div>
              <p className="font-semibold text-ink">{property.name}</p>
              <p className="mt-1 text-sm text-muted">{property.owner} · {property.location}</p>
            </div>
            <span className={`text-sm font-semibold ${property.status === 'Approved' ? 'text-green-700' : 'text-amber-700'}`}>{property.status}</span>
          </div>
        ))}
      </section>
    </>
  )
}

export default AdminDashboardPage
