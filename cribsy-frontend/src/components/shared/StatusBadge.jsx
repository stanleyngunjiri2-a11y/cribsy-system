function StatusBadge({ children, tone = 'slate' }) {
  const tones = {
    green: 'bg-green-50 text-green-800 border-green-200',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
    red: 'bg-red-50 text-red-800 border-red-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  }

  return (
    <span className={`inline-flex items-center border px-2.5 py-1 text-xs font-semibold ${tones[tone] || tones.slate}`}>
      {children}
    </span>
  )
}

export default StatusBadge
