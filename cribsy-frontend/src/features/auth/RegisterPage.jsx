// OWNER: Member 1 - Stanley.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthCard from './AuthCard'
import PasswordField from './PasswordField'
import FormField from '../../components/shared/FormField'
import SelectField from '../../components/shared/SelectField'
import Button from '../../components/shared/Button'
import { isEmail, passwordProblem } from './validators'

const initial = { fullName: '', email: '', phone: '', role: 'tenant', password: '', confirm: '' }

function RegisterPage() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const next = {}
    if (values.fullName.trim().length < 2) next.fullName = 'Enter your full name.'
    if (!isEmail(values.email)) next.email = 'Enter a valid email address.'
    if (values.phone.trim().length < 9) next.phone = 'Enter a valid phone number.'
    const pw = passwordProblem(values.password)
    if (pw) next.password = pw
    if (values.confirm !== values.password) next.confirm = 'Passwords do not match.'
    setErrors(next)
    setDone(Object.keys(next).length === 0)
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Register as a tenant or a landlord."
      footer={
        <>
          Already registered? <Link className="text-emerald-700 underline" to="/login">Sign in</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <FormField id="fullName" name="fullName" label="Full name" value={values.fullName}
          onChange={handleChange} error={errors.fullName} />
        <FormField id="email" name="email" label="Email" type="email" value={values.email}
          onChange={handleChange} error={errors.email} />
        <FormField id="phone" name="phone" label="Phone number" type="tel" value={values.phone}
          onChange={handleChange} error={errors.phone} />
        <SelectField id="role" name="role" label="I am a" value={values.role} onChange={handleChange}
          options={[{ value: 'tenant', label: 'Tenant' }, { value: 'landlord', label: 'Landlord or property manager' }]} />
        <PasswordField id="password" name="password" label="Password" autoComplete="new-password"
          value={values.password} onChange={handleChange} error={errors.password} />
        <PasswordField id="confirm" name="confirm" label="Confirm password" autoComplete="new-password"
          value={values.confirm} onChange={handleChange} error={errors.confirm} />
        <Button type="submit">Create account</Button>
      </form>

      {done && (
        <p role="status" className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800">
          The form is valid, but no account was created because the backend is not connected yet.
        </p>
      )}
    </AuthCard>
  )
}

export default RegisterPage
