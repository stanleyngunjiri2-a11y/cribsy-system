import { Link, useParams } from 'react-router-dom'
import PageHeading from '../../components/shared/PageHeading'
import StateMessage from '../../components/shared/StateMessage'
import SampleDataNotice from '../../components/shared/SampleDataNotice'
import StatusBadge from '../../components/shared/StatusBadge'
import { formatDate, formatKES } from '../../utils/format'
import { paymentTone, rentRecords, tenancy } from './tenantData'

function PaymentDetailsPage() {
  const { id } = useParams()
  const record = rentRecords.find((r) => r.id === id)

  if (!record) {
    return (
      <>
        <StateMessage title="Payment record not found" message="This record does not exist." />
        <Link to="/tenant/rent-history" className="mt-4 inline-block text-emerald-700 underline">Back to rent history</Link>
      </>
    )
  }

  const rows = [
    ['Reference', record.reference],
    ['Date', formatDate(record.date)],
    ['Amount', formatKES(record.amount)],
    ['Payment method', record.method],
    ['Property', tenancy.propertyName],
  ]

  return (
    <>
      <Link to="/tenant/rent-history" className="text-sm text-emerald-700 underline">Back to rent history</Link>
      <div className="mt-2"><PageHeading title="Payment details" /></div>
      <SampleDataNotice />

      <div className="max-w-xl rounded-lg border border-slate-200 bg-white p-4">
        <dl className="divide-y divide-slate-100 text-sm">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 py-2">
              <dt className="text-slate-500">{label}</dt>
              <dd className="font-medium">{value}</dd>
            </div>
          ))}
          <div className="flex justify-between gap-4 py-2">
            <dt className="text-slate-500">Status</dt>
            <dd><StatusBadge tone={paymentTone(record.status)}>{record.status}</StatusBadge></dd>
          </div>
        </dl>
      </div>
    </>
  )
}

export default PaymentDetailsPage
