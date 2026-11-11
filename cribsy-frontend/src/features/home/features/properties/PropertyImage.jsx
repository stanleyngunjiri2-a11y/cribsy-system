// OWNER: Member 3 - Quincy. Placeholder until real photos are connected.
import { Home } from 'lucide-react'

function PropertyImage({ name, className = 'h-40' }) {
  return (
    <div
      role="img"
      aria-label={`Photo placeholder for ${name}`}
      className={`flex items-center justify-center bg-emerald-50 text-emerald-700 ${className}`}
    >
      <Home size={36} />
    </div>
  )
}

export default PropertyImage
