import { Link } from 'react-router-dom'
import { Wrench, Plus, Clock, CheckCircle2 } from 'lucide-react'
import PageHeading from '../../components/shared/PageHeading'
import SampleDataNotice from '../../components/shared/SampleDataNotice'
import StatusBadge from '../../components/shared/StatusBadge'
import { tenantMaintenance, paymentTone } from './tenantData'

function TenantMaintenancePage() {
  return (
    <>
      <PageHeading
        title="Maintenance"
        description="View and keep track of maintenance requests for your home."
        action={
          <Link to="/tenant/maintenance/new" className="btn btn-primary">
            <Plus size={17} /> Report an issue
          </Link>
        }
      />

      <SampleDataNotice />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="surface-card p-5">
          <Wrench size={20} className="text-brand-800" />
          <p className="mt-4 text-sm text-muted">Total requests</p>
          <p className="mt-1 text-2xl font-bold text-ink">{tenantMaintenance.length}</p>
        </div>

        <div className="surface-card p-5">
          <Clock size={20} className="text-amber-600" />
          <p className="mt-4 text-sm text-muted">In progress</p>
          <p className="mt-1 text-2xl font-bold text-ink">
            {tenantMaintenance.filter((item) => item.status === 'In progress').length}
          </p>
        </div>

        <div className="surface-card p-5">
          <CheckCircle2 size={20} className="text-green-700" />
          <p className="mt-4 text-sm text-muted">Resolved</p>
          <p className="mt-1 text-2xl font-bold text-ink">
            {tenantMaintenance.filter((item) => item.status === 'Resolved').length}
          </p>
        </div>
      </div>

      <section className="surface-card mt-6 overflow-hidden">
        <div className="border-b border-border px-5 py-4">
          <h2 className="font-semibold text-ink">Your maintenance requests</h2>
        </div>

        {tenantMaintenance.map((item) => (
          <div key={item.id} className="flex flex-col justify-between gap-3 border-b border-border px-5 py-5 last:border-0 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-sm font-semibold text-ink">{item.issue}</h3>
              <p className="mt-1 text-xs text-muted">Request reference: {item.id}</p>
            </div>
            <StatusBadge tone={paymentTone(item.status)}>{item.status}</StatusBadge>
          </div>
        ))}
      </section>
    </>
  )
}

export default TenantMaintenancePage
