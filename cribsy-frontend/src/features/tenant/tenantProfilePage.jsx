import { useEffect, useState } from 'react'
import PageHeading from '../../components/shared/PageHeading'
import FormField from '../../components/shared/FormField'
import Button from '../../components/shared/Button'
import { useAuth } from '../../context/AuthContext'

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

function TenantProfilePage() {
  const { user, updateProfile } = useAuth()

  const [values, setValues] = useState({
    fullName: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  })

  const [emailNotifications, setEmailNotifications] = useState(
    Boolean(user?.email_notifications)
  )
  const [editing, setEditing] = useState(false)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [messageError, setMessageError] = useState(false)

  useEffect(() => {
    setValues({
      fullName: user?.full_name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    })
    setEmailNotifications(Boolean(user?.email_notifications))
  }, [user])

  function handleChange(event) {
    setValues((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const next = {}

    if (values.fullName.trim().length < 2) next.fullName = 'Enter your full name.'
    if (!isEmail(values.email)) next.email = 'Enter a valid email address.'
    if (values.phone.trim().length < 9) next.phone = 'Enter a valid phone number.'

    setErrors(next)
    setMessage('')

    if (Object.keys(next).length) return

    setSaving(true)

    try {
      await updateProfile({
        full_name: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
      })

      setEditing(false)
      setMessageError(false)
      setMessage('Your profile has been updated successfully.')
    } catch (err) {
      setMessageError(true)
      setMessage(err.message || 'Unable to update your profile.')
      if (err.data?.fields) {
        setErrors((current) => ({
          ...current,
          fullName: err.data.fields.full_name,
          email: err.data.fields.email,
          phone: err.data.fields.phone,
        }))
      }
    } finally {
      setSaving(false)
    }
  }

  async function saveNotificationPreference(event) {
    const checked = event.target.checked
    setEmailNotifications(checked)
    setMessage('')

    try {
      await updateProfile({ email_notifications: checked })
      setMessageError(false)
      setMessage('Notification preferences saved.')
    } catch (err) {
      setEmailNotifications(!checked)
      setMessageError(true)
      setMessage(err.message || 'Unable to save notification preferences.')
    }
  }

  return (
    <>
      <PageHeading title="Profile" description="Your personal information and account settings." />

      <section className="max-w-xl rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="font-semibold">Personal information</h2>

        {editing ? (
          <form onSubmit={handleSubmit} noValidate className="mt-4 flex flex-col gap-4">
            <FormField
              id="fullName"
              name="fullName"
              label="Full name"
              value={values.fullName}
              onChange={handleChange}
              error={errors.fullName}
            />
            <FormField
              id="email"
              name="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
            />
            <FormField
              id="phone"
              name="phone"
              label="Phone number"
              type="tel"
              value={values.phone}
              onChange={handleChange}
              error={errors.phone}
            />

            <div className="flex gap-2">
              <Button type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save changes'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <>
            <dl className="mt-4 divide-y divide-slate-100 text-sm">
              <div className="flex justify-between gap-4 py-2">
                <dt className="text-slate-500">Full name</dt>
                <dd className="font-medium">{values.fullName}</dd>
              </div>
              <div className="flex justify-between gap-4 py-2">
                <dt className="text-slate-500">Email</dt>
                <dd className="font-medium">{values.email}</dd>
              </div>
              <div className="flex justify-between gap-4 py-2">
                <dt className="text-slate-500">Phone</dt>
                <dd className="font-medium">{values.phone}</dd>
              </div>
            </dl>

            <div className="mt-4">
              <Button variant="outline" onClick={() => {
                setEditing(true)
                setMessage('')
                setErrors({})
              }}>
                Edit profile
              </Button>
            </div>
          </>
        )}
      </section>

      <section className="mt-6 max-w-xl rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="font-semibold">Account settings</h2>
        <label className="mt-4 flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={saveNotificationPreference}
          />
          Send me email notifications about rent and maintenance
        </label>
      </section>

      {message && (
        <p
          role="status"
          className={`mt-4 max-w-xl rounded-md p-3 text-sm ${
            messageError
              ? 'bg-red-50 text-red-700'
              : 'bg-green-50 text-green-700'
          }`}
        >
          {message}
        </p>
      )}
    </>
  )
}

export default TenantProfilePage
