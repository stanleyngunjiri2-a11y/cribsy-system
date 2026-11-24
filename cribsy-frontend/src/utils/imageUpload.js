const MAX_IMAGE_BYTES = 6 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])
const MAX_IMAGE_DIMENSION = 1600

export async function preparePropertyImage(file) {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) throw new Error('Choose a JPG, PNG, or WebP image.')
  if (file.size <= MAX_IMAGE_BYTES) return file
  let bitmap
  try { bitmap = await createImageBitmap(file) } catch {
    throw new Error('This image could not be opened. Try another JPG, PNG, or WebP image.')
  }
  try {
    const scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(bitmap.width * scale))
    canvas.height = Math.max(1, Math.round(bitmap.height * scale))
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Image compression is unavailable in this browser.')
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    let quality = 0.86
    let result
    for (let attempt = 0; attempt < 8; attempt += 1) {
      result = await new Promise(resolve => canvas.toBlob(resolve, 'image/webp', quality))
      if (result && result.size <= MAX_IMAGE_BYTES) break
      if (canvas.width <= 320 || canvas.height <= 320) quality -= 0.12
      else {
        canvas.width = Math.max(320, Math.round(canvas.width * 0.8))
        canvas.height = Math.max(320, Math.round(canvas.height * 0.8))
        context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
        quality = 0.82
      }
    }
    if (!result || result.size > MAX_IMAGE_BYTES) throw new Error('This image could not be compressed below 6 MB. Choose a smaller image.')
    const baseName = file.name.replace(/\.[^.]+$/, '') || 'property-image'
    return new File([result], `${baseName}.webp`, { type: 'image/webp', lastModified: Date.now() })
  } finally { bitmap.close() }
}
