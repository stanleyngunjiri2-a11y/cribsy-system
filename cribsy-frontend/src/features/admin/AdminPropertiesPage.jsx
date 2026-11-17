import { useState } from 'react'
import PageHeading from '../../components/shared/PageHeading'
import SampleDataNotice from '../../components/shared/SampleDataNotice'
import StatusBadge from '../../components/shared/StatusBadge'
import { adminProperties } from './adminData'

function AdminPropertiesPage() {
  const [filter, setFilter] = useState('All')
  const properties = adminProperties.filter((property) => filter === 'All' || property.status === filter)

  return (
    <>
      <PageHeading title="Property management" description="Review property listings submitted by landlords." />
      <SampleDataNotice />
      <div className="mb-5 flex flex-wrap gap-2">
        {['All', 'Approved', 'Pending'].map((item) => (
          <button key={item} onClick={() => setFilter(item)} className={`border px-4 py-2 text-sm font-medium ${filter === item ? 'border-brand-800 bg-brand-50 text-brand-800' : 'border-border bg-white text-muted'}`}>{item}</button>
        ))}
      </div>
      <div className="surface-card overflow-x-auto">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="bg-slate-50 text-muted">
            <tr><th className="px-5 py-4">Property</th><th className="px-5 py-4">Landlord</th><th className="px-5 py-4">Location</th><th className="px-5 py-4">Status</th></tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id} className="border-t border-border">
                <td className="px-5 py-4 font-semibold text-ink">{property.name}</td>
                <td className="px-5 py-4">{property.owner}</td>
                <td className="px-5 py-4">{property.location}</td>
                <td className="px-5 py-4"><StatusBadge tone={property.status === 'Approved' ? 'green' : 'amber'}>{property.status}</StatusBadge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-muted">Approval and rejection actions will be enabled when the administrator API is connected.</p>
    </>
  )
}

export default AdminPropertiesPage
