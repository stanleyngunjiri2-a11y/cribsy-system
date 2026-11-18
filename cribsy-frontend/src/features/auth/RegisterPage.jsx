// OWNER: Member 1 - Stanley.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthCard from './AuthCard'
import PasswordField from './PasswordField'
import FormField from '../../components/shared/FormField'
import SelectField from '../../components/shared/SelectField'
import Button from '../../components/shared/Button'
import { useAuth } from '../../context/AuthContext'
import { isEmail, passwordProblem } from './validators'

const initial = {
  fullName: '',
  email: '',
  phone: '',
  role: 'tenant',
  password: '',
  confirm: '',
}

function RegisterPage() {
  const { register } = useAuth()
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target

    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setServerError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setServerError('')
    setSuccess(false)

    const next = {}

    if (values.fullName.trim().length < 2) {
      next.fullName = 'Enter your full name.'
    }

    if (!isEmail(values.email)) {
      next.email = 'Enter a valid email address.'
    }

    if (values.phone.trim().length < 9) {
      next.phone = 'Enter a valid phone number.'
    }

    if (!['tenant', 'landlord'].includes(values.role)) {
      next.role = 'Choose tenant or landlord.'
    }

    const passwordIssue = passwordProblem(values.password)

    if (passwordIssue) {
      next.password = passwordIssue
    }

    if (values.confirm !== values.password) {
      next.confirm = 'Passwords do not match.'
    }

    setErrors(next)

    if (Object.keys(next).length > 0) return

    setLoading(true)

    try {
      await register({
        full_name: values.fullName.trim(),
        email: values.email.trim().toLowerCase(),
        phone: values.phone.trim(),
        role: values.role,
        password: values.password,
      })

      setSuccess(true)
      setValues(initial)
      setErrors({})
    } catch (error) {
      const backendFields = error.data?.fields || {}
      const mappedErrors = {}

      Object.entries(backendFields).forEach(([field, message]) => {
        mappedErrors[field === 'full_name' ? 'fullName' : field] = message
      })

      setErrors((current) => ({ ...current, ...mappedErrors }))
      setServerError(error.message || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Register as a tenant or a landlord."
      footer={
        <>
          Already registered?{' '}
          <Link className="text-emerald-700 underline" to="/login">
            Sign in
          </Link>
        </>
      }
    >
      {success ? (
        <div role="status" className="rounded-md border border-emerald-200 bg-emerald-50 p-4">
          <h2 className="font-semibold text-emerald-800">
            Account created successfully.
          </h2>
          <p className="mt-2 text-sm text-emerald-700">
            Your Cribsy account has been registered. You can now sign in.
          </p>
          <Link to="/login" className="mt-4 inline-block font-semibold text-emerald-800 underline">
            Continue to sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <FormField id="fullName" name="fullName" label="Full name"
            value={values.fullName} onChange={handleChange}
            error={errors.fullName} autoComplete="name" />

          <FormField id="email" name="email" label="Email" type="email"
            value={values.email} onChange={handleChange}
            error={errors.email} autoComplete="email" />

          <FormField id="phone" name="phone" label="Phone number" type="tel"
            value={values.phone} onChange={handleChange}
            error={errors.phone} autoComplete="tel" />

          <SelectField id="role" name="role" label="I am a"
            value={values.role} onChange={handleChange}
            options={[
              { value: 'tenant', label: 'Tenant' },
              { value: 'landlord', label: 'Landlord or property manager' },
            ]} />

          <PasswordField id="password" name="password" label="Password"
            autoComplete="new-password" value={values.password}
            onChange={handleChange} error={errors.password} />

          <PasswordField id="confirm" name="confirm" label="Confirm password"
            autoComplete="new-password" value={values.confirm}
            onChange={handleChange} error={errors.confirm} />

          {serverError && (
            <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">
              {serverError}
            </p>
          )}

          <Button type="submit" loading={loading} disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
      )}
    </AuthCard>
  )
}

export default RegisterPage
