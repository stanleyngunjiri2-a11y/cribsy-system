// OWNER: Member 6 - Lynn. Tenant submits a maintenance request.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeading from '../../components/shared/PageHeading'
import SelectField from '../../components/shared/SelectField'
import TextAreaField from '../../components/shared/TextAreaField'
import Button from '../../components/shared/Button'
import PhotoUpload from './PhotoUpload'
import { categories } from './maintenanceData'

function NewMaintenanceRequestPage() {
  const [category, setCategory] = useState(categories[0])
  const [description, setDescription] = useState('')
  const [photos, setPhotos] = useState([])
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (description.trim().length < 15) {
      setError('Describe the problem in at least 15 characters.')
      setDone(false)
      return
    }
    setError('')
    setDone(true)
  }

  return (
    <section className="mx-auto max-w-2xl">
      <Link to="/tenant/maintenance" className="text-sm text-emerald-700 underline">Back to my requests</Link>
      <div className="mt-2"><PageHeading title="New maintenance request" description="Tell your landlord what needs fixing." /></div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 md:p-6">
        <SelectField id="category" label="Category" value={category} onChange={(e) => setCategory(e.target.value)} options={categories} />
        <TextAreaField id="description" label="Describe the problem" value={description}
          onChange={(e) => setDescription(e.target.value)} error={error} />
        <PhotoUpload onChange={setPhotos} />
        <div><Button type="submit">Submit request</Button></div>
        {done && (
          <p role="status" className="rounded-md bg-amber-50 p-3 text-sm text-amber-800">
            The request is valid ({photos.length} photo{photos.length === 1 ? '' : 's'} selected), but it was not sent because the backend is not connected yet.
          </p>
        )}
      </form>
    </section>
  )
}

export default NewMaintenanceRequestPage
