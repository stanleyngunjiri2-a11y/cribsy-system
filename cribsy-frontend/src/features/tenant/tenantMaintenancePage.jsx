import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Wrench, Plus, Clock, CheckCircle2 } from 'lucide-react'
import PageHeading from '../../components/shared/PageHeading'
import StatusBadge from '../../components/shared/StatusBadge'
import { tenantAPI } from '../../services/api'

function statusTone(status) {
  const value = String(status || '').toLowerCase()
  if (value === 'resolved') return 'green'
  if (value === 'in_progress' || value === 'pending') return 'amber'
  if (value === 'rejected') return 'red'
  return 'slate'
}

function TenantMaintenancePage() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    tenantAPI.maintenance()
      .then((result) => {
        if (active) setRequests(Array.isArray(result) ? result : [])
      })
      .catch((err) => {
        if (active) setError(err.message || 'Unable to load maintenance requests.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

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

      {error && (
        <div role="alert" className="mb-5 rounded-lg border border-red-200 bg-white p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="surface-card p-5">
          <Wrench size={20} className="text-brand-800" />
          <p className="mt-4 text-sm text-muted">Total requests</p>
          <p className="mt-1 text-2xl font-bold text-ink">{requests.length}</p>
        </div>

        <div className="surface-card p-5">
          <Clock size={20} className="text-amber-600" />
          <p className="mt-4 text-sm text-muted">In progress</p>
          <p className="mt-1 text-2xl font-bold text-ink">
            {requests.filter((item) => item.status === 'in_progress').length}
          </p>
        </div>

        <div className="surface-card p-5">
          <CheckCircle2 size={20} className="text-green-700" />
          <p className="mt-4 text-sm text-muted">Resolved</p>
          <p className="mt-1 text-2xl font-bold text-ink">
            {requests.filter((item) => item.status === 'resolved').length}
          </p>
        </div>
      </div>

      <section className="surface-card mt-6 overflow-hidden">
        <div className="border-b border-border px-5 py-4">
          <h2 className="font-semibold text-ink">Your maintenance requests</h2>
        </div>

        {loading ? (
          <p className="px-5 py-8 text-sm text-muted">Loading maintenance requests...</p>
        ) : requests.length === 0 ? (
          <p className="px-5 py-8 text-sm text-muted">
            You have not submitted any maintenance requests.
          </p>
        ) : (
          requests.map((item) => (
            <div key={item.id} className="flex flex-col justify-between gap-3 border-b border-border px-5 py-5 last:border-0 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-sm font-semibold text-ink">{item.category}</h3>
                <p className="mt-1 text-sm text-muted">{item.description}</p>
                <p className="mt-1 text-xs text-muted">
                  Submitted: {item.created_at ? new Date(item.created_at).toLocaleDateString('en-KE') : 'Not available'}
                </p>
                <p className="mt-1 text-xs text-muted">Request reference: {item.id}</p>
              </div>
              <StatusBadge tone={statusTone(item.status)}>{item.status}</StatusBadge>
            </div>
          ))
        )}
      </section>
    </>
  )
}

export default TenantMaintenancePage
