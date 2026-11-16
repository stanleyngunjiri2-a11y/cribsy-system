// OWNER: Member 1 - Stanley.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthCard from './AuthCard'
import FormField from '../../components/shared/FormField'
import Button from '../../components/shared/Button'
import { isEmail } from './validators'

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!isEmail(email)) {
      setError('Enter a valid email address.')
      setSent(false)
      return
    }
    setError('')
    setSent(true)
  }

  return (
    <AuthCard
      title="Forgot your password?"
      subtitle="Enter your email and we will send you a reset link once the backend is connected."
      footer={<Link className="text-emerald-700 underline" to="/login">Back to sign in</Link>}
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <FormField id="email" name="email" label="Email" type="email" value={email}
          onChange={(e) => setEmail(e.target.value)} error={error} />
        <Button type="submit">Send reset link</Button>
      </form>
      {sent && (
        <p role="status" className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800">
          Preview only: no email was sent.
        </p>
      )}
    </AuthCard>
  )
}

export default ForgotPasswordPage
