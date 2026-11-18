// OWNER: Member 1 - Stanley.
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import AuthCard from './AuthCard'
import PasswordField from './PasswordField'
import Button from '../../components/shared/Button'
import { passwordProblem } from './validators'
import { authAPI } from '../../services/api'

function ResetPasswordPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const [values, setValues] = useState({ password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  function handleChange(e) {
    setValues((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const next = {}
    const passwordIssue = passwordProblem(values.password)

    if (passwordIssue) next.password = passwordIssue

    if (values.confirm !== values.password) {
      next.confirm = 'Passwords do not match.'
    }

    if (!token) {
      setServerError('This password reset link is invalid or incomplete.')
      return
    }

    setErrors(next)
    setServerError('')

    if (Object.keys(next).length) return

    setLoading(true)

    try {
      await authAPI.resetPassword({ token, password: values.password })
      setDone(true)
    } catch (error) {
      setServerError(error.message || 'Unable to reset your password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard title="Set a new password"
      subtitle="Choose a password you have not used before.">
      {done ? (
        <div role="status" className="rounded-md bg-emerald-50 p-4">
          <p className="font-semibold text-emerald-800">
            Your password has been changed successfully.
          </p>
          <Button type="button" onClick={() => navigate('/login')} className="mt-4">
            Continue to sign in
          </Button>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <PasswordField id="password" name="password" label="New password"
              autoComplete="new-password" value={values.password}
              onChange={handleChange} error={errors.password} />

            <PasswordField id="confirm" name="confirm" label="Confirm new password"
              autoComplete="new-password" value={values.confirm}
              onChange={handleChange} error={errors.confirm} />

            {serverError && (
              <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                {serverError}
              </p>
            )}

            <Button type="submit" disabled={loading}>
              {loading ? 'Updating password...' : 'Reset password'}
            </Button>
          </form>

          <Link className="mt-4 inline-block text-sm text-emerald-700 underline"
            to="/login">
            Back to sign in
          </Link>
        </>
      )}
    </AuthCard>
  )
}

export default ResetPasswordPage
