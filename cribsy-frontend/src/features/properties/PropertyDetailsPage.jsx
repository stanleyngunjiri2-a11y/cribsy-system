import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Bath, BedDouble, MapPin, ShieldCheck } from 'lucide-react'
import PageHeading from '../../components/shared/PageHeading'
import { propertyAPI } from '../../services/api'
import { formatPropertyKES } from './propertyData'

function PropertyDetailsPage() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadProperty() {
      setLoading(true)
      setError('')

      try {
        const result = await propertyAPI.get(id)
        if (active) setProperty(result)
      } catch (err) {
        if (active) {
          setProperty(null)
          setError(err.message || 'Unable to load this property.')
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    loadProperty()

    return () => {
      active = false
    }
  }, [id])

  if (loading) {
    return (
      <main className="page-container py-16">
        <p className="text-sm text-muted">Loading property details...</p>
      </main>
    )
  }

  if (!property) {
    return (
      <main className="page-container py-16">
        <h1 className="page-title">
          {error ? 'Unable to load property' : 'Property not found'}
        </h1>
        <p className="page-description">
          {error || 'This property may no longer be available.'}
        </p>
        <Link to="/properties" className="btn btn-primary mt-6">
          Browse properties
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-page">
      <header className="border-b border-border bg-white">
        <div className="page-container flex h-[72px] items-center justify-between">
          <Link to="/" className="text-xl font-bold text-brand-800">Cribsy</Link>
          <Link to="/login" className="text-sm font-semibold text-brand-800">
            Sign in
          </Link>
        </div>
      </header>

      <div className="page-container py-10">
        <Link
          to="/properties"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-brand-800"
        >
          <ArrowLeft size={16} /> Back to properties
        </Link>

        <PageHeading
          title={property.name}
          description={
            <span className="inline-flex items-center gap-1">
              <MapPin size={15} /> {property.location}
            </span>
          }
        />

        <div className="grid gap-7 lg:grid-cols-[1fr_340px]">
          <div>
            <div className="flex min-h-72 items-center justify-center overflow-hidden bg-brand-50 text-brand-800">
              {property.image_url ? (
                <img
                  src={property.image_url}
                  alt={property.name}
                  className="max-h-[480px] w-full object-cover"
                />
              ) : (
                <span className="text-sm">Property image coming soon</span>
              )}
            </div>

            <section className="surface-card mt-6 p-6">
              <h2 className="text-lg font-semibold text-ink">Property overview</h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                {property.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted">
                <span className="flex items-center gap-2">
                  <BedDouble size={18} /> {property.bedrooms} bedroom(s)
                </span>
                <span className="flex items-center gap-2">
                  <Bath size={18} /> {property.bathrooms} bathroom(s)
                </span>
              </div>
            </section>

            <section className="surface-card mt-6 p-6">
              <h2 className="text-lg font-semibold text-ink">Amenities</h2>
              {property.amenities?.length ? (
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {property.amenities.map((amenity) => (
                    <li key={amenity} className="flex items-center gap-2 text-sm text-muted">
                      <ShieldCheck size={17} className="text-brand-800" />
                      {amenity}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-muted">
                  No amenities have been listed for this property.
                </p>
              )}
            </section>
          </div>

          <aside className="surface-card h-fit p-6">
            <p className="text-sm text-muted">Monthly rent</p>
            <p className="mt-1 text-3xl font-bold text-brand-800">
              {formatPropertyKES(property.monthly_rent)}
            </p>

            <div className="mt-5 space-y-4 border-y border-border py-5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Property type</span>
                <strong>{property.property_type}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Availability</span>
                <strong className="text-green-700">
                  {property.availability === 'vacant' ? 'Available' : 'Occupied'}
                </strong>
              </div>
              {property.landlord?.full_name && (
                <div className="flex justify-between gap-3">
                  <span className="text-muted">Listed by</span>
                  <strong>{property.landlord.full_name}</strong>
                </div>
              )}
            </div>

            <Link to="/register" className="btn btn-primary mt-6 w-full justify-center">
              Create an account
            </Link>
            <p className="mt-3 text-xs leading-5 text-muted">
              Create an account to get started with Cribsy.
            </p>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default PropertyDetailsPage
