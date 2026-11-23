import { useEffect, useState } from 'react'
import { Search, Users } from 'lucide-react'
import PageHeading from '../../components/shared/PageHeading'
import StatusBadge from '../../components/shared/StatusBadge'
import { landlordAPI } from '../../services/api'

const money = value => `KES ${Number(value || 0).toLocaleString('en-KE')}`

export default function LandlordTenantsPage() {
  const [tenants, setTenants] = useState([])
  const [properties, setProperties] = useState([])
  const [search, setSearch] = useState('')
  const [loadingTenants, setLoadingTenants] = useState(true)
  const [loadingProperties, setLoadingProperties] = useState(true)
  const [tenantsError, setTenantsError] = useState('')
  const [propertiesError, setPropertiesError] = useState('')
  const [assignmentError, setAssignmentError] = useState('')
  const [assignmentSuccess, setAssignmentSuccess] = useState('')
  const [assigning, setAssigning] = useState(false)
  const [assignment, setAssignment] = useState({
    tenant_email: '',
    property_id: '',
    start_date: '',
    end_date: '',
  })

  useEffect(() => {
    let active = true

    landlordAPI.tenants()
      .then(data => {
        if (active) setTenants(Array.isArray(data) ? data : [])
      })
      .catch(err => {
        if (active) setTenantsError(err.message || 'Unable to load tenants.')
      })
      .finally(() => {
        if (active) setLoadingTenants(false)
      })

    landlordAPI.properties()
      .then(data => {
        if (active) setProperties(Array.isArray(data) ? data : [])
      })
      .catch(err => {
        if (active) setPropertiesError(err.message || 'Unable to load vacant units.')
      })
      .finally(() => {
        if (active) setLoadingProperties(false)
      })

    return () => {
      active = false
    }
  }, [])

  const availableProperties = properties.filter(property =>
    property.availability === 'vacant' && property.approval_status === 'approved'
  )

  function updateAssignment(event) {
    setAssignment(current => ({ ...current, [event.target.name]: event.target.value }))
    setAssignmentError('')
    setAssignmentSuccess('')
  }

  async function submitAssignment(event) {
    event.preventDefault()
    setAssignmentError('')
    setAssignmentSuccess('')

    if (assignment.end_date <= assignment.start_date) {
      setAssignmentError('The end date must be after the start date.')
      return
    }

    setAssigning(true)
    try {
      const email = assignment.tenant_email.trim().toLowerCase()
      const property = availableProperties.find(item => String(item.id) === assignment.property_id)
      await landlordAPI.createTenancy({
        tenant_email: email,
        property_id: Number(assignment.property_id),
        start_date: assignment.start_date,
        end_date: assignment.end_date,
      })

      setAssignmentSuccess(`Active tenancy created for ${email} at ${property?.name || 'the selected unit'}.`)
      setAssignment(current => ({ ...current, tenant_email: '' }))

      try {
        const [updatedTenants, updatedProperties] = await Promise.all([
          landlordAPI.tenants(),
          landlordAPI.properties(),
        ])
        setTenants(Array.isArray(updatedTenants) ? updatedTenants : [])
        setProperties(Array.isArray(updatedProperties) ? updatedProperties : [])
      } catch {
        setAssignmentError('The tenancy was created, but the lists could not be refreshed. Reload the page to see the update.')
      }
    } catch (err) {
      const fieldErrors = err.data?.fields
      setAssignmentError(
        fieldErrors
          ? Object.values(fieldErrors).join(' ')
          : err.message || 'Unable to assign this tenant to the unit.'
      )
    } finally {
      setAssigning(false)
    }
  }

  const filtered = tenants.filter(item => {
    const tenant = item.tenant || item
    const property = item.property || {}
    return `${tenant.full_name || tenant.name || ''} ${property.name || item.property_name || ''}`.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <>
      <PageHeading title="Tenants" description="View current tenants and assign registered tenants to vacant units." />

      <section className="surface-card mb-6 p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-ink">Assign a tenant to a unit</h2>
        <p className="mt-2 text-sm text-muted">
          Enter the email used for the tenant's Cribsy account. Assignment creates an active tenancy immediately.
        </p>

        <form onSubmit={submitAssignment} className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="form-label">
            Registered tenant email
            <input
              type="email"
              name="tenant_email"
              autoComplete="email"
              required
              value={assignment.tenant_email}
              onChange={updateAssignment}
              className="form-control mt-2"
              placeholder="tenant@example.com"
            />
          </label>

          <label className="form-label">
            Vacant unit
            <select
              name="property_id"
              required
              value={assignment.property_id}
              onChange={updateAssignment}
              disabled={loadingProperties || !availableProperties.length}
              className="form-control mt-2"
            >
              <option value="">
                {loadingProperties ? 'Loading units...' : 'Select a vacant unit'}
              </option>
              {availableProperties.map(property => (
                <option key={property.id} value={property.id}>
                  {property.name} — {property.location} (KES {Number(property.monthly_rent || 0).toLocaleString('en-KE')}/month)
                </option>
              ))}
            </select>
          </label>

          <label className="form-label">
            Tenancy start date
            <input
              type="date"
              name="start_date"
              required
              value={assignment.start_date}
              onChange={updateAssignment}
              className="form-control mt-2"
            />
          </label>

          <label className="form-label">
            Tenancy end date
            <input
              type="date"
              name="end_date"
              required
              min={assignment.start_date || undefined}
              value={assignment.end_date}
              onChange={updateAssignment}
              className="form-control mt-2"
            />
          </label>

          {propertiesError && (
            <p role="alert" className="sm:col-span-2 text-sm text-red-700">{propertiesError}</p>
          )}
          {!loadingProperties && !propertiesError && !availableProperties.length && (
            <p role="status" className="sm:col-span-2 text-sm text-muted">
              No approved vacant units are available to assign. A property must be approved and vacant first.
            </p>
          )}
          {assignmentError && (
            <p role="alert" className="sm:col-span-2 text-sm text-red-700">{assignmentError}</p>
          )}
          {assignmentSuccess && (
            <p role="status" className="sm:col-span-2 text-sm text-green-700">{assignmentSuccess}</p>
          )}

          <button
            type="submit"
            disabled={assigning || loadingProperties || !availableProperties.length}
            className="btn btn-primary w-fit disabled:opacity-50"
          >
            {assigning ? 'Assigning tenant...' : 'Assign tenant'}
          </button>
        </form>
      </section>

      <div className="surface-card mb-6 flex items-center gap-3 p-4">
        <Search size={18} className="text-muted" />
        <input className="w-full bg-transparent text-sm outline-none" placeholder="Search tenant or property..." value={search} onChange={event => setSearch(event.target.value)} />
      </div>

      {loadingTenants ? <div className="surface-card p-8 text-center text-muted">Loading tenants...</div>
        : tenantsError ? <div role="alert" className="surface-card p-6 text-red-700">{tenantsError}</div>
        : filtered.length ? (
          <div className="surface-card overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-slate-50 text-muted">
                <tr><th className="px-5 py-4">Tenant</th><th className="px-5 py-4">Property</th><th className="px-5 py-4">Phone</th><th className="px-5 py-4">Monthly rent</th><th className="px-5 py-4">Status</th></tr>
              </thead>
              <tbody>
                {filtered.map((item, index) => {
                  const tenant = item.tenant || item
                  const property = item.property || {}
                  return (
                    <tr key={item.id || tenant.id || index} className="border-t border-border">
                      <td className="px-5 py-4"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center bg-brand-50 text-brand-800"><Users size={17} /></span><span className="font-semibold text-ink">{tenant.full_name || tenant.name || tenant.email || 'Tenant'}</span></div></td>
                      <td className="px-5 py-4">{property.name || item.property_name || 'Property'}</td>
                      <td className="px-5 py-4">{tenant.phone || item.phone || 'Not provided'}</td>
                      <td className="px-5 py-4">{money(item.monthly_rent || property.monthly_rent)}</td>
                      <td className="px-5 py-4"><StatusBadge tone={item.status === 'active' ? 'green' : 'amber'}>{item.status || 'Active'}</StatusBadge></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : <div className="surface-card p-8 text-center text-muted">No tenants found.</div>}
    </>
  )
}
