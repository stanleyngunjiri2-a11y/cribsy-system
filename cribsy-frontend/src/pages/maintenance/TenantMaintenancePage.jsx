// OWNER: Member 6 - Lynn. Tenant's submitted maintenance requests, with a details panel.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeading from '../../components/shared/PageHeading'
import StateMessage from '../../components/shared/StateMessage'
import SampleDataNotice from '../../components/shared/SampleDataNotice'
import StatusBadge from '../../components/shared/StatusBadge'
import { formatDate } from '../../utils/format'
import { maintenanceRequests, statusTone } from './maintenanceData'

// Sample: the requests that belong to the signed-in tenant.
const myRequests = maintenanceRequests.filter((r) => r.tenantName === 'Jane Wanjiku')

function TenantMaintenancePage() {
  const [selectedId, setSelectedId] = useState(null)
  const selected = myRequests.find((r) => r.id === selectedId)

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <PageHeading title="My maintenance requests" description="Track the repairs you have reported." />
        <Link to="/tenant/maintenance/new" className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800">
          New request
        </Link>
      </div>
      <SampleDataNotice />

      {myRequests.length === 0 ? (
        <StateMessage title="No requests yet" message="Requests you submit will appear here." />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          <ul className="flex flex-col gap-3">
            {myRequests.map((r) => (
              <li key={r.id}>
                <button
                  onClick={() => setSelectedId(r.id)}
                  className={`w-full rounded-lg border bg-white p-4 text-left ${r.id === selectedId ? 'border-emerald-600' : 'border-slate-200'}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{r.category}</span>
                    <StatusBadge tone={statusTone(r.status)}>{r.status}</StatusBadge>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-600">{r.description}</p>
                  <p className="mt-1 text-xs text-slate-500">Submitted {formatDate(r.submittedOn)}</p>
                </button>
              </li>
            ))}
          </ul>

          <aside aria-live="polite" className="rounded-lg border border-slate-200 bg-white p-4">
            {selected ? (
              <>
                <h2 className="font-semibold">Request details</h2>
                <dl className="mt-3 divide-y divide-slate-100 text-sm">
                  <div className="flex justify-between gap-4 py-2"><dt className="text-slate-500">Property</dt><dd className="font-medium">{selected.propertyName}</dd></div>
                  <div className="flex justify-between gap-4 py-2"><dt className="text-slate-500">Category</dt><dd className="font-medium">{selected.category}</dd></div>
                  <div className="flex justify-between gap-4 py-2"><dt className="text-slate-500">Submitted</dt><dd className="font-medium">{formatDate(selected.submittedOn)}</dd></div>
                  <div className="flex justify-between gap-4 py-2"><dt className="text-slate-500">Photos</dt><dd className="font-medium">{selected.photos}</dd></div>
                </dl>
                <p className="mt-3 text-sm text-slate-700">{selected.description}</p>
                <div className="mt-3"><StatusBadge tone={statusTone(selected.status)}>{selected.status}</StatusBadge></div>
              </>
            ) : (
              <p className="text-sm text-slate-600">Select a request to see its details.</p>
            )}
          </aside>
        </div>
      )}
    </>
  )
}

export default TenantMaintenancePage
