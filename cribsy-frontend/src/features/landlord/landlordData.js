export const landlordProperties = [
  { id: 'PROP-001', name: 'Greenview Apartments', location: 'Ruiru, Kiambu', units: 12, occupied: 9, rent: 28000, status: 'Active' },
  { id: 'PROP-002', name: 'Sunrise Residences', location: 'Kahawa Sukari, Kiambu', units: 8, occupied: 6, rent: 42000, status: 'Active' },
  { id: 'PROP-003', name: 'Oakwood Court', location: 'Juja, Kiambu', units: 6, occupied: 4, rent: 12000, status: 'Active' },
]

export const landlordTenants = [
  { id: 'TEN-001', name: 'Jane Wanjiku', property: 'Greenview Apartments A2', phone: '0712 345 678', rent: 28000, status: 'Active' },
  { id: 'TEN-002', name: 'Brian Mwangi', property: 'Sunrise Residences B4', phone: '0722 456 789', rent: 42000, status: 'Active' },
  { id: 'TEN-003', name: 'Mary Akinyi', property: 'Oakwood Court C1', phone: '0700 123 456', rent: 12000, status: 'Active' },
]

export const landlordRequests = [
  { id: 'MT-101', tenant: 'Jane Wanjiku', property: 'Greenview Apartments A2', issue: 'Leaking kitchen tap', status: 'In progress', date: '2026-11-10' },
  { id: 'MT-102', tenant: 'Brian Mwangi', property: 'Sunrise Residences B4', issue: 'Faulty bathroom shower', status: 'Pending', date: '2026-11-12' },
]

export const landlordKES = (amount) =>
  new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(amount)
