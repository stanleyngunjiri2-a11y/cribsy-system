import { useState } from 'react'
import { Search } from 'lucide-react'
import PageHeading from '../../components/shared/PageHeading'
import SampleDataNotice from '../../components/shared/SampleDataNotice'
import StatusBadge from '../../components/shared/StatusBadge'
import { adminUsers } from './adminData'

function AdminUsersPage() {
  const [search, setSearch] = useState('')
  const users = adminUsers.filter((user) =>
    `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <PageHeading title="User management" description="Review registered tenants and landlords." />
      <SampleDataNotice />
      <div className="surface-card mb-6 flex items-center gap-3 p-4">
        <Search size={18} className="text-muted" />
        <input className="w-full bg-transparent text-sm outline-none" placeholder="Search by name, email or role..." value={search} onChange={(event) => setSearch(event.target.value)} />
      </div>
      <div className="surface-card overflow-x-auto">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="bg-slate-50 text-muted">
            <tr><th className="px-5 py-4">User</th><th className="px-5 py-4">Email</th><th className="px-5 py-4">Role</th><th className="px-5 py-4">Status</th></tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-border">
                <td className="px-5 py-4 font-semibold text-ink">{user.name}</td>
                <td className="px-5 py-4">{user.email}</td>
                <td className="px-5 py-4">{user.role}</td>
                <td className="px-5 py-4"><StatusBadge tone={user.status === 'Active' ? 'green' : 'amber'}>{user.status}</StatusBadge></td>
              </tr>
            ))}
          </tbody>
        </table>
        {!users.length && <p className="p-8 text-center text-sm text-muted">No users match your search.</p>}
      </div>
    </>
  )
}

export default AdminUsersPage
