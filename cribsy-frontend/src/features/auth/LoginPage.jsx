// OWNER: Member 1 - Stanley.
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthCard from './AuthCard'
import PasswordField from './PasswordField'
import FormField from '../../components/shared/FormField'
import Button from '../../components/shared/Button'
import { isEmail } from './validators'

function LoginPage() {
  const navigate = useNavigate()
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const next = {}
    if (!isEmail(values.email)) next.email = 'Enter a valid email address.'
    if (!values.password) next.password = 'Enter your password.'
    setErrors(next)
    // Frontend preview only: a real sign-in check happens on the backend in Week 2.
    if (Object.keys(next).length === 0) navigate('/verify')
  }

  return (
    <AuthCard
      title="Sign in"
      subtitle="Welcome back to RentConnect."
      footer={
        <>
          New here? <Link className="text-emerald-700 underline" to="/register">Create an account</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <FormField id="email" name="email" label="Email" type="email" autoComplete="email"
          value={values.email} onChange={handleChange} error={errors.email} />
        <PasswordField id="password" name="password" label="Password" autoComplete="current-password"
          value={values.password} onChange={handleChange} error={errors.password} />
        <Link className="text-sm text-emerald-700 underline" to="/forgot-password">Forgot password?</Link>
        <Button type="submit">Continue</Button>
      </form>
    </AuthCard>
  )
}

export default LoginPage
