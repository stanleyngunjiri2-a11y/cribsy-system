// OWNER: Member 1 - Stanley. Centered card used by every authentication page.
function AuthCard({ title, subtitle, children, footer }) {
  return (
    <section className="mx-auto flex max-w-md flex-col px-4 py-10">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </div>
      {footer && <div className="mt-4 text-center text-sm text-slate-600">{footer}</div>}
    </section>
  )
}

export default AuthCard
