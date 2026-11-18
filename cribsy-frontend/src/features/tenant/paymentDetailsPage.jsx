import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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

function PaymentDetailsPage() {
  const { id } = useParams()
  const [record, setRecord] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    tenantAPI.payment(id)
      .then((result) => {
        if (active) setRecord(result)
      })
      .catch((err) => {
        if (active) setError(err.message || 'Unable to load this payment.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [id])

  if (loading) return <p className="py-8 text-sm text-slate-500">Loading payment details...</p>

  if (!record) {
    return (
      <>
        <StateMessage title="Payment record not found" message={error || 'This record does not exist.'} />
        <Link to="/tenant/rent-history" className="mt-4 inline-block text-emerald-700 underline">
          Back to rent history
        </Link>
      </>
    )
  }

  const rows = [
    ['Reference', record.reference || 'Not provided'],
    ['Date', formatDate(record.paid_on)],
    ['Amount', formatKES(record.amount)],
    ['Payment method', record.method || 'Not provided'],
    ['Property', record.property_name || 'Not available'],
  ]

  return (
    <>
      <Link to="/tenant/rent-history" className="text-sm text-emerald-700 underline">
        Back to rent history
      </Link>
      <div className="mt-2">
        <PageHeading title="Payment details" />
      </div>

      <div className="max-w-xl rounded-lg border border-slate-200 bg-white p-4">
        <dl className="divide-y divide-slate-100 text-sm">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 py-2">
              <dt className="text-slate-500">{label}</dt>
              <dd className="text-right font-medium">{value}</dd>
            </div>
          ))}
          <div className="flex justify-between gap-4 py-2">
            <dt className="text-slate-500">Status</dt>
            <dd>
              <StatusBadge tone={statusTone(record.status)}>{record.status}</StatusBadge>
            </dd>
          </div>
        </dl>
      </div>
    </>
  )
}

export default PaymentDetailsPage
