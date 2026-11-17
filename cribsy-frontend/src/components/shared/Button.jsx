import { LoaderCircle } from 'lucide-react'

function Button({
  children,
  type = 'button',
  variant = 'primary',
  disabled = false,
  loading = false,
  onClick,
  className = '',
}) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    danger: 'btn-danger',
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`btn ${variants[variant] || variants.primary} ${className}`}
    >
      {loading && <LoaderCircle size={17} className="animate-spin" />}
      {children}
    </button>
  )
}

export default Button
