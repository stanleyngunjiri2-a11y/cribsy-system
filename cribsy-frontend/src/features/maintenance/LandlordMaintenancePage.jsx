import { useEffect, useState } from 'react'
import { Wrench } from 'lucide-react'
import PageHeading from '../../components/shared/PageHeading'
import StatusBadge from '../../components/shared/StatusBadge'
import { landlordAPI } from '../../services/api'

export default function LandlordMaintenancePage() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updating, setUpdating] = useState(null)

  useEffect(() => {
    landlordAPI.maintenance()
      .then(data => setRequests(Array.isArray(data) ? data : []))
      .catch(err => setError(err.message || 'Unable to load maintenance requests.'))
      .finally(() => setLoading(false))
  }, [])

  async function updateStatus(id, status) {
    setUpdating(id)
    setError('')
    try {
      const updated = await landlordAPI.updateMaintenance(id, status)
      setRequests(current => current.map(item => item.id === id ? { ...item, ...(updated || {}), status } : item))
    } catch (err) {
      setError(err.message || 'Unable to update request status.')
    } finally {
      setUpdating(null)
    }
  }

  return (
    <>
      <PageHeading title="Maintenance requests" description="Review maintenance issues reported by tenants." />
      {error && <p role="alert" className="mb-4 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {loading ? <div className="surface-card p-8 text-center text-muted">Loading maintenance requests...</div>
        : requests.length ? (
          <div className="space-y-4">
            {requests.map(request => (
              <article key={request.id} className="surface-card p-5">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div className="flex gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-brand-50 text-brand-800"><Wrench size={19} /></span>
                    <div>
                      <h2 className="font-semibold text-ink">{request.category || 'Maintenance request'}</h2>
                      <p className="mt-1 text-sm text-muted">{request.description}</p>
                      <p className="mt-2 text-xs text-muted">Reference: {request.id} · {request.created_at ? new Date(request.created_at).toLocaleDateString() : ''}</p>
                      {request.photo_urls?.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {request.photo_urls.map(url => <a key={url} href={url} target="_blank" rel="noreferrer"><img src={url} alt="Maintenance issue" className="h-20 w-20 object-cover" /></a>)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-3 sm:items-end">
                    <StatusBadge tone={request.status === 'pending' ? 'amber' : 'green'}>{request.status}</StatusBadge>
                    <select
                      aria-label="Update maintenance status"
                      disabled={updating === request.id}
                      value={request.status || 'pending'}
                      onChange={event => updateStatus(request.id, event.target.value)}
                      className="form-input text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : <div className="surface-card p-8 text-center text-muted">There are no maintenance requests.</div>}
    </>
  )
}
