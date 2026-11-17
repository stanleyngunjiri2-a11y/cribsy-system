import { Link } from 'react-router-dom'
import { Building2, Users, Banknote, Wrench, ArrowRight } from 'lucide-react'
import PageHeading from '../../components/shared/PageHeading'
import SampleDataNotice from '../../components/shared/SampleDataNotice'
import StatusBadge from '../../components/shared/StatusBadge'
import { landlordProperties, landlordRequests, landlordKES } from './landlordData'

function LandlordDashboardPage() {
  const totalUnits = landlordProperties.reduce((sum, item) => sum + item.units, 0)
  const occupied = landlordProperties.reduce((sum, item) => sum + item.occupied, 0)
  const monthlyIncome = landlordProperties.reduce((sum, item) => sum + item.occupied * item.rent, 0)

  const stats = [
    { label: 'Properties', value: landlordProperties.length, icon: Building2 },
    { label: 'Occupied units', value: `${occupied} / ${totalUnits}`, icon: Users },
    { label: 'Expected monthly rent', value: landlordKES(monthlyIncome), icon: Banknote },
    { label: 'Open maintenance', value: landlordRequests.length, icon: Wrench },
  ]

  return (
    <>
      <PageHeading title="Landlord dashboard" description="An overview of your properties, tenants and rental activity." />
      <SampleDataNotice />

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
        {landlordProperties.map((property) => (
          <div key={property.id} className="flex flex-col justify-between gap-3 border-b border-border px-5 py-4 last:border-0 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-semibold text-ink">{property.name}</h3>
              <p className="mt-1 text-sm text-muted">{property.location} · {property.units} units</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted">{property.occupied}/{property.units} occupied</span>
              <StatusBadge tone="green">{property.status}</StatusBadge>
            </div>
          </div>
        ))}
      </section>

      <section className="surface-card mt-7 p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-ink">Recent maintenance requests</h2>
          <Link to="/landlord/maintenance" className="text-sm font-semibold text-brand-800">View requests</Link>
        </div>
        {landlordRequests.map((request) => (
          <div key={request.id} className="mt-4 flex flex-col justify-between gap-2 border-t border-border pt-4 sm:flex-row">
            <div>
              <p className="font-medium text-ink">{request.issue}</p>
              <p className="mt-1 text-sm text-muted">{request.tenant} · {request.property}</p>
            </div>
            <StatusBadge tone={request.status === 'Pending' ? 'amber' : 'green'}>{request.status}</StatusBadge>
          </div>
        ))}
      </section>

      <Link to="/landlord/properties/new" className="btn btn-primary mt-6">
        Add a property <ArrowRight size={16} />
      </Link>
    </>
  )
}

export default LandlordDashboardPage
