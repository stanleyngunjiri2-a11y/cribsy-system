// OWNER: Member 6 - Lynn. Property overview and approval interface (frontend only).
import { useState } from 'react'
import PageHeading from '../../components/shared/PageHeading'
import SampleDataNotice from '../../components/shared/SampleDataNotice'
import StatusBadge from '../../components/shared/StatusBadge'
import Button from '../../components/shared/Button'
import { adminProperties, adminTone } from './adminData'

function AdminPropertiesPage() {
  const [properties, setProperties] = useState(adminProperties)

  function setApproval(id, approval) {
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, approval } : p)))
  }

  return (
    <>
      <PageHeading title="Properties overview" description="Review and approve property listings." />
      <SampleDataNotice />
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-2">Property</th>
              <th className="px-4 py-2">Landlord</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Approval</th>
              <th className="px-4 py-2"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr key={p.id} className="border-t border-slate-100">
                <td className="px-4 py-2 font-medium">{p.name}</td>
                <td className="px-4 py-2">{p.landlord}</td>
                <td className="px-4 py-2">{p.location}</td>
                <td className="px-4 py-2"><StatusBadge tone={adminTone(p.approval)}>{p.approval}</StatusBadge></td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <Button onClick={() => setApproval(p.id, 'Approved')}>Approve</Button>
                    <Button variant="outline" onClick={() => setApproval(p.id, 'Rejected')}>Reject</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-slate-500">Approvals are kept on this page only until the backend is connected.</p>
    </>
  )
}

export default AdminPropertiesPage
