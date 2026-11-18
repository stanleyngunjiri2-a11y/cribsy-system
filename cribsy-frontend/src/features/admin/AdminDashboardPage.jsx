import { useEffect, useState } from 'react'
import { Users, Building2, UserCheck, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeading from '../../components/shared/PageHeading'
import StateMessage from '../../components/shared/StateMessage'
import { adminAPI } from '../../services/api'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null)
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([adminAPI.stats(), adminAPI.properties()])
      .then(([statsData, propertyData]) => {
        setStats(statsData)
        setProperties(Array.isArray(propertyData) ? propertyData : [])
      })
      .catch(err => setError(err.message || 'Unable to load dashboard.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="py-8 text-sm text-muted">Loading dashboard...</p>
  if (error) return <StateMessage title="Unable to load dashboard" message={error} />

  const cards = [
    { label: 'Registered users', value: stats?.total_users ?? 0, icon: Users },
    { label: 'Landlords', value: stats?.landlords ?? 0, icon: Building2 },
    { label: 'Tenants', value: stats?.tenants ?? 0, icon: UserCheck },
    { label: 'Pending reviews', value: stats?.properties_pending_approval ?? 0, icon: Clock },
  ]

  return (
    <>
      <PageHeading title="Administrator dashboard" description="Monitor platform activity and property submissions." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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

      <section className="surface-card mt-7 overflow-hidden">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="font-semibold text-ink">Recent property submissions</h2>
          <Link to="/admin/properties" className="text-sm font-semibold text-brand-800">
            Manage properties
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
            <span className="text-sm font-semibold capitalize">{property.approval_status}</span>
          </div>
        ))}
      </section>
    </>
  )
}
