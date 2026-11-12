import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PropertyImage from './PropertyImage'
import StateMessage from '../../components/shared/StateMessage'
import SampleDataNotice from '../../components/shared/SampleDataNotice'
import StatusBadge from '../../components/shared/StatusBadge'
import TextAreaField from '../../components/shared/TextAreaField'
import Button from '../../components/shared/Button'
import { formatKES } from '../../utils/format'
import { propertiesData } from './propertiesData'

function PropertyDetailsPage() {
  const { id } = useParams()
  const property = propertiesData.find((p) => p.id === id)
  const [showEnquiry, setShowEnquiry] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  if (!property) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-8">
        <StateMessage title="Property not found" message="This property does not exist or was removed." />
        <Link to="/properties" className="mt-4 inline-block text-emerald-700 underline">Back to properties</Link>
      </section>
    )
  }

  function handleEnquiry(e) {
    e.preventDefault()
    if (message.trim().length < 10) {
      setError('Write at least 10 characters.')
      setSent(false)
      return
    }
    setError('')
    setSent(true)
  }
  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <Link to="/properties" className="text-sm text-emerald-700 underline">Back to properties</Link>
      <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <PropertyImage name={property.name} className="h-56" />
        <div className="p-6">
          <SampleDataNotice />
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h1 className="text-2xl font-bold">{property.name}</h1>
            <StatusBadge tone={property.available ? 'green' : 'slate'}>
              {property.available ? 'Available' : 'Unavailable'}
            </StatusBadge>
          </div>
          <p className="text-slate-600">{property.location}</p>
          <p className="mt-2 text-xl font-semibold text-emerald-800">{formatKES(property.rent)} / month</p>

          <dl className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div><dt className="text-slate-500">Type</dt><dd className="font-medium">{property.type}</dd></div>
            <div><dt className="text-slate-500">Bedrooms</dt><dd className="font-medium">{property.bedrooms}</dd></div>
            <div><dt className="text-slate-500">Bathrooms</dt><dd className="font-medium">{property.bathrooms}</dd></div>
          </dl>

          <h2 className="mt-6 font-semibold">Description</h2>
          <p className="text-sm text-slate-700">{property.description}</p>

          <h2 className="mt-6 font-semibold">Amenities</h2>
          <ul className="mt-1 flex flex-wrap gap-2">
            {property.amenities.map((a) => (
              <li key={a} className="rounded bg-slate-100 px-2 py-1 text-sm">{a}</li>
            ))}
          </ul>

          <div className="mt-8">
            <Button onClick={() => setShowEnquiry(!showEnquiry)}>
              {showEnquiry ? 'Close enquiry' : 'Enquire about this property'}
            </Button>
          </div>

          {showEnquiry && (
            <form onSubmit={handleEnquiry} noValidate className="mt-4 flex flex-col gap-3">
              <TextAreaField id="enquiry" label="Your message" value={message}
                onChange={(e) => setMessage(e.target.value)} error={error} />
              <div><Button type="submit">Send enquiry</Button></div>
              {sent && (
                <p role="status" className="rounded-md bg-amber-50 p-3 text-sm text-amber-800">
                  Preview only: your enquiry was not sent because the backend is not connected yet.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default PropertyDetailsPage
