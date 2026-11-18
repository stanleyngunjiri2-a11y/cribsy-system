import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import PageHeading from '../../components/shared/PageHeading'
import StatusBadge from '../../components/shared/StatusBadge'
import { formatDate, formatKES } from '../../utils/format'
import { tenantAPI } from '../../services/api'

function statusTone(status) {
  const value = String(status || '').toLowerCase()
  if (['paid', 'resolved'].includes(value)) return 'green'
  if (['pending', 'in_progress'].includes(value)) return 'amber'
  if (['overdue', 'rejected'].includes(value)) return 'red'
  return 'slate'
}

function TenantDashboardPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    tenantAPI.dashboard()
      .then((result) => {
        if (active) setData(result)
      })
      .catch((err) => {
        if (active) setError(err.message || 'Unable to load your dashboard.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  if (loading) return <p className="p-6 text-sm text-slate-500">Loading your dashboard...</p>

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-white p-6">
        <h2 className="font-semibold text-red-700">Unable to load dashboard</h2>
        <p className="mt-2 text-sm text-slate-600">{error}</p>
      </div>
    )
  }

  const tenancy = data?.tenancy
  const property = tenancy?.property
  const payments = data?.recent_payments || []
  const maintenance = data?.maintenance_requests || []

  return (
    <>
      <PageHeading
        title="Welcome back"
        description="Your home, rent and maintenance at a glance."
      />

      {!tenancy ? (
        <section className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="font-semibold">No active tenancy found</h2>
          <p className="mt-2 text-sm text-slate-600">
            Your property and rent information will appear here once a landlord assigns you to a property.
          </p>
          <Link to="/properties" className="mt-4 inline-block text-sm text-emerald-700 underline">
            Browse properties
          </Link>
        </section>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          <section className="overflow-hidden rounded-lg border border-slate-200 bg-white lg:col-span-2">
            <div role="img" aria-label={`Photo of ${property?.name || 'your property'}`}
              className="flex h-40 items-center justify-center overflow-hidden bg-emerald-50 text-emerald-700">
              {property?.image_url ? (
                <img src={property.image_url} alt={property.name} className="h-full w-full object-cover" />
              ) : (
                <Home size={36} />
              )}
            </div>

            <div className="p-4">
              <h2 className="text-lg font-semibold">{property?.name || 'Your property'}</h2>
              <p className="text-sm text-slate-600">{property?.location || 'Location unavailable'}</p>

              <dl className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                <div>
                  <dt className="text-slate-500">Monthly rent</dt>
                  <dd className="font-semibold text-emerald-800">{formatKES(tenancy.monthly_rent)}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Lease starts</dt>
                  <dd className="font-medium">{formatDate(tenancy.start_date)}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Lease ends</dt>
                  <dd className="font-medium">{formatDate(tenancy.end_date)}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Landlord</dt>
                  <dd className="font-medium">{property?.landlord_name || 'Not available'}</dd>
                </div>
              </dl>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="font-semibold">Maintenance requests</h2>

            {maintenance.length ? (
              <ul className="mt-3 flex flex-col gap-3">
                {maintenance.slice(0, 4).map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-2 text-sm">
                    <span>{item.category}</span>
                    <StatusBadge tone={statusTone(item.status)}>{item.status}</StatusBadge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-slate-500">You have no maintenance requests.</p>
            )}

            <Link to="/tenant/maintenance/new" className="mt-4 inline-block text-sm text-emerald-700 underline">
              Report an issue
            </Link>
          </section>
        </div>
      )}

      <section className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent rent records</h2>
          <Link to="/tenant/rent-history" className="text-sm text-emerald-700 underline">
            View all
          </Link>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.length ? payments.slice(0, 3).map((payment) => (
                <tr key={payment.id} className="border-t border-slate-100">
                  <td className="px-4 py-2">{formatDate(payment.paid_on)}</td>
                  <td className="px-4 py-2">{formatKES(payment.amount)}</td>
                  <td className="px-4 py-2">
                    <StatusBadge tone={statusTone(payment.status)}>{payment.status}</StatusBadge>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="3" className="px-4 py-6 text-center text-slate-500">
                    No payment records available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default TenantDashboardPage
