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