function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const base = 'rounded-md border px-3 py-1.5 text-sm disabled:opacity-40'

  return (
    <nav aria-label="Pagination" className="mt-6 flex flex-wrap items-center justify-center gap-2">
      <button className={`${base} border-slate-300 bg-white`} disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        Previous
      </button>
      {pages.map((n) => (
        <button
          key={n}
          aria-current={n === page ? 'page' : undefined}
          className={`${base} ${n === page ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-slate-300 bg-white'}`}
          onClick={() => onPageChange(n)}
        >
          {n}
        </button>