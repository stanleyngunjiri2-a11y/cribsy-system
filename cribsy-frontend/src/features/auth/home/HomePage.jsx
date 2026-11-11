// OWNER: Member 2 - Alex. Public landing page.
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Home, Search } from 'lucide-react'
import SampleDataNotice from '../../components/shared/SampleDataNotice'
import { formatKES } from '../../utils/format'
import { benefits, featuredProperties, steps } from './homeData'

function HomePage() {
  const navigate = useNavigate()
  const [location, setLocation] = useState('')

  function handleSearch(e) {
    e.preventDefault()
    navigate(`/properties?location=${encodeURIComponent(location.trim())}`)
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-emerald-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <h1 className="max-w-2xl text-3xl font-bold md:text-5xl">
            Rental management that keeps landlords and tenants connected
          </h1>
          <p className="mt-4 max-w-xl text-emerald-100">
            RentConnect brings properties, tenants, maintenance requests and rent records into one organised place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/properties" className="rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-emerald-800 hover:bg-emerald-50">
              Find a home
            </Link>
            <Link to="/register" className="rounded-md border border-white px-5 py-2.5 text-sm font-semibold hover:bg-emerald-700">
              List your property
            </Link>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="mx-auto -mt-6 max-w-3xl px-4">
        <form onSubmit={handleSearch} className="flex gap-2 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
          <label htmlFor="home-search" className="sr-only">Search by location</label>
          <input
            id="home-search"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search by location, for example Ruiru"
            className="min-w-0 flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
          <button className="flex items-center gap-2 rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800">
            <Search size={16} /> Search
          </button>
        </form>
      </section>

      {/* Featured properties */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">Featured properties</h2>
        <div className="mt-4"><SampleDataNotice /></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((p) => (
            <article key={p.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
              <div role="img" aria-label={`Photo placeholder for ${p.name}`}
                className="flex h-36 items-center justify-center bg-emerald-50 text-emerald-700">
                <Home size={32} />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-slate-600">{p.location}</p>
                <p className="mt-2 text-sm text-slate-600">{p.type} | {p.bedrooms} bedrooms</p>
                <p className="mt-1 font-semibold text-emerald-800">{formatKES(p.rent)} / month</p>
              </div>
            </article>
          ))}
        </div>
        <Link to="/properties" className="mt-4 inline-block text-sm text-emerald-700 underline">View all properties</Link>
      </section>

      {/* Benefits */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold">Why RentConnect</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.title}>
                <h3 className="font-semibold text-emerald-800">{b.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">How it works</h2>
        <ol className="mt-6 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-lg border border-slate-200 bg-white p-5">
              <span className="text-sm font-semibold text-emerald-700">Step {i + 1}</span>
              <h3 className="mt-1 font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Calls to action */}
      <section className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-2">
        <div className="rounded-lg bg-emerald-50 p-6">
          <h2 className="text-xl font-bold">For landlords</h2>
          <p className="mt-1 text-sm text-slate-700">List your properties and follow rent and maintenance in one dashboard.</p>
          <Link to="/register" className="mt-4 inline-block rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800">
            Register as a landlord
          </Link>
        </div>
        <div className="rounded-lg bg-slate-100 p-6">
          <h2 className="text-xl font-bold">For tenants</h2>
          <p className="mt-1 text-sm text-slate-700">Find a home, report issues and see your rent history.</p>
          <Link to="/register" className="mt-4 inline-block rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800">
            Register as a tenant
          </Link>
        </div>
      </section>
    </>
  )
}

export default HomePage
