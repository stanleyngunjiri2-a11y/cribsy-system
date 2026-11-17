import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  KeyRound,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import CribsyLogo from '../../components/shared/CribsyLogo'

const benefits = [
  {
    icon: Search,
    title: 'Find a place to call home',
    description: 'Explore available rental properties and find a home that suits your needs and budget.',
  },
  {
    icon: Building2,
    title: 'Manage properties simply',
    description: 'Landlords and property managers can organise properties and keep track of their tenants.',
  },
  {
    icon: ShieldCheck,
    title: 'Keep everything organised',
    description: 'Bring important rental information, payments and maintenance records together.',
  },
]

const steps = [
  ['01', 'Create your account', 'Register as a tenant or landlord.'],
  ['02', 'Find your workspace', 'Access the tools designed for your role.'],
  ['03', 'Manage with confidence', 'Keep your rental activities organised.'],
]

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="min-h-screen bg-white">
      <header className="relative z-30 border-b border-border bg-white">
        <div className="page-container flex h-[76px] items-center justify-between">
          <CribsyLogo />

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <Link to="/properties" className="hover:text-brand-800">Browse properties</Link>
            <a href="#features" className="hover:text-brand-800">Features</a>
            <a href="#how-it-works" className="hover:text-brand-800">How it works</a>
            <a href="#about" className="hover:text-brand-800">About</a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link to="/login" className="px-4 py-2.5 text-sm font-semibold text-ink hover:text-brand-800">
              Sign in
            </Link>
            <Link to="/register" className="btn btn-primary">
              Get started <ArrowRight size={16} />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center border border-border md:hidden"
            aria-label="Toggle navigation"
          >
            <Menu size={21} />
          </button>
        </div>

        {menuOpen && (
          <div className="absolute left-0 right-0 top-full border-b border-border bg-white p-5 shadow-lg md:hidden">
            <nav className="flex flex-col gap-4 text-sm font-medium">
              <Link to="/properties" onClick={() => setMenuOpen(false)}>Browse properties</Link>
              <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
              <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
              <Link to="/login">Sign in</Link>
              <Link to="/register" className="btn btn-primary">Create account</Link>
            </nav>
          </div>
        )}
      </header>

      <section className="hero-section">
        <div className="page-container grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 border border-brand-200 bg-white px-3 py-2 text-xs font-semibold text-brand-800">
              <span className="h-2 w-2 bg-brand-600" />
              PROPERTY RENTALS & MANAGEMENT
            </div>

            <h1 className="text-4xl font-bold leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[58px]">
              A better way to
              <span className="block text-brand-800">rent and manage</span>
              property.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-slate-600">
              Cribsy brings tenants, landlords and property managers together
              with a simpler way to organise rental activities.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/properties" className="btn btn-outline min-h-12 px-6">Browse properties</Link>
              <Link to="/register" className="btn btn-primary min-h-12 px-6">
                Get started <ArrowRight size={17} />
              </Link>
              <a href="#how-it-works" className="btn btn-outline min-h-12 px-6">
                Learn how it works
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
              <span className="flex items-center gap-2"><CheckCircle2 size={17} className="text-brand-700" /> Tenant accounts</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={17} className="text-brand-700" /> Landlord tools</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="absolute left-5 top-5 z-10 flex items-center gap-2 border border-white bg-white px-3 py-2 text-xs font-semibold text-brand-800 shadow-sm">
              <MapPin size={15} /> Find your next home
            </div>

            <div className="hero-building">
              <div className="hero-window" />
              <div className="hero-window second" />
              <div className="hero-door" />
            </div>

            <div className="absolute bottom-5 left-5 z-10 flex items-center gap-3 border border-border bg-white p-3 shadow-md">
              <span className="flex h-10 w-10 items-center justify-center bg-brand-50 text-brand-800">
                <KeyRound size={20} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">Your next chapter</span>
                <span className="mt-0.5 block text-xs text-muted">Starts with finding the right home.</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="page-container py-20 md:py-24">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-800">WHAT CRIBSY OFFERS</p>
          <h2 className="section-heading">Rental management, made clearer.</h2>
          <p className="section-description">
            Whether you are looking for a home or managing rental property,
            Cribsy gives you one place to organise the process.
          </p>
        </div>

        <div className="mt-11 grid gap-5 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, description }) => (
            <article key={title} className="surface-card surface-card-interactive p-7">
              <div className="mb-6 flex h-12 w-12 items-center justify-center bg-brand-50 text-brand-800">
                <Icon size={23} />
              </div>
              <h3 className="text-lg font-bold text-ink">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="border-y border-border bg-page py-20 md:py-24">
        <div className="page-container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-800">GETTING STARTED</p>
            <h2 className="section-heading">A straightforward way forward.</h2>
            <p className="section-description mx-auto">
              Get started with a few simple steps and access the tools relevant to your role.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map(([number, title, description]) => (
              <article key={number} className="border border-border bg-white p-7">
                <span className="text-sm font-bold text-brand-700">{number}</span>
                <h3 className="mt-5 text-lg font-bold text-ink">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="page-container py-20 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-800">BUILT AROUND RENTING</p>
            <h2 className="section-heading">One platform. Different rental needs.</h2>
            <p className="section-description">
              Cribsy is designed to make everyday rental processes easier to
              understand and manage for the people involved.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="surface-card p-6">
              <Users size={24} className="text-brand-800" />
              <h3 className="mt-4 font-bold text-ink">For tenants</h3>
              <p className="mt-2 text-sm leading-6 text-muted">Access your rental information and keep track of your tenancy.</p>
            </div>
            <div className="surface-card p-6">
              <Building2 size={24} className="text-brand-800" />
              <h3 className="mt-4 font-bold text-ink">For landlords</h3>
              <p className="mt-2 text-sm leading-6 text-muted">Organise property information and manage rental activities.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-900 py-16 text-white">
        <div className="page-container flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Ready to get started?</h2>
            <p className="mt-3 text-sm leading-7 text-green-100">Create your Cribsy account and get started.</p>
          </div>
          <Link to="/register" className="btn border border-white bg-white px-6 text-brand-900 hover:bg-green-50">
            Create an account <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border bg-white">
        <div className="page-container flex flex-col justify-between gap-5 py-8 sm:flex-row sm:items-center">
          <div>
            <CribsyLogo />
            <p className="mt-2 text-xs text-muted">A clearer way to rent and manage property.</p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-muted">
            <Link to="/properties" className="hover:text-brand-800">Browse properties</Link>
            <Link to="/login" className="hover:text-brand-800">Sign in</Link>
            <Link to="/register" className="hover:text-brand-800">Create account</Link>
          </div>
          <p className="text-xs text-muted">© {new Date().getFullYear()} Cribsy. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

export default HomePage
