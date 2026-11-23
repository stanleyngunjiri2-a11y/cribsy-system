import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, ExternalLink } from 'lucide-react'
import CribsyLogo from './CribsyLogo'
import { useAuth } from '../../context/AuthContext'

function DashboardLayout({ title, links }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const { logout } = useAuth()

  function closeMenu() {
    setMobileOpen(false)
  }

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-page">
      <header className="sticky top-0 z-40 border-b border-border bg-white">
        <div className="flex h-[68px] items-center justify-between px-5 lg:px-8">
          <CribsyLogo />

          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted sm:block">
              {title} workspace
            </span>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-muted hover:text-ink"
            >
              <LogOut size={18} />
              Log out
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center border border-border text-ink lg:hidden"
              aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1600px]">
        <aside className="hidden min-h-[calc(100vh-68px)] w-64 shrink-0 border-r border-border bg-white p-5 lg:block">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted">
            {title} menu
          </p>

          <nav className="flex flex-col gap-1">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 border-l-[3px] px-3 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'border-brand-800 bg-brand-50 text-brand-800'
                      : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-ink'
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-10 border-t border-border pt-5">
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2 text-sm text-muted hover:text-ink"
            >
              <ExternalLink size={18} />
              View website
            </Link>
          </div>
        </aside>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/30 lg:hidden">
            <aside className="h-full w-[280px] max-w-[85vw] bg-white p-5 shadow-xl">
              <div className="mb-7 flex items-center justify-between">
                <span className="font-semibold text-ink">{title} menu</span>
                <button onClick={closeMenu} aria-label="Close navigation">
                  <X size={21} />
                </button>
              </div>

              <nav className="flex flex-col gap-1">
                {links.map(({ to, label, icon: Icon, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `flex items-center gap-3 border-l-[3px] px-3 py-3 text-sm font-medium ${
                        isActive
                          ? 'border-brand-800 bg-brand-50 text-brand-800'
                          : 'border-transparent text-slate-600'
                      }`
                    }
                  >
                    <Icon size={18} />
                    {label}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-8 border-t border-border pt-5">
                <Link
                  to="/"
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-muted"
                >
                  <ExternalLink size={18} />
                  View website
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 flex w-full items-center gap-3 px-3 py-2 text-sm text-muted"
                >
                  <LogOut size={18} />
                  Log out
                </button>
              </div>
            </aside>
          </div>
        )}

        <main className="min-w-0 flex-1 px-4 py-7 sm:px-6 lg:px-9 lg:py-9">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
