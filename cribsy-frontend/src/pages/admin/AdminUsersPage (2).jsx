// OWNER: Member 6 - Lynn. User list with an account status control (frontend only).
import { useState } from 'react'
import PageHeading from '../../components/shared/PageHeading'
import SampleDataNotice from '../../components/shared/SampleDataNotice'
import StatusBadge from '../../components/shared/StatusBadge'
import Button from '../../components/shared/Button'
import { adminTone, adminUsers } from './adminData'

function AdminUsersPage() {
  const [users, setUsers] = useState(adminUsers)

  function toggle(id) {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u)),
    )
  }

  return (
    <>
      <PageHeading title="Users" description="Manage user accounts." />
      <SampleDataNotice />
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2"><span className="sr-only">Action</span></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-slate-100">
                <td className="px-4 py-2 font-medium">{u.name}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">{u.role}</td>
                <td className="px-4 py-2"><StatusBadge tone={adminTone(u.status)}>{u.status}</StatusBadge></td>
                <td className="px-4 py-2">
                  <Button variant="outline" onClick={() => toggle(u.id)}>
                    {u.status === 'Active' ? 'Suspend' : 'Reactivate'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-slate-500">Changes are kept on this page only until the backend is connected.</p>
    </>
  )
}

export default AdminUsersPage
