import { useState } from 'react'
import PageHeading from '../../components/shared/PageHeading'
import SampleDataNotice from '../../components/shared/SampleDataNotice'
import FormField from '../../components/shared/FormField'
import Button from '../../components/shared/Button'
import { tenantProfile } from './tenantData'

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

function TenantProfilePage() {
  const [values, setValues] = useState({
    fullName: tenantProfile.fullName, email: tenantProfile.email, phone: tenantProfile.phone,
  })
  const [emailNotifications, setEmailNotifications] = useState(tenantProfile.emailNotifications)
  const [editing, setEditing] = useState(false)
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const next = {}
    if (values.fullName.trim().length < 2) next.fullName = 'Enter your full name.'
    if (!isEmail(values.email)) next.email = 'Enter a valid email address.'
    if (values.phone.trim().length < 9) next.phone = 'Enter a valid phone number.'
    setErrors(next)
    if (Object.keys(next).length === 0) {
      setSaved(true)
      setEditing(false)
    }
  }

  return (
    <>
      <PageHeading title="Profile" description="Your personal information and account settings." />
      <SampleDataNotice />

      <section className="max-w-xl rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="font-semibold">Personal information</h2>

        {editing ? (
          <form onSubmit={handleSubmit} noValidate className="mt-4 flex flex-col gap-4">
            <FormField id="fullName" name="fullName" label="Full name" value={values.fullName} onChange={handleChange} error={errors.fullName} />
            <FormField id="email" name="email" label="Email" type="email" value={values.email} onChange={handleChange} error={errors.email} />
            <FormField id="phone" name="phone" label="Phone number" type="tel" value={values.phone} onChange={handleChange} error={errors.phone} />
            <div className="flex gap-2">
              <Button type="submit">Save changes</Button>
              <Button type="button" variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
            </div>
          </form>
        ) : (
          <>
            <dl className="mt-4 divide-y divide-slate-100 text-sm">
              <div className="flex justify-between py-2"><dt className="text-slate-500">Full name</dt><dd className="font-medium">{values.fullName}</dd></div>
              <div className="flex justify-between py-2"><dt className="text-slate-500">Email</dt><dd className="font-medium">{values.email}</dd></div>
              <div className="flex justify-between py-2"><dt className="text-slate-500">Phone</dt><dd className="font-medium">{values.phone}</dd></div>
            </dl>
            <div className="mt-4"><Button variant="outline" onClick={() => { setEditing(true); setSaved(false) }}>Edit profile</Button></div>
          </>
        )}

        {saved && (
          <p role="status" className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800">
            The changes are valid, but they were not saved to a server because the backend is not connected yet.
          </p>
        )}
      </section>

      <section className="mt-6 max-w-xl rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="font-semibold">Account settings</h2>
        <label className="mt-4 flex items-center gap-3 text-sm">
          <input type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} />
          Send me email notifications about rent and maintenance
        </label>
      </section>
    </>
  )
}

export default TenantProfilePage
