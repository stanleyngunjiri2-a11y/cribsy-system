// OWNER: Member 3 - Quincy. Reusable property card.
import { Link } from 'react-router-dom'
import { Bath, BedDouble } from 'lucide-react'
import PropertyImage from './PropertyImage'
import StatusBadge from '../../components/shared/StatusBadge'
import { formatKES } from '../../utils/format'

function PropertyCard({ property }) {
  const { id, name, location, rent, bedrooms, bathrooms, type, available } = property

  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <PropertyImage name={name} />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold">{name}</h3>
          <StatusBadge tone={available ? 'green' : 'slate'}>{available ? 'Available' : 'Unavailable'}</StatusBadge>
        </div>
        <p className="text-sm text-slate-600">{location}</p>
        <p className="mt-2 flex items-center gap-4 text-sm text-slate-600">
          <span>{type}</span>
          <span className="flex items-center gap-1"><BedDouble size={16} /> {bedrooms}</span>
          <span className="flex items-center gap-1"><Bath size={16} /> {bathrooms}</span>
        </p>
        <p className="mt-2 font-semibold text-emerald-800">{formatKES(rent)} / month</p>
        <Link to={`/properties/${id}`} className="mt-3 inline-block text-sm text-emerald-700 underline">
          View details
        </Link>
      </div>
    </article>
  )
}

export default PropertyCard
