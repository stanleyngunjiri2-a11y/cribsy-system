import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import PageHeading from '../../components/shared/PageHeading'
import SampleDataNotice from '../../components/shared/SampleDataNotice'
import StatusBadge from '../../components/shared/StatusBadge'
import { formatDate, formatKES } from '../../utils/format'
import { paymentTone, rentRecords, tenancy, tenantMaintenance, tenantProfile } from './tenantData'

function TenantDashboardPage() {
  const recent = rentRecords.slice(0, 3)

  return (
    <>
      <PageHeading title={`Welcome, ${tenantProfile.fullName.split(' ')[0]}`} description="Your home, rent and maintenance at a glance." />
      <SampleDataNotice />

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white lg:col-span-2">
          <div role="img" aria-label={`Photo placeholder for ${tenancy.propertyName}`}
            className="flex h-40 items-center justify-center bg-emerald-50 text-emerald-700">
            <Home size={36} />
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold">{tenancy.propertyName}</h2>
            <p className="text-sm text-slate-600">{tenancy.location}</p>
            <dl className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
              <div><dt className="text-slate-500">Monthly rent</dt><dd className="font-semibold text-emerald-800">{formatKES(tenancy.monthlyRent)}</dd></div>
              <div><dt className="text-slate-500">Lease starts</dt><dd className="font-medium">{formatDate(tenancy.leaseStart)}</dd></div>
              <div><dt className="text-slate-500">Lease ends</dt><dd className="font-medium">{formatDate(tenancy.leaseEnd)}</dd></div>
              <div><dt className="text-slate-500">Landlord</dt><dd className="font-medium">{tenancy.landlordName}</dd></div>
            </dl>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="font-semibold">Maintenance requests</h2>
          <ul className="mt-3 flex flex-col gap-3">
            {tenantMaintenance.map((m) => (
              <li key={m.id} className="flex items-center justify-between gap-2 text-sm">
                <span>{m.issue}</span>
                <StatusBadge tone={paymentTone(m.status)}>{m.status}</StatusBadge>
              </li>
            ))}
          </ul>
          <Link to="/tenant/maintenance/new" className="mt-4 inline-block text-sm text-emerald-700 underline">Report an issue</Link>
        </section>
      </div>

      <section className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent rent records</h2>
          <Link to="/tenant/rent-history" className="text-sm text-emerald-700 underline">View all</Link>
        </div>
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr><th className="px-4 py-2">Date</th><th className="px-4 py-2">Amount</th><th className="px-4 py-2">Status</th></tr>
            </thead>
            <tbody>
              {recent.map((r) => (
                <tr key={r.id} className="border-t border-slate-100">
                  <td className="px-4 py-2">{formatDate(r.date)}</td>
                  <td className="px-4 py-2">{formatKES(r.amount)}</td>
                  <td className="px-4 py-2"><StatusBadge tone={paymentTone(r.status)}>{r.status}</StatusBadge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default TenantDashboardPage
