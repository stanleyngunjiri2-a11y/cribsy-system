import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import PageHeading from '../../components/shared/PageHeading'
import StatusBadge from '../../components/shared/StatusBadge'
import { adminAPI } from '../../services/api'

export default function AdminUsersPage() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updating, setUpdating] = useState(null)

  useEffect(() => {
    let active = true

    adminAPI.users()
      .then(result => {
        if (!active) return
        setUsers(Array.isArray(result) ? result : [])
        setError('')
      })
      .catch(err => {
        if (active) setError(err.message || 'Unable to load users.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  async function changeStatus(user) {
    const next = user.status === 'active' ? 'suspended' : 'active'
    if (!window.confirm(`Are you sure you want to ${next} this account?`)) return

    setUpdating(user.id)
    try {
      const updated = await adminAPI.updateUserStatus(user.id, next)
      setUsers(current => current.map(item => item.id === user.id ? updated : item))
    } catch (err) {
      setError(err.message || 'Unable to update user.')
    } finally {
      setUpdating(null)
    }
  }

  const filtered = users.filter(user =>
    `${user.full_name || user.name || ''} ${user.email || ''} ${user.role || ''}`
      .toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <PageHeading title="User management" description="View and manage registered tenants and landlords." />

      <div className="surface-card mb-6 flex items-center gap-3 p-4">
        <Search size={18} className="text-muted" />
        <input
          className="w-full bg-transparent text-sm outline-none"
          placeholder="Search by name, email or role..."
          value={search}
          onChange={event => setSearch(event.target.value)}
        />
      </div>

      {error && <p role="alert" className="mb-4 text-sm text-red-700">{error}</p>}

      {loading ? (
        <p className="py-8 text-sm text-muted">Loading users...</p>
      ) : (
        <div className="surface-card overflow-x-auto">
          <table className="w-full min-w-[750px] text-left text-sm">
            <thead className="bg-slate-50 text-muted">
              <tr>
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(user => (
                <tr key={user.id} className="border-t border-border">
                  <td className="px-5 py-4 font-semibold text-ink">{user.full_name || user.name || 'Unnamed user'}</td>
                  <td className="px-5 py-4">{user.email}</td>
                  <td className="px-5 py-4 capitalize">{user.role}</td>
                  <td className="px-5 py-4">
                    <StatusBadge tone={user.status === 'active' ? 'green' : 'amber'}>{user.status}</StatusBadge>
                  </td>
                  <td className="px-5 py-4">
                    {user.role === 'admin' ? (
                      <span className="text-xs text-muted">Protected account</span>
                    ) : (
                      <button
                        disabled={updating === user.id}
                        onClick={() => changeStatus(user)}
                        className="text-sm font-medium text-brand-800 underline disabled:opacity-50"
                      >
                        {updating === user.id ? 'Updating...' : user.status === 'active' ? 'Suspend' : 'Reactivate'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!filtered.length && (
            <p className="p-8 text-center text-sm text-muted">
              {search ? 'No users match your search.' : 'No registered users found.'}
            </p>
          )}
        </div>
      )}
    </>
  )
}
