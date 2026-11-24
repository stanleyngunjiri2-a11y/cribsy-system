import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Save } from 'lucide-react'
import PageHeading from '../../components/shared/PageHeading'
import { landlordAPI, uploadAPI } from '../../services/api'
import { preparePropertyImage } from '../../utils/imageUpload'

export default function EditPropertyPage() {
  const { id } = useParams()
  const [form, setForm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState('')

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!image) { setImagePreview(''); return undefined }
    const preview = URL.createObjectURL(image)
    setImagePreview(preview)
    return () => URL.revokeObjectURL(preview)
  }, [image])

  useEffect(() => {
    landlordAPI.property(id)
      .then(property => setForm({
        name: property.name || '',
        location: property.location || '',
        property_type: property.property_type || 'Apartment',
        monthly_rent: property.monthly_rent ?? '',
        bedrooms: property.bedrooms ?? 0,
        bathrooms: property.bathrooms ?? 0,
        description: property.description || '',
        availability: property.availability || 'vacant',
        image_url: property.image_url || '',
        amenities: Array.isArray(property.amenities) ? property.amenities.join(', ') : '',
      }))
      .catch(err => setError(err.message || 'Unable to load this property.'))
      .finally(() => setLoading(false))
  }, [id])

  function update(event) {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }))
    setError('')
    setSuccess('')
  }

  async function submit(event) {
    event.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      let imageUrl = form.image_url.trim()
      if (image) {
        const uploaded = await uploadAPI.image(await preparePropertyImage(image))
        if (typeof uploaded?.url !== 'string' || !uploaded.url.trim()) throw new Error('The image upload did not return an image URL.')
        imageUrl = uploaded.url.trim()
      }
      await landlordAPI.updateProperty(id, {
        ...form,
        image_url: imageUrl || null,
        monthly_rent: Number(form.monthly_rent),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        amenities: form.amenities.split(',').map(item => item.trim()).filter(Boolean),
      })
      setSuccess('Property updated successfully.')
    } catch (err) {
      setError(err.message || 'Unable to update property.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="surface-card p-8 text-center text-muted">Loading property...</div>
  if (!form) return <div className="surface-card p-8"><p className="text-red-700">{error || 'Property not found.'}</p><Link to="/landlord/properties" className="btn btn-primary mt-5">Back to properties</Link></div>

  const fields = [
    ['name', 'Property name', 'text'],
    ['location', 'Location', 'text'],
    ['monthly_rent', 'Monthly rent (KES)', 'number'],
    ['bedrooms', 'Bedrooms', 'number'],
    ['bathrooms', 'Bathrooms', 'number'],
  ]

  return (
    <>
      <Link to="/landlord/properties" className="mb-5 inline-flex items-center gap-2 text-sm text-muted hover:text-brand-800"><ArrowLeft size={16} /> Back to properties</Link>
      <PageHeading title="Edit property" description="Update your property information." />
      <form onSubmit={submit} className="surface-card max-w-2xl space-y-5 p-6">
        {fields.map(([name, label, type]) => (
          <label key={name} className="block">
            <span className="mb-2 block text-sm font-medium text-ink">{label}</span>
            <input required={['name', 'location', 'monthly_rent'].includes(name)} min={type === 'number' ? 0 : undefined} type={type} name={name} value={form[name]} onChange={update} className="form-input w-full" />
          </label>
        ))}
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink">Cloudinary image URL</span>
          <input type="url" name="image_url" value={form.image_url} onChange={event => { update(event); setImage(null) }} className="form-input w-full" placeholder="https://res.cloudinary.com/..." />
          <span className="mt-1 block text-xs text-muted">Enter a Cloudinary URL or choose a replacement image below.</span>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink">Replace image from your computer</span>
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={event => { setImage(event.target.files?.[0] || null); if (event.target.files?.[0]) setForm(current => ({ ...current, image_url: '' })) }} className="form-input w-full" />
          <span className="mt-1 block text-xs text-muted">JPG, PNG, or WebP. Large images are compressed to fit the 6 MB upload limit.</span>
        </label>
        {(imagePreview || form.image_url) && <img src={imagePreview || form.image_url} alt="Property preview" className="max-h-64 max-w-full rounded-lg object-cover" />}
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink">Property type</span>
          <select name="property_type" value={form.property_type} onChange={update} className="form-input w-full">
            <option>Apartment</option><option>Bedsitter</option><option>House</option><option>Studio</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink">Availability</span>
          <select name="availability" value={form.availability} onChange={update} className="form-input w-full">
            <option value="vacant">Vacant</option><option value="occupied">Occupied</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink">Amenities (comma separated)</span>
          <input name="amenities" value={form.amenities} onChange={update} className="form-input w-full" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink">Description</span>
          <textarea required minLength={10} name="description" value={form.description} onChange={update} rows="5" className="form-input w-full" />
        </label>
        {error && <p role="alert" className="bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {success && <p role="status" className="bg-green-50 p-3 text-sm text-green-700">{success}</p>}
        <button disabled={saving} type="submit" className="btn btn-primary"><Save size={17} /> {saving ? 'Saving...' : 'Save changes'}</button>
      </form>
    </>
  )
}
