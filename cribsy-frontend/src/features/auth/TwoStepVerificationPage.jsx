// OWNER: Member 1 - Stanley.
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthCard from './AuthCard'
import FormField from '../../components/shared/FormField'
import Button from '../../components/shared/Button'
import { useAuth } from '../../context/AuthContext'

function TwoStepVerificationPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { verifyLogin } = useAuth()

  const email =
    location.state?.email ||
    sessionStorage.getItem('cribsy_pending_verification_email') ||
    ''

  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if (!email) {
      setError('Your verification session has expired. Please sign in again.')
      return
    }

    if (!/^[0-9]{6}$/.test(code)) {
      setError('Enter the 6-digit code.')
      return
    }

    setError('')
    setLoading(true)

    try {
      const response = await verifyLogin(email, code)

      sessionStorage.removeItem('cribsy_pending_verification_email')

      const role = response.user?.role

      const destinations = {
        tenant: '/tenant',
        landlord: '/landlord',
        admin: '/admin',
        superadmin: '/admin',
      }
      const returnTo = location.state?.from
      const returnPath = typeof returnTo?.pathname === 'string'
        && returnTo.pathname.startsWith('/')
        && !returnTo.pathname.startsWith('//')
        ? {
            pathname: returnTo.pathname,
            search: returnTo.search || '',
            hash: returnTo.hash || '',
          }
        : null

      navigate(returnPath || destinations[role] || '/dashboard', { replace: true })
    } catch (err) {
      setError(err.message || 'Verification failed. Check your code and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard
      title="Two-step verification"
      subtitle={email
        ? `Enter the 6-digit code sent to ${email}.`
        : 'Sign in again to request a new verification code.'}
      footer={
        <Link className="text-emerald-700 underline" to="/login">
          Back to sign in
        </Link>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <FormField id="code" name="code" label="Verification code"
          inputMode="numeric" maxLength={6} autoComplete="one-time-code"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
          error={error} />

        <Button type="submit" disabled={loading || !email}>
          {loading ? 'Verifying...' : 'Verify'}
        </Button>
      </form>
    </AuthCard>
  )
}

export default TwoStepVerificationPage
