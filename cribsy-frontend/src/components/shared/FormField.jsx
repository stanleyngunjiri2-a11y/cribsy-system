function FormField({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  error,
  hint,
  className = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="form-label">
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`form-control ${error ? 'border-red-500 focus:border-red-500' : ''}`}
        {...props}
      />

      {hint && !error && <p className="form-hint">{hint}</p>}

      {error && (
        <p id={`${id}-error`} className="form-error">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField
