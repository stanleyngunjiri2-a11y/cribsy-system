import { useEffect, useState } from 'react'
import PageHeading from '../../components/shared/PageHeading'
import StatusBadge from '../../components/shared/StatusBadge'
import { adminAPI } from '../../services/api'

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updating, setUpdating] = useState(null)

  useEffect(() => {
    let active = true

    adminAPI.properties()
      .then(result => {
        if (!active) return
        setProperties(Array.isArray(result) ? result : [])
        setError('')
      })
      .catch(err => {
        if (active) setError(err.message || 'Unable to load properties.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  async function reviewProperty(property, approval_status) {
    setUpdating(property.id)
    try {
      const updated = await adminAPI.updatePropertyApproval(property.id, approval_status)
      setProperties(current => current.map(item => item.id === property.id ? updated : item))
    } catch (err) {
      setError(err.message || 'Unable to update property approval.')
    } finally {
      setUpdating(null)
    }
  }

  const visible = properties.filter(property =>
    filter === 'all' || property.approval_status === filter
  )

  return (
    <>
      <PageHeading title="Property management" description="Review property listings submitted by landlords." />

      <div className="mb-5 flex flex-wrap gap-2">
        {['all', 'pending', 'approved', 'rejected'].map(item => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`border px-4 py-2 text-sm font-medium capitalize ${
              filter === item
                ? 'border-brand-800 bg-brand-50 text-brand-800'
                : 'border-border bg-white text-muted'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {error && <p role="alert" className="mb-4 text-sm text-red-700">{error}</p>}

      {loading ? (
        <p className="py-8 text-sm text-muted">Loading properties...</p>
      ) : (
        <div className="surface-card overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-slate-50 text-muted">
              <tr>
                <th className="px-5 py-4">Property</th>
                <th className="px-5 py-4">Landlord</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Review</th>
              </tr>
            </thead>
            <tbody>
              {visible.map(property => (
                <tr key={property.id} className="border-t border-border">
                  <td className="px-5 py-4 font-semibold text-ink">{property.name}</td>
                  <td className="px-5 py-4">
                    {property.landlord_name || property.landlord?.full_name || property.owner_name || 'Not available'}
                  </td>
                  <td className="px-5 py-4">{property.location}</td>
                  <td className="px-5 py-4">
                    <StatusBadge tone={
                      property.approval_status === 'approved' ? 'green' :
                      property.approval_status === 'rejected' ? 'red' : 'amber'
                    }>
                      {property.approval_status}
                    </StatusBadge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-3">
                      <button
                        disabled={updating === property.id || property.approval_status === 'approved'}
                        onClick={() => reviewProperty(property, 'approved')}
                        className="text-sm text-green-700 underline disabled:opacity-40"
                      >
                        Approve
                      </button>
                      <button
                        disabled={updating === property.id || property.approval_status === 'rejected'}
                        onClick={() => reviewProperty(property, 'rejected')}
                        className="text-sm text-red-700 underline disabled:opacity-40"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!visible.length && (
            <p className="p-8 text-center text-sm text-muted">No properties found for this filter.</p>
          )}
        </div>
      )}
    </>
  )
}
