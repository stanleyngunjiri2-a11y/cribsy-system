import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2, Users, Banknote, Wrench, ArrowRight } from 'lucide-react'
import PageHeading from '../../components/shared/PageHeading'
import StatusBadge from '../../components/shared/StatusBadge'
import { landlordAPI } from '../../services/api'

const money = value => `KES ${Number(value || 0).toLocaleString('en-KE')}`

export default function LandlordDashboardPage() {
  const [dashboard, setDashboard] = useState(null)
  const [properties, setProperties] = useState([])
  const [maintenance, setMaintenance] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      landlordAPI.dashboard(),
      landlordAPI.properties(),
      landlordAPI.maintenance(),
    ])
      .then(([stats, propertyData, maintenanceData]) => {
        setDashboard(stats)
        setProperties(Array.isArray(propertyData) ? propertyData : [])
        setMaintenance(Array.isArray(maintenanceData) ? maintenanceData : [])
      })
      .catch(err => setError(err.message || 'Unable to load your dashboard.'))
      .finally(() => setLoading(false))
  }, [])

  const stats = [
    { label: 'Properties', value: dashboard?.total_properties ?? 0, icon: Building2 },
    { label: 'Occupied properties', value: dashboard?.occupied_properties ?? 0, icon: Users },
    { label: 'Registered tenants', value: dashboard?.registered_tenants ?? 0, icon: Banknote },
    { label: 'Pending maintenance', value: dashboard?.pending_maintenance ?? 0, icon: Wrench },
  ]

  if (loading) return <div className="surface-card p-8 text-center text-muted">Loading your dashboard...</div>
  if (error) return <div role="alert" className="surface-card p-6 text-red-700">{error}</div>

  return (
    <>
      <PageHeading title="Landlord dashboard" description="An overview of your properties, tenants and rental activity." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div className="surface-card p-5" key={label}>
            <div className="flex h-10 w-10 items-center justify-center bg-brand-50 text-brand-800"><Icon size={20} /></div>
            <p className="mt-4 text-sm text-muted">{label}</p>
            <p className="mt-1 text-xl font-bold text-ink">{value}</p>
          </div>
        ))}
      </div>

      <section className="surface-card mt-7 overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-semibold text-ink">Your properties</h2>
          <Link to="/landlord/properties" className="text-sm font-semibold text-brand-800">View all</Link>
        </div>
        {properties.length ? properties.slice(0, 5).map(property => (
          <div key={property.id} className="flex flex-col justify-between gap-3 border-b border-border px-5 py-4 last:border-0 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-semibold text-ink">{property.name}</h3>
              <p className="mt-1 text-sm text-muted">{property.location}</p>
              <p className="mt-1 text-sm text-muted">{money(property.monthly_rent)} per month</p>
            </div>
            <StatusBadge tone={property.approval_status === 'approved' ? 'green' : 'amber'}>
              {property.approval_status || 'Pending review'}
            </StatusBadge>
          </div>
        )) : <p className="p-6 text-sm text-muted">You have not added any properties yet.</p>}
      </section>

      <section className="surface-card mt-7 p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-ink">Recent maintenance requests</h2>
          <Link to="/landlord/maintenance" className="text-sm font-semibold text-brand-800">View requests</Link>
        </div>
        {maintenance.length ? maintenance.slice(0, 5).map(request => (
          <div key={request.id} className="mt-4 flex flex-col justify-between gap-2 border-t border-border pt-4 sm:flex-row">
            <div>
              <p className="font-medium text-ink">{request.category || 'Maintenance request'}</p>
              <p className="mt-1 text-sm text-muted">{request.description}</p>
            </div>
            <StatusBadge tone={request.status === 'pending' ? 'amber' : 'green'}>{request.status}</StatusBadge>
          </div>
        )) : <p className="mt-4 text-sm text-muted">There are no maintenance requests.</p>}
      </section>

      <Link to="/landlord/properties/new" className="btn btn-primary mt-6">
        Add a property <ArrowRight size={16} />
      </Link>
    </>
  )
}
