import { Link } from 'react-router-dom'
import { Plus, MapPin, Pencil } from 'lucide-react'
import PageHeading from '../../components/shared/PageHeading'
import SampleDataNotice from '../../components/shared/SampleDataNotice'
import StatusBadge from '../../components/shared/StatusBadge'
import { landlordProperties, landlordKES } from './landlordData'

function MyPropertiesPage() {
  return (
    <>
      <PageHeading
        title="My properties"
        description="Review and manage the properties under your account."
        action={<Link to="/landlord/properties/new" className="btn btn-primary"><Plus size={17} /> Add property</Link>}
      />
      <SampleDataNotice />

      <div className="surface-card overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="bg-slate-50 text-muted">
            <tr>
              <th className="px-5 py-4">Property</th>
              <th className="px-5 py-4">Units</th>
              <th className="px-5 py-4">Occupancy</th>
              <th className="px-5 py-4">Monthly rent</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {landlordProperties.map((property) => (
              <tr key={property.id} className="border-t border-border">
                <td className="px-5 py-4">
                  <p className="font-semibold text-ink">{property.name}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted"><MapPin size={13} /> {property.location}</p>
                </td>
                <td className="px-5 py-4">{property.units}</td>
                <td className="px-5 py-4">{property.occupied} / {property.units}</td>
                <td className="px-5 py-4">{landlordKES(property.rent)}</td>
                <td className="px-5 py-4"><StatusBadge tone="green">{property.status}</StatusBadge></td>
                <td className="px-5 py-4"><Link to={`/landlord/properties/${property.id}/edit`} className="inline-flex items-center gap-2 font-semibold text-brand-800"><Pencil size={15} /> Edit</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default MyPropertiesPage
