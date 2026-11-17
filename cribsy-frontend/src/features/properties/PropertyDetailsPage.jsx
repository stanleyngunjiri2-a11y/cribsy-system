import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Bath, BedDouble, MapPin, ShieldCheck } from 'lucide-react'
import PageHeading from '../../components/shared/PageHeading'
import SampleDataNotice from '../../components/shared/SampleDataNotice'
import { properties, formatPropertyKES } from './propertyData'

function PropertyDetailsPage() {
  const { id } = useParams()
  const property = properties.find((item) => item.id === id)

  if (!property) {
    return (
      <main className="page-container py-16">
        <h1 className="page-title">Property not found</h1>
        <p className="page-description">This property may no longer be available.</p>
        <Link to="/properties" className="btn btn-primary mt-6">Browse properties</Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-page">
      <header className="border-b border-border bg-white">
        <div className="page-container flex h-[72px] items-center justify-between">
          <Link to="/" className="text-xl font-bold text-brand-800">Cribsy</Link>
          <Link to="/login" className="text-sm font-semibold text-brand-800">Sign in</Link>
        </div>
      </header>

      <div className="page-container py-10">
        <Link to="/properties" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-brand-800">
          <ArrowLeft size={16} /> Back to properties
        </Link>
        <SampleDataNotice />
        <PageHeading title={property.name} description={<span className="inline-flex items-center gap-1"><MapPin size={15} />{property.location}</span>} />

        <div className="grid gap-7 lg:grid-cols-[1fr_340px]">
          <div>
            <div className="flex min-h-72 items-center justify-center bg-brand-50 text-brand-800">
              Property image coming soon
            </div>

            <section className="surface-card mt-6 p-6">
              <h2 className="text-lg font-semibold text-ink">Property overview</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{property.description}</p>
              <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted">
                <span className="flex items-center gap-2"><BedDouble size={18} /> {property.bedrooms} bedroom(s)</span>
                <span className="flex items-center gap-2"><Bath size={18} /> {property.bathrooms} bathroom(s)</span>
              </div>
            </section>

            <section className="surface-card mt-6 p-6">
              <h2 className="text-lg font-semibold text-ink">Amenities</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {property.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-2 text-sm text-muted">
                    <ShieldCheck size={17} className="text-brand-800" /> {amenity}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="surface-card h-fit p-6">
            <p className="text-sm text-muted">Monthly rent</p>
            <p className="mt-1 text-3xl font-bold text-brand-800">{formatPropertyKES(property.rent)}</p>
            <div className="mt-5 space-y-4 border-y border-border py-5 text-sm">
              <div className="flex justify-between"><span className="text-muted">Deposit</span><strong>{formatPropertyKES(property.deposit)}</strong></div>
              <div className="flex justify-between"><span className="text-muted">Property type</span><strong>{property.type}</strong></div>
              <div className="flex justify-between"><span className="text-muted">Availability</span><strong className="text-green-700">{property.status}</strong></div>
            </div>
            <Link to="/register" className="btn btn-primary mt-6 w-full justify-center">Create an account</Link>
            <p className="mt-3 text-xs leading-5 text-muted">Registration and property enquiries will be connected to the backend in a later integration.</p>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default PropertyDetailsPage
