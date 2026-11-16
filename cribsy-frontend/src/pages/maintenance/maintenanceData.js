// OWNER: Member 6 - Lynn. Sample maintenance data (demonstration only).
export const categories = ['Plumbing', 'Electrical', 'Appliances', 'Doors and locks', 'Pests', 'Structural', 'Other']
export const statuses = ['Pending', 'In progress', 'Resolved', 'Rejected']

export const maintenanceRequests = [
  { id: 'mr1', propertyName: 'Greenview Apartments, Unit A2', tenantName: 'Jane Wanjiku', category: 'Plumbing',
    description: 'The kitchen tap has been leaking for three days and the cabinet below is getting wet.', status: 'In progress', submittedOn: '2026-11-04', photos: 2 },
  { id: 'mr2', propertyName: 'Oak Residence, Unit 4', tenantName: 'Brian Otieno', category: 'Doors and locks',
    description: 'The balcony door lock is broken and the door cannot be secured.', status: 'Pending', submittedOn: '2026-11-06', photos: 1 },
  { id: 'mr3', propertyName: 'Sunrise Family Home', tenantName: 'Mercy Chebet', category: 'Plumbing',
    description: 'The drain in the garden is blocked after the rains.', status: 'Pending', submittedOn: '2026-11-07', photos: 0 },
  { id: 'mr4', propertyName: 'Greenview Apartments, Unit A2', tenantName: 'Jane Wanjiku', category: 'Electrical',
    description: 'The hallway light does not switch on.', status: 'Resolved', submittedOn: '2026-10-20', photos: 0 },
  { id: 'mr5', propertyName: 'Oak Residence, Unit 4', tenantName: 'Brian Otieno', category: 'Other',
    description: 'Request to repaint the whole apartment.', status: 'Rejected', submittedOn: '2026-10-12', photos: 0 },
]

export function statusTone(status) {
  if (status === 'Resolved') return 'green'
  if (status === 'In progress') return 'blue'
  if (status === 'Pending') return 'amber'
  if (status === 'Rejected') return 'red'
  return 'slate'
}
