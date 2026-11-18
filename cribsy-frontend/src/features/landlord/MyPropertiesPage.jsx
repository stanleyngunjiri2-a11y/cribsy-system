import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, MapPin, Pencil } from 'lucide-react'
import PageHeading from '../../components/shared/PageHeading'
import StatusBadge from '../../components/shared/StatusBadge'
import { landlordAPI } from '../../services/api'

const money = value => `KES ${Number(value || 0).toLocaleString('en-KE')}`

export default function MyPropertiesPage() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    landlordAPI.properties()
      .then(data => setProperties(Array.isArray(data) ? data : []))
      .catch(err => setError(err.message || 'Unable to load properties.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <PageHeading
        title="My properties"
        description="Review and manage the properties under your account."
        action={<Link to="/landlord/properties/new" className="btn btn-primary"><Plus size={17} /> Add property</Link>}
      />

      {loading ? <div className="surface-card p-8 text-center text-muted">Loading properties...</div>
        : error ? <div role="alert" className="surface-card p-6 text-red-700">{error}</div>
        : properties.length ? (
          <div className="surface-card overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-slate-50 text-muted">
                <tr>
                  <th className="px-5 py-4">Property</th>
                  <th className="px-5 py-4">Type</th>
                  <th className="px-5 py-4">Bedrooms</th>
                  <th className="px-5 py-4">Monthly rent</th>
                  <th className="px-5 py-4">Approval</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {properties.map(property => (
                  <tr key={property.id} className="border-t border-border">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-ink">{property.name}</p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-muted"><MapPin size={13} /> {property.location}</p>
                    </td>
                    <td className="px-5 py-4">{property.property_type}</td>
                    <td className="px-5 py-4">{property.bedrooms ?? 0}</td>
                    <td className="px-5 py-4">{money(property.monthly_rent)}</td>
                    <td className="px-5 py-4">
                      <StatusBadge tone={property.approval_status === 'approved' ? 'green' : 'amber'}>
                        {property.approval_status || 'Pending'}
                      </StatusBadge>
                    </td>
                    <td className="px-5 py-4">
                      <Link to={`/landlord/properties/${property.id}/edit`} className="inline-flex items-center gap-2 font-semibold text-brand-800"><Pencil size={15} /> Edit</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <div className="surface-card p-8 text-center text-muted">You have not added any properties yet.</div>}
    </>
  )
}
