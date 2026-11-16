// OWNER: Member 1 - Stanley.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthCard from './AuthCard'
import FormField from '../../components/shared/FormField'
import Button from '../../components/shared/Button'

function TwoStepVerificationPage() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!/^[0-9]{6}$/.test(code)) {
      setError('Enter the 6-digit code.')
      setDone(false)
      return
    }
    setError('')
    setDone(true)
  }

  return (
    <AuthCard
      title="Two-step verification"
      subtitle="Enter the 6-digit code sent to your email."
      footer={<Link className="text-emerald-700 underline" to="/login">Back to sign in</Link>}
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <FormField id="code" name="code" label="Verification code" inputMode="numeric" maxLength={6}
          autoComplete="one-time-code" value={code}
          onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))} error={error} />
        <Button type="submit">Verify</Button>
      </form>
      {done && (
        <p role="status" className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800">
          The code format is valid, but nothing was verified because the backend is not connected yet.
        </p>
      )}
    </AuthCard>
  )
}

export default TwoStepVerificationPage
