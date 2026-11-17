import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageHeading from '../../components/shared/PageHeading'
import SampleDataNotice from '../../components/shared/SampleDataNotice'

function AddPropertyPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', location: '', type: 'Apartment', bedrooms: '1', bathrooms: '1', rent: '', deposit: '', description: '' })
  const [error, setError] = useState('')

  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function submit(event) {
    event.preventDefault()
    if (!form.name.trim() || !form.location.trim() || !form.rent || !form.deposit) {
      setError('Please complete all required fields.')
      return
    }
    setError('This is a frontend preview. Property submission will work after backend integration.')
  }

  return (
    <>
      <Link to="/landlord/properties" className="mb-5 inline-flex items-center gap-2 text-sm text-muted hover:text-brand-800"><ArrowLeft size={16} /> Back to properties</Link>
      <PageHeading title="Add a property" description="Enter the details of the property you want to manage." />
      <SampleDataNotice />

      <form onSubmit={submit} className="surface-card max-w-3xl space-y-6 p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="form-label sm:col-span-2">Property name *
            <input name="name" className="form-control mt-2" value={form.name} onChange={update} placeholder="e.g. Greenview Apartments" required />
          </label>
          <label className="form-label sm:col-span-2">Location *
            <input name="location" className="form-control mt-2" value={form.location} onChange={update} placeholder="Town, county or area" required />
          </label>
          <label className="form-label">Property type
            <select name="type" className="form-control mt-2" value={form.type} onChange={update}>
              <option>Apartment</option><option>House</option><option>Bedsitter</option><option>Studio</option><option>Commercial</option>
            </select>
          </label>
          <label className="form-label">Bedrooms
            <input type="number" min="0" name="bedrooms" className="form-control mt-2" value={form.bedrooms} onChange={update} />
          </label>
          <label className="form-label">Bathrooms
            <input type="number" min="0" name="bathrooms" className="form-control mt-2" value={form.bathrooms} onChange={update} />
          </label>
          <label className="form-label">Monthly rent (KES) *
            <input type="number" min="1" name="rent" className="form-control mt-2" value={form.rent} onChange={update} required />
          </label>
          <label className="form-label">Security deposit (KES) *
            <input type="number" min="0" name="deposit" className="form-control mt-2" value={form.deposit} onChange={update} required />
          </label>
          <label className="form-label sm:col-span-2">Description
            <textarea name="description" rows="4" className="form-control mt-2" value={form.description} onChange={update} placeholder="Describe the property and its features." />
          </label>
        </div>

        {error && <p role="alert" className="border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">{error}</p>}
        <div className="flex flex-wrap gap-3">
          <button type="submit" className="btn btn-primary">Submit property</button>
          <button type="button" onClick={() => navigate('/landlord/properties')} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </>
  )
}

export default AddPropertyPage
