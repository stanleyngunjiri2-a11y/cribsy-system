import { Link } from 'react-router-dom'
import PageHeading from '../../components/shared/PageHeading'
import StateMessage from '../../components/shared/StateMessage'
import SampleDataNotice from '../../components/shared/SampleDataNotice'
import StatusBadge from '../../components/shared/StatusBadge'
import { formatDate, formatKES } from '../../utils/format'
import { paymentTone, rentRecords } from './tenantData'

function RentHistoryPage() {
  return (
    <>
      <PageHeading title="Rent history" description="Your payment records for this tenancy." />
      <SampleDataNotice />

      {rentRecords.length === 0 ? (
        <StateMessage title="No payment records" message="Your rent records will appear here." />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Reference</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2"><span className="sr-only">Details</span></th>
              </tr>
            </thead>
            <tbody>
              {rentRecords.map((r) => (
                <tr key={r.id} className="border-t border-slate-100">
                  <td className="px-4 py-2">{formatDate(r.date)}</td>
                  <td className="px-4 py-2">{formatKES(r.amount)}</td>
                  <td className="px-4 py-2">{r.reference}</td>
                  <td className="px-4 py-2"><StatusBadge tone={paymentTone(r.status)}>{r.status}</StatusBadge></td>
                  <td className="px-4 py-2"><Link className="text-emerald-700 underline" to={`/tenant/rent-history/${r.id}`}>Details</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default RentHistoryPage
