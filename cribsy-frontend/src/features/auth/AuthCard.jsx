import { Link } from 'react-router-dom'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import CribsyLogo from '../../components/shared/CribsyLogo'

function AuthCard({ title, subtitle, children, footer }) {
  return (
    <main className="auth-shell">
      <section className="auth-brand-panel">
        <div className="relative z-10">
          <CribsyLogo light />
        </div>

        <div className="relative z-10 max-w-lg py-16">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-green-200">
            PROPERTY RENTALS & MANAGEMENT
          </p>

          <h2 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Your rental journey, organised in one place.
          </h2>

          <p className="mt-6 max-w-md text-base leading-8 text-green-100">
            Find your place, manage your property and keep important rental
            information within reach.
          </p>

          <div className="mt-10 flex items-center gap-3 border-t border-white/20 pt-6 text-sm text-green-100">
            <ShieldCheck size={21} />
            A simpler rental experience with Cribsy.
          </div>
        </div>

        <p className="relative z-10 text-xs text-green-200">
          © {new Date().getFullYear()} Cribsy
        </p>
      </section>

      <section className="auth-form-panel">
        <div className="auth-form-content">
          <div className="mb-9 flex items-center justify-between">
            <div className="lg:hidden">
              <CribsyLogo />
            </div>

            <Link to="/" className="ml-auto inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-brand-800">
              <ArrowLeft size={16} /> Back to website
            </Link>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-ink">{title}</h1>

          {subtitle && (
            <p className="mt-3 text-sm leading-7 text-muted">{subtitle}</p>
          )}

          <div className="mt-8">{children}</div>

          {footer && (
            <div className="mt-7 border-t border-border pt-6 text-center text-sm text-muted">
              {footer}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default AuthCard
