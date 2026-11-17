// OWNER: Member 6 - Lynn. Sample admin data (demonstration only).
export const adminUsers = [
  { id: 'u1', name: 'Jane Wanjiku', email: 'jane.wanjiku@example.com', role: 'Tenant', status: 'Active' },
  { id: 'u2', name: 'Brian Otieno', email: 'brian.otieno@example.com', role: 'Tenant', status: 'Active' },
  { id: 'u3', name: 'Sample Landlord', email: 'landlord@example.com', role: 'Landlord', status: 'Active' },
  { id: 'u4', name: 'Mercy Chebet', email: 'mercy.chebet@example.com', role: 'Tenant', status: 'Suspended' },
  { id: 'u5', name: 'Peter Mwangi', email: 'peter.mwangi@example.com', role: 'Landlord', status: 'Active' },
]

export const adminProperties = [
  { id: 'ap1', name: 'Greenview Apartments, Unit A2', landlord: 'Sample Landlord', location: 'Ruiru, Kiambu', approval: 'Approved' },
  { id: 'ap2', name: 'Maple Court Studio 7', landlord: 'Sample Landlord', location: 'Westlands, Nairobi', approval: 'Pending' },
  { id: 'ap3', name: 'Lakeview Bedsitter', landlord: 'Peter Mwangi', location: 'Kisumu Central, Kisumu', approval: 'Pending' },
  { id: 'ap4', name: 'Riverside Townhouse', landlord: 'Peter Mwangi', location: 'Ruaka, Kiambu', approval: 'Rejected' },
]

export function adminTone(value) {
  if (value === 'Active' || value === 'Approved') return 'green'
  if (value === 'Pending') return 'amber'
  if (value === 'Suspended' || value === 'Rejected') return 'red'
  return 'slate'
}
