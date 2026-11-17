import { Inbox } from 'lucide-react'

function StateMessage({ title, message }) {
  return (
    <div className="surface-card flex flex-col items-center justify-center px-6 py-14 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center bg-slate-100 text-slate-500">
        <Inbox size={23} />
      </div>

      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-muted">{message}</p>
    </div>
  )
}

export default StateMessage
