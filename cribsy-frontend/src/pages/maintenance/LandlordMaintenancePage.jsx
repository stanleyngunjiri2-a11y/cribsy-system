// OWNER: Member 6 - Lynn. Landlord reviews requests and updates their status.
import { useState } from 'react'
import PageHeading from '../../components/shared/PageHeading'
import StateMessage from '../../components/shared/StateMessage'
import SampleDataNotice from '../../components/shared/SampleDataNotice'
import StatusBadge from '../../components/shared/StatusBadge'
import SelectField from '../../components/shared/SelectField'
import Button from '../../components/shared/Button'
import { formatDate } from '../../utils/format'
import { maintenanceRequests, statuses, statusTone } from './maintenanceData'

function LandlordMaintenancePage() {
  const [requests, setRequests] = useState(maintenanceRequests)
  const [filter, setFilter] = useState('')
  const [selectedId, setSelectedId] = useState(null)

  const shown = requests.filter((r) => !filter || r.status === filter)
  const selected = requests.find((r) => r.id === selectedId)

  function updateStatus(id, status) {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
  }

  return (
    <>
      <PageHeading title="Maintenance requests" description="Requests reported by your tenants." />
      <SampleDataNotice />

      <div className="mb-4 max-w-xs">
        <SelectField id="filter" label="Filter by status" value={filter} onChange={(e) => setFilter(e.target.value)}
          options={[{ value: '', label: 'All statuses' }, ...statuses]} />
      </div>

      {shown.length === 0 ? (
        <StateMessage title="No requests" message="No requests match this filter." />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          <ul className="flex flex-col gap-3">
            {shown.map((r) => (
              <li key={r.id}>
                <button
                  onClick={() => setSelectedId(r.id)}
                  className={`w-full rounded-lg border bg-white p-4 text-left ${r.id === selectedId ? 'border-emerald-600' : 'border-slate-200'}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{r.category} - {r.tenantName}</span>
                    <StatusBadge tone={statusTone(r.status)}>{r.status}</StatusBadge>
                  </div>
                  <p className="text-sm text-slate-600">{r.propertyName}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-700">{r.description}</p>
                </button>
              </li>
            ))}
          </ul>

          <aside aria-live="polite" className="rounded-lg border border-slate-200 bg-white p-4">
            {selected ? (
              <>
                <h2 className="font-semibold">{selected.category}</h2>
                <p className="text-sm text-slate-600">{selected.tenantName} | {selected.propertyName}</p>
                <p className="text-xs text-slate-500">Submitted {formatDate(selected.submittedOn)} | {selected.photos} photo(s)</p>
                <p className="mt-3 text-sm text-slate-700">{selected.description}</p>

                <div className="mt-4 max-w-xs">
                  <SelectField id="status" label="Status" value={selected.status}
                    onChange={(e) => updateStatus(selected.id, e.target.value)} options={statuses} />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button onClick={() => updateStatus(selected.id, 'Resolved')}>Mark as resolved</Button>
                  <Button variant="outline" onClick={() => updateStatus(selected.id, 'Rejected')}>Reject</Button>
                </div>
                <p className="mt-3 text-xs text-slate-500">Status changes are kept on this page only until the backend is connected.</p>
              </>
            ) : (
              <p className="text-sm text-slate-600">Select a request to review it.</p>
            )}
          </aside>
        </div>
      )}
    </>
  )
}

export default LandlordMaintenancePage
