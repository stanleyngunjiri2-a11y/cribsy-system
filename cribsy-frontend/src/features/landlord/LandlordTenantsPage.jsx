import { Search, Users } from 'lucide-react'
import { useState } from 'react'
import PageHeading from '../../components/shared/PageHeading'
import SampleDataNotice from '../../components/shared/SampleDataNotice'
import StatusBadge from '../../components/shared/StatusBadge'
import { landlordTenants, landlordKES } from './landlordData'

function LandlordTenantsPage() {
  const [search, setSearch] = useState('')
  const filtered = landlordTenants.filter((tenant) =>
    `${tenant.name} ${tenant.property}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <PageHeading title="Tenants" description="View the tenants currently associated with your properties." />
      <SampleDataNotice />

      <div className="surface-card mb-6 flex items-center gap-3 p-4">
        <Search size={18} className="text-muted" />
        <input className="w-full bg-transparent text-sm outline-none" placeholder="Search tenant or property..." value={search} onChange={(event) => setSearch(event.target.value)} />
      </div>

      <div className="surface-card overflow-x-auto">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="bg-slate-50 text-muted">
            <tr><th className="px-5 py-4">Tenant</th><th className="px-5 py-4">Property</th><th className="px-5 py-4">Phone</th><th className="px-5 py-4">Monthly rent</th><th className="px-5 py-4">Status</th></tr>
          </thead>
          <tbody>
            {filtered.map((tenant) => (
              <tr key={tenant.id} className="border-t border-border">
                <td className="px-5 py-4"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center bg-brand-50 text-brand-800"><Users size={17} /></span><span className="font-semibold text-ink">{tenant.name}</span></div></td>
                <td className="px-5 py-4">{tenant.property}</td>
                <td className="px-5 py-4">{tenant.phone}</td>
                <td className="px-5 py-4">{landlordKES(tenant.rent)}</td>
                <td className="px-5 py-4"><StatusBadge tone="green">{tenant.status}</StatusBadge></td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filtered.length && <p className="p-8 text-center text-sm text-muted">No tenants match your search.</p>}
      </div>
    </>
  )
}

export default LandlordTenantsPage
