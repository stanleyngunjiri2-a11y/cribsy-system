import { useEffect, useState } from 'react'
import { Users, Building2, UserCheck, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeading from '../../components/shared/PageHeading'
import StateMessage from '../../components/shared/StateMessage'
import StatusBadge from '../../components/shared/StatusBadge'
import { adminAPI } from '../../services/api'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null)
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updating, setUpdating] = useState(null)

  useEffect(() => {
    Promise.all([adminAPI.stats(), adminAPI.properties()])
      .then(([statsData, propertyData]) => {
        setStats(statsData)
        setProperties(Array.isArray(propertyData) ? propertyData : [])
      })
      .catch(err => setError(err.message || 'Unable to load dashboard.'))
      .finally(() => setLoading(false))
  }, [])

  async function reviewProperty(property, approval_status) {
    setUpdating(property.id)
    setError('')

    try {
      const updated = await adminAPI.updatePropertyApproval(property.id, approval_status)
      setProperties(current => current.map(item => (
        item.id === property.id
          ? updated || { ...item, approval_status }
          : item
      )))

      if (property.approval_status === 'pending' && approval_status !== 'pending') {
        setStats(current => current && ({
          ...current,
          properties_pending_approval: Math.max(0, (current.properties_pending_approval || 0) - 1),
        }))
      }
    } catch (err) {
      setError(err.message || 'Unable to update property approval.')
    } finally {
      setUpdating(null)
    }
  }

  if (loading) return <p className="py-8 text-sm text-muted">Loading dashboard...</p>
  if (error) return <StateMessage title="Unable to load dashboard" message={error} />

  const pendingProperties = properties.filter(property => property.approval_status === 'pending')
  const cards = [
    { label: 'Registered users', value: stats?.total_users ?? 0, icon: Users },
    { label: 'Landlords', value: stats?.landlords ?? 0, icon: Building2 },
    { label: 'Tenants', value: stats?.tenants ?? 0, icon: UserCheck },
    { label: 'Listed properties', value: properties.length, icon: Building2 },
    { label: 'Pending reviews', value: stats?.properties_pending_approval ?? 0, icon: Clock },
  ]

  return (
    <>
      <PageHeading title="Administrator dashboard" description="Review property listings and manage tenants, landlords and platform activity." />

      {error && <p role="alert" className="mb-4 text-sm text-red-700">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="surface-card p-5">
            <div className="flex h-10 w-10 items-center justify-center bg-brand-50 text-brand-800">
              <Icon size={20} />
            </div>
            <p className="mt-4 text-sm text-muted">{label}</p>
            <p className="mt-1 text-2xl font-bold text-ink">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-7 grid gap-6 xl:grid-cols-[2fr_1fr]">
        <section className="surface-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-border p-5">
            <div>
              <h2 className="font-semibold text-ink">Pending property reviews</h2>
              <p className="mt-1 text-sm text-muted">Approve or reject listings submitted by landlords.</p>
            </div>
            <Link to="/admin/properties" className="text-sm font-semibold text-brand-800">
              All properties
            </Link>
          </div>

          {pendingProperties.length === 0 ? (
            <p className="p-6 text-sm text-muted">There are no pending property reviews.</p>
          ) : pendingProperties.slice(0, 5).map(property => (
            <div key={property.id} className="flex flex-col justify-between gap-3 border-b border-border px-5 py-4 last:border-0 sm:flex-row sm:items-center">
              <div>
                <p className="font-semibold text-ink">{property.name}</p>
                <p className="mt-1 text-sm text-muted">
                  {property.landlord_name || property.landlord?.full_name || property.owner_name || 'Landlord'} · {property.location}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <StatusBadge tone="amber">{property.approval_status}</StatusBadge>
                <button
                  type="button"
                  disabled={updating === property.id}
                  onClick={() => reviewProperty(property, 'approved')}
                  className="text-sm font-medium text-green-700 underline disabled:opacity-50"
                >
                  Approve
                </button>
                <button
                  type="button"
                  disabled={updating === property.id}
                  onClick={() => reviewProperty(property, 'rejected')}
                  className="text-sm font-medium text-red-700 underline disabled:opacity-50"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </section>

        <section className="surface-card overflow-hidden">
          <div className="border-b border-border p-5">
            <h2 className="font-semibold text-ink">System management</h2>
            <p className="mt-1 text-sm text-muted">Open a complete list to manage accounts and listings.</p>
          </div>
          <div className="flex flex-col">
            <Link to="/admin/users" className="border-b border-border px-5 py-4 text-sm font-semibold text-brand-800 hover:bg-slate-50">
              Manage tenants and landlords
            </Link>
            <Link to="/admin/properties" className="px-5 py-4 text-sm font-semibold text-brand-800 hover:bg-slate-50">
              Manage all properties
            </Link>
          </div>
        </section>
      </div>

      <section className="surface-card mt-7 overflow-hidden">
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h2 className="font-semibold text-ink">Recent property submissions</h2>
            <p className="mt-1 text-sm text-muted">The latest listings submitted to the platform.</p>
          </div>
          <Link to="/admin/properties" className="text-sm font-semibold text-brand-800">
            View all properties
          </Link>
        </div>

        {properties.length === 0 ? (
          <p className="p-6 text-sm text-muted">No property submissions found.</p>
        ) : properties.slice(0, 5).map(property => (
          <div key={property.id} className="flex flex-col justify-between gap-2 border-b border-border px-5 py-4 last:border-0 sm:flex-row">
            <div>
              <p className="font-semibold text-ink">{property.name}</p>
              <p className="mt-1 text-sm text-muted">
                {property.landlord_name || property.landlord?.full_name || property.owner_name || 'Landlord'} · {property.location}
              </p>
            </div>
            <StatusBadge tone={
              property.approval_status === 'approved' ? 'green' :
              property.approval_status === 'rejected' ? 'red' : 'amber'
            }>
              {property.approval_status}
            </StatusBadge>
          </div>
        ))}
      </section>
    </>
  )
}
