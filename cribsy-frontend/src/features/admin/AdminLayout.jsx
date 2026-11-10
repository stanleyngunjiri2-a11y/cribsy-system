// OWNER: Member 6 - Lynn. Temporary layout - the owner replaces this with a sidebar layout.
import { Link, Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-slate-200 bg-white px-4 py-3 text-sm">
        <Link to="/" className="text-emerald-700 underline">Back to site</Link>
      </div>
      <Outlet />
    </div>
  )
}

export default AdminLayout
