// OWNER: Member 6 - Lynn. Admin overview. Frontend only: real permissions are enforced by the backend.
import PageHeading from '../../components/shared/PageHeading'
import SampleDataNotice from '../../components/shared/SampleDataNotice'
import { adminProperties, adminUsers } from './adminData'

function AdminDashboardPage() {
  const stats = [
    { label: 'Total users', value: adminUsers.length },
    { label: 'Landlords', value: adminUsers.filter((u) => u.role === 'Landlord').length },
    { label: 'Tenants', value: adminUsers.filter((u) => u.role === 'Tenant').length },
    { label: 'Properties awaiting approval', value: adminProperties.filter((p) => p.approval === 'Pending').length },
  ]

  return (
    <>
      <PageHeading title="Admin dashboard" description="An overview of users and listings." />
      <SampleDataNotice />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-600">{s.label}</p>
            <p className="mt-1 text-2xl font-bold text-emerald-800">{s.value}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default AdminDashboardPage
