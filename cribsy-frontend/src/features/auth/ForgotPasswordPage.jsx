// OWNER: Member 1 - Stanley.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthCard from './AuthCard'
import FormField from '../../components/shared/FormField'
import Button from '../../components/shared/Button'
import { isEmail } from './validators'
import { authAPI } from '../../services/api'

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [serverError, setServerError] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if (!isEmail(email)) {
      setError('Enter a valid email address.')
      setSent(false)
      return
    }

    setError('')
    setServerError('')
    setLoading(true)

    try {
      await authAPI.forgotPassword({ email: email.trim().toLowerCase() })
      setSent(true)
    } catch (err) {
      setServerError(err.message || 'Unable to process your request.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard
      title="Forgot your password?"
      subtitle="Enter your email address to request a password reset link."
      footer={
        <Link className="text-emerald-700 underline" to="/login">
          Back to sign in
        </Link>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <FormField id="email" name="email" label="Email" type="email"
          value={email} onChange={(e) => setEmail(e.target.value)}
          error={error} />

        {serverError && (
          <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            {serverError}
          </p>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send reset link'}
        </Button>
      </form>

      {sent && (
        <p role="status" className="mt-4 rounded-md bg-emerald-50 p-3 text-sm text-emerald-800">
          If an account exists for that email, a password reset link has been sent.
          Please check your inbox.
        </p>
      )}
    </AuthCard>
  )
}

export default ForgotPasswordPage
