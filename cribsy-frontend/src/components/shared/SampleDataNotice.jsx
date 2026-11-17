import { Info } from 'lucide-react'

function SampleDataNotice() {
  return (
    <div className="mb-6 flex items-start gap-3 border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
      <Info size={19} className="mt-0.5 shrink-0" />
      <p>
        <strong>Preview data:</strong> This information is sample data.
        Changes are not yet connected to the backend.
      </p>
    </div>
  )
}

export default SampleDataNotice
