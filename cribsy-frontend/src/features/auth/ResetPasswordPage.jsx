// OWNER: Member 1 - Stanley.
import { useState } from 'react'
import AuthCard from './AuthCard'
import PasswordField from './PasswordField'
import Button from '../../components/shared/Button'
import { passwordProblem } from './validators'

function ResetPasswordPage() {
  const [values, setValues] = useState({ password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const next = {}
    const pw = passwordProblem(values.password)
    if (pw) next.password = pw
    if (values.confirm !== values.password) next.confirm = 'Passwords do not match.'
    setErrors(next)
    setDone(Object.keys(next).length === 0)
  }

  return (
    <AuthCard title="Set a new password" subtitle="Choose a password you have not used before.">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <PasswordField id="password" name="password" label="New password" autoComplete="new-password"
          value={values.password} onChange={handleChange} error={errors.password} />
        <PasswordField id="confirm" name="confirm" label="Confirm new password" autoComplete="new-password"
          value={values.confirm} onChange={handleChange} error={errors.confirm} />
        <Button type="submit">Reset password</Button>
      </form>
      {done && (
        <p role="status" className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800">
          The form is valid, but the password was not changed because the backend is not connected yet.
        </p>
      )}
    </AuthCard>
  )
}

export default ResetPasswordPage
