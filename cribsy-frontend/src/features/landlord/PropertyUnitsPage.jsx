import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PageHeading from '../../components/shared/PageHeading'
import StatusBadge from '../../components/shared/StatusBadge'
import { landlordAPI, unitAPI } from '../../services/api'

const emptyForm = { unit_number: '', monthly_rent: '', bedrooms: 0, bathrooms: 0, description: '' }

export default function PropertyUnitsPage() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [units, setUnits] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const load = useCallback(async () => {
    const [propertyData, unitData] = await Promise.all([
      landlordAPI.property(id),
      unitAPI.list(id),
    ])
    setProperty(propertyData)
    setUnits(Array.isArray(unitData) ? unitData : [])
  }, [id])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load().catch(err => setError(err.message || 'Unable to load property units.'))
      .finally(() => setLoading(false))
  }, [load])

  async function submit(event) {
    event.preventDefault()
    setSaving(true)
    setError('')
    setNotice('')
    try {
      await unitAPI.create(id, {
        ...form,
        monthly_rent: Number(form.monthly_rent),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
      })
      setForm(emptyForm)
      setNotice('Unit created successfully.')
      await load()
    } catch (err) {
      setError(err.message || 'Unable to create this unit.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <Link to="/landlord/properties" className="mb-5 inline-flex items-center gap-2 text-sm text-muted hover:text-brand-800"><ArrowLeft size={16} /> Back to properties</Link>
      <PageHeading title={property ? `${property.name}: Units` : 'Property units'} description="Create and manage the individual rentable units within this property." />
      {error && <div role="alert" className="surface-card mb-4 p-4 text-sm text-red-700">{error}</div>}
      {notice && <div role="status" className="surface-card mb-4 p-4 text-sm text-green-700">{notice}</div>}
      <section className="surface-card mb-6 p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-ink">Add a unit</h2>
        {property?.approval_status !== 'approved' && !loading && <p className="mt-2 text-sm text-amber-700">This property must be approved before units can be created.</p>}
        <form onSubmit={submit} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="form-label">Unit number / name
            <input required maxLength={80} className="form-control mt-2" value={form.unit_number} onChange={e => setForm({ ...form, unit_number: e.target.value })} placeholder="e.g. A1, House 2, Room 04" />
          </label>
          <label className="form-label">Monthly rent (KES)
            <input required min="1" type="number" className="form-control mt-2" value={form.monthly_rent} onChange={e => setForm({ ...form, monthly_rent: e.target.value })} />
          </label>
          <label className="form-label">Bedrooms
            <input min="0" type="number" className="form-control mt-2" value={form.bedrooms} onChange={e => setForm({ ...form, bedrooms: e.target.value })} />
          </label>
          <label className="form-label">Bathrooms
            <input min="0" type="number" className="form-control mt-2" value={form.bathrooms} onChange={e => setForm({ ...form, bathrooms: e.target.value })} />
          </label>
          <label className="form-label sm:col-span-2">Description (optional)
            <textarea rows="3" className="form-control mt-2" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </label>
          <button disabled={saving || loading || property?.approval_status !== 'approved'} className="btn btn-primary w-fit disabled:opacity-50">{saving ? 'Creating unit...' : 'Create unit'}</button>
        </form>
      </section>
      <section>
        <h2 className="mb-3 text-lg font-semibold text-ink">Units ({units.length})</h2>
        {loading ? <div className="surface-card p-6 text-muted">Loading units...</div>
          : units.length ? <div className="surface-card overflow-x-auto"><table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-slate-50 text-muted"><tr><th className="px-5 py-4">Unit</th><th className="px-5 py-4">Bedrooms</th><th className="px-5 py-4">Bathrooms</th><th className="px-5 py-4">Monthly rent</th><th className="px-5 py-4">Status</th></tr></thead>
            <tbody>{units.map(unit => <tr key={unit.id} className="border-t border-border"><td className="px-5 py-4 font-semibold">{unit.unit_number}</td><td className="px-5 py-4">{unit.bedrooms}</td><td className="px-5 py-4">{unit.bathrooms}</td><td className="px-5 py-4">KES {Number(unit.monthly_rent).toLocaleString('en-KE')}</td><td className="px-5 py-4"><StatusBadge tone={unit.status === 'available' ? 'green' : 'amber'}>{unit.status}</StatusBadge></td></tr>)}</tbody>
          </table></div> : <div className="surface-card p-6 text-sm text-muted">No units have been created for this property yet.</div>}
      </section>
    </>
  )
}
