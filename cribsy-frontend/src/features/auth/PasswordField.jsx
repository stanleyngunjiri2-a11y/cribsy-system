import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

function PasswordField({ id, label, error, ...props }) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="form-label">{label}</label>

      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`form-control pr-11 ${error ? 'border-red-500' : ''}`}
          {...props}
        />

        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-brand-800"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && <p id={`${id}-error`} className="form-error">{error}</p>}
    </div>
  )
}

export default PasswordField
