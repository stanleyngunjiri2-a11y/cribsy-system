import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, CalendarDays, ArrowUpRight, FileText } from 'lucide-react'
import PageHeading from '../../components/shared/PageHeading'
import { applicationAPI } from '../../services/api'

function statusStyle(status) {
  if (status === 'approved') return 'bg-green-50 text-green-700'
  if (status === 'rejected') return 'bg-red-50 text-red-700'
  return 'bg-amber-50 text-amber-700'
}

export default function TenantApplicationsPage() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadApplications = useCallback(async () => {
    setError('')
    const result = await applicationAPI.mine()
    setApplications(Array.isArray(result) ? result : [])
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadApplications()
      .catch(err => setError(err.message || 'Unable to load your applications.'))
      .finally(() => setLoading(false))
  }, [loadApplications])

  async function retry() {
    setLoading(true)
    try {
      await loadApplications()
    } catch (err) {
      setError(err.message || 'Unable to load your applications.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHeading
        title="My applications"
        description="Track the properties you have applied for and see the landlords' decisions."
      />

      {error && (
        <div role="alert" className="surface-card mb-5 p-4 text-sm text-red-700">
          {error}
          <button type="button" onClick={retry} className="ml-2 font-semibold underline">
            Try again
          </button>
        </div>
      )}

      {loading ? (
        <div className="surface-card p-8 text-center text-muted">
          Loading your applications...
        </div>
      ) : applications.length === 0 ? (
        <div className="surface-card px-6 py-12 text-center">
          <FileText size={34} className="mx-auto text-muted" />
          <h2 className="mt-4 text-lg font-semibold text-ink">No applications yet</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
            When you apply for a property, you will be able to track its progress here.
          </p>
          <Link to="/properties" className="btn btn-primary mt-5 inline-flex">
            Browse properties
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map(application => {
            const property = application.property || {}

            return (
              <article key={application.id} className="surface-card overflow-hidden p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-ink">
                      {property.name || 'Property'}
                    </h2>
                    <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                      <MapPin size={16} />
                      {property.location || 'Location unavailable'}
                    </p>
                  </div>

                  <span className={'inline-flex rounded-md px-3 py-1.5 text-xs font-semibold capitalize ' + statusStyle(application.status)}>
                    {application.status || 'pending'}
                  </span>
                </div>

                {application.message && (
                  <div className="mt-4 border-l-2 border-border pl-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                      Your message
                    </p>
                    <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-ink">
                      {application.message}
                    </p>
                  </div>
                )}

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                  <p className="flex items-center gap-2 text-xs text-muted">
                    <CalendarDays size={15} />
                    Applied {application.created_at
                      ? new Date(application.created_at).toLocaleDateString()
                      : 'date unavailable'}
                  </p>

                  <Link
                    to={'/properties/' + application.property_id}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-800 hover:underline"
                  >
                    View property <ArrowUpRight size={16} />
                  </Link>
                </div>

                {application.status === 'approved' && (
                  <p className="mt-4 bg-green-50 p-3 text-sm leading-6 text-green-800">
                    Your application has been approved. The landlord can now assign you to an available unit.
                  </p>
                )}

                {application.status === 'rejected' && (
                  <p className="mt-4 bg-red-50 p-3 text-sm leading-6 text-red-800">
                    Unfortunately, this application was not approved.
                  </p>
                )}

                {application.status === 'pending' && (
                  <p className="mt-4 bg-amber-50 p-3 text-sm leading-6 text-amber-800">
                    Your application is waiting for the landlord to review it.
                  </p>
                )}
              </article>
            )
          })}
        </div>
      )}
    </>
  )
}
