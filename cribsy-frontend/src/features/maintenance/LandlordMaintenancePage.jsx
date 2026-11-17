import { Wrench } from 'lucide-react'
import PageHeading from '../../components/shared/PageHeading'
import SampleDataNotice from '../../components/shared/SampleDataNotice'
import StatusBadge from '../../components/shared/StatusBadge'
import { landlordRequests } from '../landlord/landlordData'

function LandlordMaintenancePage() {
  return (
    <>
      <PageHeading title="Maintenance requests" description="Review maintenance issues reported by tenants." />
      <SampleDataNotice />

      <div className="space-y-4">
        {landlordRequests.map((request) => (
          <article key={request.id} className="surface-card p-5">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-brand-50 text-brand-800"><Wrench size={19} /></span>
                <div>
                  <h2 className="font-semibold text-ink">{request.issue}</h2>
                  <p className="mt-1 text-sm text-muted">{request.tenant} · {request.property}</p>
                  <p className="mt-2 text-xs text-muted">Reference: {request.id} · {request.date}</p>
                </div>
              </div>
              <StatusBadge tone={request.status === 'Pending' ? 'amber' : 'green'}>{request.status}</StatusBadge>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

export default LandlordMaintenancePage
