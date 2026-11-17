import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageHeading from '../../components/shared/PageHeading'
import SampleDataNotice from '../../components/shared/SampleDataNotice'

function NewMaintenanceRequestPage() {
  const [form, setForm] = useState({ category: 'Plumbing', subject: '', description: '', urgency: 'Normal' })
  const [message, setMessage] = useState('')

  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function submit(event) {
    event.preventDefault()
    setMessage('Your form is valid. Submitting maintenance requests will be enabled after backend integration.')
  }

  return (
    <>
      <Link to="/tenant/maintenance" className="mb-5 inline-flex items-center gap-2 text-sm text-muted"><ArrowLeft size={16} /> Back to maintenance</Link>
      <PageHeading title="Report a maintenance issue" description="Provide details to help your landlord understand the problem." />
      <SampleDataNotice />

      <form onSubmit={submit} className="surface-card max-w-2xl space-y-5 p-6">
        <label className="form-label">Issue category
          <select name="category" className="form-control mt-2" value={form.category} onChange={update}>
            <option>Plumbing</option><option>Electrical</option><option>Structural</option><option>Security</option><option>Other</option>
          </select>
        </label>
        <label className="form-label">Issue title *
          <input name="subject" className="form-control mt-2" value={form.subject} onChange={update} placeholder="e.g. Leaking kitchen tap" required />
        </label>
        <label className="form-label">Description *
          <textarea name="description" className="form-control mt-2" rows="5" value={form.description} onChange={update} placeholder="Describe the issue and where it is happening." required />
        </label>
        <label className="form-label">Urgency
          <select name="urgency" className="form-control mt-2" value={form.urgency} onChange={update}>
            <option>Normal</option><option>High</option><option>Urgent</option>
          </select>
        </label>
        {message && <p role="status" className="border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">{message}</p>}
        <button type="submit" className="btn btn-primary">Submit request</button>
      </form>
    </>
  )
}

export default NewMaintenanceRequestPage
