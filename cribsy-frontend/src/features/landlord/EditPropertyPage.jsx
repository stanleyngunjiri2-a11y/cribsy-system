import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import PageHeading from '../../components/shared/PageHeading'
import SampleDataNotice from '../../components/shared/SampleDataNotice'
import { landlordProperties, landlordKES } from './landlordData'

function EditPropertyPage() {
  const { id } = useParams()
  const property = landlordProperties.find((item) => String(item.id) === id)
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState(() => property ? {
    name: property.name,
    location: property.location,
    units: property.units,
    occupied: property.occupied,
    rent: property.rent,
    status: property.status,
  } : null)

  if (!property || !form) {
    return (
      <div className="surface-card p-8">
        <h1 className="page-title">Property not found</h1>
        <Link to="/landlord/properties" className="btn btn-primary mt-5">Back to properties</Link>
      </div>
    )
  }

  function updateField(event) {
    setSaved(false)
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSaved(true)
  }

  const fields = [
    { name: 'name', label: 'Property name', type: 'text' },
    { name: 'location', label: 'Location', type: 'text' },
    { name: 'units', label: 'Total units', type: 'number' },
    { name: 'occupied', label: 'Occupied units', type: 'number' },
    { name: 'rent', label: 'Monthly rent per unit (KES)', type: 'number' },
  ]

  return (
    <>
      <Link to="/landlord/properties" className="mb-5 inline-flex items-center gap-2 text-sm text-muted hover:text-brand-800">
        <ArrowLeft size={16} /> Back to properties
      </Link>

      <PageHeading
        title="Edit property"
        description={`Update the information for ${property.name}.`}
      />

      <SampleDataNotice />

      <form onSubmit={handleSubmit} className="surface-card max-w-2xl p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          {fields.map((field) => (
            <label key={field.name} className="block">
              <span className="mb-2 block text-sm font-medium text-ink">{field.label}</span>
              <input
                required
                min={field.type === 'number' ? 0 : undefined}
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={updateField}
                className="form-input w-full"
              />
            </label>
          ))}

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-ink">Property status</span>
            <select
              name="status"
              value={form.status}
              onChange={updateField}
              className="form-input w-full"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>
        </div>

        <div className="mt-6 border-t border-border pt-5">
          <p className="text-sm text-muted">
            Current monthly rent: {landlordKES(property.rent)}
          </p>

          {saved && (
            <div role="status" className="mt-4 border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              Your changes are ready in this preview. Connect the backend API to save them permanently.
            </div>
          )}

          <button type="submit" className="btn btn-primary mt-5">
            <Save size={17} /> Preview changes
          </button>
        </div>
      </form>
    </>
  )
}

export default EditPropertyPage
