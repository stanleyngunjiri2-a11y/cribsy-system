import { useEffect, useState } from 'react'
import { Search, Users } from 'lucide-react'
import PageHeading from '../../components/shared/PageHeading'
import StatusBadge from '../../components/shared/StatusBadge'
import { landlordAPI } from '../../services/api'

const money = value => `KES ${Number(value || 0).toLocaleString('en-KE')}`

export default function LandlordTenantsPage() {
  const [tenants, setTenants] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    landlordAPI.tenants()
      .then(data => setTenants(Array.isArray(data) ? data : []))
      .catch(err => setError(err.message || 'Unable to load tenants.'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = tenants.filter(item => {
    const tenant = item.tenant || item
    const property = item.property || {}
    return `${tenant.full_name || tenant.name || ''} ${property.name || item.property_name || ''}`.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <>
      <PageHeading title="Tenants" description="View the tenants currently associated with your properties." />
      <div className="surface-card mb-6 flex items-center gap-3 p-4">
        <Search size={18} className="text-muted" />
        <input className="w-full bg-transparent text-sm outline-none" placeholder="Search tenant or property..." value={search} onChange={event => setSearch(event.target.value)} />
      </div>

      {loading ? <div className="surface-card p-8 text-center text-muted">Loading tenants...</div>
        : error ? <div role="alert" className="surface-card p-6 text-red-700">{error}</div>
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
