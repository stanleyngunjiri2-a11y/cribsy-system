import { Link } from 'react-router-dom'

function CribsyLogo({ compact = false, className = '' }) {
  return (
    <Link
      to="/"
      aria-label="Cribsy home"
      className={`inline-flex shrink-0 items-center ${className}`}
    >
      <img
        src="/cribsy-logo-trimmed.png"
        alt="Cribsy"
        className={`block h-auto w-auto object-contain ${
          compact
            ? 'max-h-10 max-w-[170px]'
            : 'max-h-12 max-w-[220px]'
        }`}
      />
    </Link>
  )
}

export default CribsyLogo
