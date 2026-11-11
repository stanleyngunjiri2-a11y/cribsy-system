export const tenantProfile = {
  fullName: 'Jane Wanjiku',
  email: 'jane.wanjiku@example.com',
  phone: '0712 345 678',
  emailNotifications: true,
}

export const tenancy = {
  propertyName: 'Greenview Apartments, Unit A2',
  location: 'Ruiru, Kiambu',
  type: 'Apartment',
  bedrooms: 2,
  bathrooms: 1,
  monthlyRent: 28000,
  leaseStart: '2026-02-01',
  leaseEnd: '2027-01-31',
  landlordName: 'Sample Landlord',
}

export const rentRecords = [
  { id: 'r6', date: '2026-11-02', amount: 28000, reference: 'SAMPLE-1006', status: 'Paid', method: 'Mobile money' },
  { id: 'r5', date: '2026-10-02', amount: 28000, reference: 'SAMPLE-1005', status: 'Paid', method: 'Mobile money' },
  { id: 'r4', date: '2026-09-03', amount: 28000, reference: 'SAMPLE-1004', status: 'Paid', method: 'Bank transfer' },
  { id: 'r3', date: '2026-08-02', amount: 28000, reference: 'SAMPLE-1003', status: 'Paid', method: 'Mobile money' },
  { id: 'r2', date: '2026-07-10', amount: 28000, reference: 'SAMPLE-1002', status: 'Pending', method: 'Bank transfer' },
  { id: 'r1', date: '2026-06-02', amount: 28000, reference: 'SAMPLE-1001', status: 'Overdue', method: 'Mobile money' },
]

export const tenantMaintenance = [
  { id: 'mt1', issue: 'Leaking kitchen tap', status: 'In progress' },
  { id: 'mt2', issue: 'Hallway light not working', status: 'Resolved' },
]

export function paymentTone(status) {
  if (status === 'Paid' || status === 'Resolved') return 'green'
  if (status === 'Pending' || status === 'In progress') return 'amber'
  if (status === 'Overdue') return 'red'
  return 'slate'
}