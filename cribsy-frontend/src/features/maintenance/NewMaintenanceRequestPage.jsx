import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageHeading from '../../components/shared/PageHeading'
import { tenantAPI, uploadAPI } from '../../services/api'

export default function NewMaintenanceRequestPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ category: 'Plumbing', description: '' })
  const [photo, setPhoto] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function update(event) {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }))
  }

  async function submit(event) {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      const photo_urls = []
      if (photo) {
        const uploaded = await uploadAPI.image(photo)
        if (uploaded?.url) photo_urls.push(uploaded.url)
      }
      await tenantAPI.createMaintenance({ ...form, photo_urls })
      navigate('/tenant/maintenance')
    } catch (err) {
      setError(err.message || 'Unable to submit your maintenance request.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <Link to="/tenant/maintenance" className="mb-5 inline-flex items-center gap-2 text-sm text-muted"><ArrowLeft size={16} /> Back to maintenance</Link>
      <PageHeading title="Report a maintenance issue" description="Provide details to help your landlord understand the problem." />
      <form onSubmit={submit} className="surface-card max-w-2xl space-y-5 p-6">
        <label className="form-label">Issue category
          <select name="category" className="form-control mt-2" value={form.category} onChange={update}>
            <option>Plumbing</option><option>Electrical</option><option>Structural</option><option>Security</option><option>Other</option>
          </select>
        </label>
        <label className="form-label">Description
          <textarea name="description" className="form-control mt-2" rows="5" minLength={15} value={form.description} onChange={update} placeholder="Describe the issue and where it is happening." required />
        </label>
        <label className="form-label">Attach a photo (optional)
          <input type="file" accept="image/jpeg,image/png,image/webp" className="form-control mt-2" onChange={event => setPhoto(event.target.files?.[0] || null)} />
          <span className="mt-1 block text-xs text-muted">JPEG, PNG or WebP. Maximum 6 MB.</span>
        </label>
        {error && <p role="alert" className="bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <button disabled={saving} type="submit" className="btn btn-primary">{saving ? 'Submitting...' : 'Submit request'}</button>
      </form>
    </>
  )
}
