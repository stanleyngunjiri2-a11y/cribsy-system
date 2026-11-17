import { useEffect, useRef, useState } from 'react'
import { RefreshCw, Wifi } from 'lucide-react'
import { registerSW } from 'virtual:pwa-register'

function PWAUpdatePrompt() {
  const [needRefresh, setNeedRefresh] = useState(false)
  const [offlineReady, setOfflineReady] = useState(false)
  const updateSW = useRef(async () => {})

  useEffect(() => {
    updateSW.current = registerSW({
      immediate: true,

      onNeedRefresh() {
        setNeedRefresh(true)
      },

      onOfflineReady() {
        setOfflineReady(true)
      },

      onRegisteredSW(_url, registration) {
        if (registration) {
          window.setInterval(() => {
            registration.update()
          }, 60 * 60 * 1000)
        }
      },
    })
  }, [])

  if (!needRefresh && !offlineReady) return null

  async function handleUpdate() {
    await updateSW.current(true)
    setNeedRefresh(false)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 w-[calc(100%-40px)] max-w-sm border border-border bg-white p-5 shadow-xl">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-brand-50 text-brand-800">
          {needRefresh ? <RefreshCw size={20} /> : <Wifi size={20} />}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-ink">
            {needRefresh ? 'Update available' : 'Ready to work offline'}
          </h2>

          <p className="mt-1 text-sm leading-6 text-muted">
            {needRefresh
              ? 'A new version of Cribsy is available. Refresh to get the latest improvements.'
              : 'Cribsy has been cached and is ready for offline access.'}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {needRefresh && (
              <button
                type="button"
                onClick={handleUpdate}
                className="btn btn-primary"
              >
                Update now
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setNeedRefresh(false)
                setOfflineReady(false)
              }}
              className="btn btn-secondary"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PWAUpdatePrompt
