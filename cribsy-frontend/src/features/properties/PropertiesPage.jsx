import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bath, BedDouble, MapPin, Search, SlidersHorizontal } from 'lucide-react'
import PageHeading from '../../components/shared/PageHeading'
import { propertyAPI } from '../../services/api'
import { formatPropertyKES } from './propertyData'

function PropertiesPage() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('All')
  const [maxRent, setMaxRent] = useState('')
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadProperties() {
      setLoading(true)
      setError('')

      try {
        const params = {
          location: search.trim(),
          type: type === 'All' ? '' : type,
          max_rent: maxRent,
          availability: 'vacant',
          page: 1,
          per_page: 30,
        }

        const response = await propertyAPI.list(params)

        if (active) {
          setProperties(response?.items || [])
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load properties.')
          setProperties([])
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    const timeout = setTimeout(loadProperties, 300)

    return () => {
      active = false
      clearTimeout(timeout)
    }
  }, [search, type, maxRent])

  return (
    <main className="min-h-screen bg-page">
      <header className="border-b border-border bg-white">
        <div className="page-container flex h-[72px] items-center justify-between">
          <Link to="/" className="text-xl font-bold text-brand-800">Cribsy</Link>
          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link to="/" className="text-muted hover:text-brand-800">Home</Link>
            <Link to="/login" className="text-muted hover:text-brand-800">Signin</Link>
            <Link to="/register" className="btn btn-primary">Get started</Link>
          </nav>
        </div>
      </header>

      <div className="page-container py-10">
        <PageHeading
          title="Find your next home"
          description="Explore available rental properties and compare your options."
        />

        <section className="surface-card mb-7 grid gap-4 p-5 md:grid-cols-[1fr_190px_190px]">
          <label className="form-label">
            Search location or property
            <span className="relative mt-2 block">
              <Search size={18} className="absolute left-3 top-3 text-muted" />
              <input
                className="form-control pl-10"
                placeholder="Enter a location or property name"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </span>
          </label>

          <label className="form-label">
            Property type
            <select
              className="form-control mt-2"
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <option>All</option>
              <option>Apartment</option>
              <option>Bedsitter</option>
              <option>House</option>
              <option>Studio</option>
            </select>
          </label>

          <label className="form-label">
            Maximum monthly rent
            <select
              className="form-control mt-2"
              value={maxRent}
              onChange={(event) => setMaxRent(event.target.value)}
            >
              <option value="">Any budget</option>
              <option value="15000">KES 15,000</option>
              <option value="25000">KES 25,000</option>
              <option value="35000">KES 35,000</option>
              <option value="50000">KES 50,000</option>
            </select>
          </label>
        </section>

        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-semibold text-ink">
            Available properties ({properties.length})
          </h2>
          <span className="flex items-center gap-2 text-sm text-muted">
            <SlidersHorizontal size={16} /> Filters applied instantly
          </span>
        </div>

        {loading ? (
          <div className="surface-card p-12 text-center text-sm text-muted">
            Loading available properties...
          </div>
        ) : error ? (
          <div className="surface-card p-12 text-center">
            <h3 className="font-semibold text-ink">Unable to load properties</h3>
            <p className="mt-2 text-sm text-muted">{error}</p>
            <button
              className="btn btn-primary mt-5"
              onClick={() => {
                setSearch((value) => value)
                setType((value) => value)
                setMaxRent((value) => value)
              }}
            >
              Please refresh the page to try again
            </button>
          </div>
        ) : properties.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <article key={property.id} className="surface-card overflow-hidden">
                <div className="flex h-44 items-center justify-center overflow-hidden bg-brand-50 text-brand-800">
                  {property.image_url ? (
                    <img
                      src={property.image_url}
                      alt={property.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-medium">Property image coming soon</span>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-ink">{property.name}</h3>
                    <span className="border border-green-200 bg-green-50 px-2 py-1 text-xs font-semibold text-green-800">
                      Available
                    </span>
                  </div>

                  <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
                    <MapPin size={15} /> {property.location}
                  </p>

                  <div className="mt-4 flex gap-5 text-sm text-muted">
                    <span className="flex items-center gap-1.5">
                      <BedDouble size={16} /> {property.bedrooms} bedroom(s)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Bath size={16} /> {property.bathrooms} bathroom(s)
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <p className="text-xs text-muted">Monthly rent</p>
                      <p className="font-bold text-brand-800">
                        {formatPropertyKES(property.monthly_rent)}
                      </p>
                    </div>
                    <Link to={`/properties/${property.id}`} className="btn btn-primary">
                      View details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="surface-card p-12 text-center">
            <h3 className="font-semibold text-ink">No matching properties</h3>
            <p className="mt-2 text-sm text-muted">
              There are currently no available properties matching your search.
            </p>
            <button
              className="btn btn-secondary mt-5"
              onClick={() => {
                setSearch('')
                setType('All')
                setMaxRent('')
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

export default PropertiesPage
