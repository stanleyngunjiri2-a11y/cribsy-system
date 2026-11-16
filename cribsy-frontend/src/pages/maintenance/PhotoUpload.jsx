// OWNER: Member 6 - Lynn. Photo picker with previews. Files are NOT uploaded anywhere yet.
import { useEffect, useState } from 'react'

const MAX_FILES = 4
const MAX_SIZE = 2 * 1024 * 1024 // 2 MB each

function PhotoUpload({ onChange }) {
  const [previews, setPreviews] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    return () => previews.forEach((url) => URL.revokeObjectURL(url))
  }, [previews])

  function handleChange(e) {
    const files = Array.from(e.target.files)
    if (files.length > MAX_FILES) return setError(`Choose at most ${MAX_FILES} photos.`)
    if (files.some((f) => !f.type.startsWith('image/'))) return setError('Only image files are allowed.')
    if (files.some((f) => f.size > MAX_SIZE)) return setError('Each photo must be 2 MB or smaller.')

    setError('')
    setPreviews(files.map((f) => URL.createObjectURL(f)))
    onChange(files)
  }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="photos" className="text-sm font-medium text-slate-700">Photos (optional)</label>
      <input id="photos" type="file" accept="image/*" multiple onChange={handleChange} className="text-sm" />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <div className="mt-2 flex flex-wrap gap-2">
        {previews.map((url, i) => (
          <img key={url} src={url} alt={`Selected photo ${i + 1}`} className="h-20 w-20 rounded-md object-cover" />
        ))}
      </div>
    </div>
  )
}

export default PhotoUpload
