// OWNER: Member 1 - Stanley.
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthCard from './AuthCard'
import PasswordField from './PasswordField'
import FormField from '../../components/shared/FormField'
import Button from '../../components/shared/Button'
import { useAuth } from '../../context/AuthContext'
import { isEmail } from './validators'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setValues((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }))
    setErrors((current) => ({ ...current, [e.target.name]: '' }))
    setServerError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const next = {}

    if (!isEmail(values.email)) next.email = 'Enter a valid email address.'
    if (!values.password) next.password = 'Enter your password.'

    setErrors(next)
    setServerError('')

    if (Object.keys(next).length) return

    setLoading(true)

    try {
      const email = values.email.trim().toLowerCase()
      const response = await login(email, values.password)

      if (!response?.verification_required) {
        throw new Error('The server did not confirm the verification step.')
      }

      sessionStorage.setItem('cribsy_pending_verification_email', email)

      navigate('/verify', {
        state: { email },
      })
    } catch (error) {
      setServerError(error.message || 'Unable to sign in.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard
      title="Sign in"
      subtitle="Welcome back to RentConnect."
      footer={
        <>
          New here?{' '}
          <Link className="text-emerald-700 underline" to="/register">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <FormField id="email" name="email" label="Email" type="email"
          autoComplete="email" value={values.email}
          onChange={handleChange} error={errors.email} />

        <PasswordField id="password" name="password" label="Password"
          autoComplete="current-password" value={values.password}
          onChange={handleChange} error={errors.password} />

        <Link className="text-sm text-emerald-700 underline" to="/forgot-password">
          Forgot password?
        </Link>

        {serverError && (
          <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            {serverError}
          </p>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Continue'}
        </Button>
      </form>
    </AuthCard>
  )
}

export default LoginPage
