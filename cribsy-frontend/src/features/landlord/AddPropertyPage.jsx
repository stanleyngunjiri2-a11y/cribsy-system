import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageHeading from '../../components/shared/PageHeading'
import { landlordAPI, uploadAPI } from '../../services/api'

const MAX_IMAGE_SIZE = 2 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export default function AddPropertyPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', location: '', property_type: 'Apartment',
    bedrooms: '1', bathrooms: '1', monthly_rent: '',
    description: '',
  })
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = e => setForm({ ...form, [e.target.name]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    setError('')

    const directImageUrl = imageUrl.trim()
    if (image && directImageUrl) {
      setError('Choose either an image file or an image URL, not both.')
      return
    }

    if (image && !ALLOWED_IMAGE_TYPES.includes(image.type)) {
      setError('Choose a JPG, PNG, or WebP image.')
      return
    }

    if (image && image.size > MAX_IMAGE_SIZE) {
      setError('The image must be 2 MB or smaller.')
      return
    }

    if (directImageUrl) {
      try {
        const parsedUrl = new URL(directImageUrl)
        if (parsedUrl.protocol !== 'https:' || parsedUrl.username || parsedUrl.password) {
          throw new Error('Invalid protocol')
        }
      } catch {
        setError('Enter a valid HTTPS image URL without embedded credentials.')
        return
      }
    }

    setLoading(true)
    try {
      let image_url = directImageUrl || null

      if (image) {
        const uploaded = await uploadAPI.image(image)
        if (typeof uploaded?.url !== 'string' || !uploaded.url.trim()) {
          throw new Error('The image upload did not return an image URL. Try another image or enter an image URL instead.')
        }
        image_url = uploaded.url.trim()
      }

      await landlordAPI.createProperty({
        ...form,
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        monthly_rent: Number(form.monthly_rent),
        image_url,
        amenities: [],
      })

      navigate('/landlord/properties')
    } catch (err) {
      setError(err.message || 'Unable to create property.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Link to="/landlord/properties" className="mb-5 inline-flex items-center gap-2 text-sm text-muted">
        <ArrowLeft size={16} /> Back to properties
      </Link>

      <PageHeading title="Add a property" description="Enter the details of your property." />

      <form onSubmit={submit} className="surface-card max-w-3xl space-y-6 p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="form-label sm:col-span-2">Property name *
            <input name="name" className="form-control mt-2" value={form.name} onChange={update} required />
          </label>

          <label className="form-label sm:col-span-2">Location *
            <input name="location" className="form-control mt-2" value={form.location} onChange={update} required />
          </label>

          <label className="form-label">Property type
            <select name="property_type" className="form-control mt-2" value={form.property_type} onChange={update}>
              <option>Apartment</option>
              <option>House</option>
              <option>Bedsitter</option>
              <option>Studio</option>
            </select>
          </label>

          <label className="form-label">Bedrooms
            <input type="number" min="0" name="bedrooms" className="form-control mt-2" value={form.bedrooms} onChange={update} />
          </label>

          <label className="form-label">Bathrooms
            <input type="number" min="0" name="bathrooms" className="form-control mt-2" value={form.bathrooms} onChange={update} />
          </label>

          <label className="form-label">Monthly rent (KES) *
            <input type="number" min="1" name="monthly_rent" className="form-control mt-2" value={form.monthly_rent} onChange={update} required />
          </label>

          <label className="form-label sm:col-span-2">Cloudinary image URL (optional)
            <input type="url" name="imageUrl" className="form-control mt-2"
              value={imageUrl} onChange={e => setImageUrl(e.target.value)}
              placeholder="https://res.cloudinary.com/..." />
            <span className="text-xs text-muted">On the production server, direct image URLs must be from the configured Cloudinary account.</span>
          </label>

          <label className="form-label sm:col-span-2">Or upload a property image
            <input type="file" accept="image/jpeg,image/png,image/webp" className="form-control mt-2"
              onChange={e => setImage(e.target.files?.[0] || null)} />
            <span className="text-xs text-muted">JPG, PNG, or WebP; maximum size: 2 MB. Use either a URL or a file.</span>
          </label>

          <label className="form-label sm:col-span-2">Description *
            <textarea name="description" rows="4" minLength="10" className="form-control mt-2"
              value={form.description} onChange={update} required />
          </label>
        </div>

        {error && <p role="alert" className="border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Submitting...' : 'Submit property'}
          </button>
          <button type="button" onClick={() => navigate('/landlord/properties')} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </>
  )
}
