import { useCallback, useEffect, useState } from 'react'
import PageHeading from '../../components/shared/PageHeading'
import StatusBadge from '../../components/shared/StatusBadge'
import { applicationAPI, unitAPI } from '../../services/api'

export default function LandlordApplicationsPage() {
  const [applications, setApplications] = useState([])
  const [units, setUnits] = useState({})
  const [assignments, setAssignments] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(null)

  const load = useCallback(async () => {
    setError('')
    const items = await applicationAPI.landlordList()
    setApplications(Array.isArray(items) ? items : [])
    const propertyIds = [...new Set(items.map(item => item.property_id))]
    const unitResults = await Promise.all(propertyIds.map(async id => {
      try {
        return [id, await unitAPI.list(id)]
      } catch {
        return [id, []]
      }
    }))
    setUnits(Object.fromEntries(unitResults))
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load().catch(err => setError(err.message || 'Unable to load applications.'))
      .finally(() => setLoading(false))
  }, [load])

  async function review(id, status) {
    setBusy(id)
    setError('')
    setNotice('')
    try {
      await applicationAPI.review(id, status)
      setNotice(`Application ${status}.`)
      await load()
    } catch (err) {
      setError(err.message || 'Unable to update this application.')
    } finally {
      setBusy(null)
    }
  }

  function updateAssignment(id, field, value) {
    setAssignments(current => ({
      ...current,
      [id]: { ...current[id], [field]: value },
    }))
  }

  async function assign(application) {
    const value = assignments[application.id] || {}
    if (!value.unit_id || !value.start_date || !value.end_date) {
      setError('Select a unit and enter both tenancy dates before assigning.')
      return
    }
    if (value.end_date <= value.start_date) {
      setError('The tenancy end date must be after its start date.')
      return
    }
    setBusy(application.id)
    setError('')
    setNotice('')
    try {
      await applicationAPI.assign(application.id, {
        unit_id: Number(value.unit_id),
        start_date: value.start_date,
        end_date: value.end_date,
      })
      setNotice(`${application.tenant?.full_name || 'Applicant'} has been assigned to a unit.`)
      await load()
    } catch (err) {
      setError(err.message || 'Unable to assign this applicant.')
    } finally {
      setBusy(null)
    }
  }

  return (
    <>
      <PageHeading title="Property applications" description="Review tenant applications, approve suitable applicants and assign them to available units." />
      {error && <div role="alert" className="surface-card mb-4 p-4 text-sm text-red-700">{error}</div>}
      {notice && <div role="status" className="surface-card mb-4 p-4 text-sm text-green-700">{notice}</div>}
      {loading ? <div className="surface-card p-8 text-center text-muted">Loading applications...</div>
        : applications.length === 0 ? <div className="surface-card p-8 text-center text-muted">There are no applications for your properties yet.</div>
        : <div className="space-y-4">
          {applications.map(application => {
            const availableUnits = (units[application.property_id] || []).filter(unit => unit.status === 'available')
            const value = assignments[application.id] || {}
            return (
              <article key={application.id} className="surface-card p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-ink">{application.tenant?.full_name || 'Tenant applicant'}</h2>
                    <p className="mt-1 text-sm text-muted">{application.tenant?.email} · {application.tenant?.phone || 'No phone provided'}</p>
                    <p className="mt-2 text-sm font-medium text-brand-800">{application.property?.name} · {application.property?.location}</p>
                  </div>
                  <StatusBadge tone={application.status === 'approved' ? 'green' : application.status === 'rejected' ? 'red' : 'amber'}>{application.status}</StatusBadge>
                </div>
                {application.message && <div className="mt-4 bg-slate-50 p-4 text-sm leading-6 text-muted">{application.message}</div>}
                <p className="mt-3 text-xs text-muted">Applied: {application.created_at ? new Date(application.created_at).toLocaleString() : 'Date unavailable'}</p>
                {application.status === 'pending' && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button disabled={busy === application.id} onClick={() => review(application.id, 'approved')} className="btn btn-primary disabled:opacity-50">Approve application</button>
                    <button disabled={busy === application.id} onClick={() => review(application.id, 'rejected')} className="btn btn-outline disabled:opacity-50">Reject application</button>
                  </div>
                )}
                {application.status === 'approved' && (
                  <div className="mt-5 border-t border-border pt-5">
                    <h3 className="font-semibold text-ink">Assign an available unit</h3>
                    {availableUnits.length === 0 ? <p className="mt-2 text-sm text-muted">Create an available unit for this property before assigning the applicant.</p> : (
                      <div className="mt-3 grid gap-3 sm:grid-cols-3">
                        <label className="form-label">Available unit
                          <select className="form-control mt-2" value={value.unit_id || ''} onChange={event => updateAssignment(application.id, 'unit_id', event.target.value)}>
                            <option value="">Select a unit</option>
                            {availableUnits.map(unit => <option key={unit.id} value={unit.id}>{unit.unit_number} · KES {Number(unit.monthly_rent).toLocaleString('en-KE')}/month</option>)}
                          </select>
                        </label>
                        <label className="form-label">Start date
                          <input type="date" className="form-control mt-2" value={value.start_date || ''} onChange={event => updateAssignment(application.id, 'start_date', event.target.value)} />
                        </label>
                        <label className="form-label">End date
                          <input type="date" min={value.start_date || undefined} className="form-control mt-2" value={value.end_date || ''} onChange={event => updateAssignment(application.id, 'end_date', event.target.value)} />
                        </label>
                      </div>
                    )}
                    {availableUnits.length > 0 && <button disabled={busy === application.id} onClick={() => assign(application)} className="btn btn-primary mt-4 disabled:opacity-50">{busy === application.id ? 'Assigning...' : 'Assign applicant to unit'}</button>}
                  </div>
                )}
              </article>
            )
          })}
        </div>}
    </>
  )
}
