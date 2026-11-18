import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeading from '../../components/shared/PageHeading'
import StateMessage from '../../components/shared/StateMessage'
import StatusBadge from '../../components/shared/StatusBadge'
import { formatDate, formatKES } from '../../utils/format'
import { tenantAPI } from '../../services/api'

function statusTone(status) {
  const value = String(status || '').toLowerCase()
  if (value === 'paid') return 'green'
  if (value === 'pending') return 'amber'
  if (value === 'overdue') return 'red'
  return 'slate'
}

function RentHistoryPage() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    tenantAPI.payments()
      .then((result) => {
        if (active) setPayments(Array.isArray(result) ? result : [])
      })
      .catch((err) => {
        if (active) setError(err.message || 'Unable to load payment history.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <PageHeading title="Rent history" description="Your payment records for this tenancy." />

      {loading ? (
        <p className="py-8 text-sm text-slate-500">Loading payment history...</p>
      ) : error ? (
        <StateMessage title="Unable to load payments" message={error} />
      ) : payments.length === 0 ? (
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
              {payments.map((payment) => (
                <tr key={payment.id} className="border-t border-slate-100">
                  <td className="px-4 py-2">{formatDate(payment.paid_on)}</td>
                  <td className="px-4 py-2">{formatKES(payment.amount)}</td>
                  <td className="px-4 py-2">{payment.reference || 'Not provided'}</td>
                  <td className="px-4 py-2">
                    <StatusBadge tone={statusTone(payment.status)}>{payment.status}</StatusBadge>
                  </td>
                  <td className="px-4 py-2">
                    <Link className="text-emerald-700 underline" to={`/tenant/rent-history/${payment.id}`}>
                      Details
                    </Link>
                  </td>
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
