// OWNER: Member 4 - Nato. Sample data for the landlord pages (demonstration only).
export const landlordProperties = [
  {
    id: "p1",
    name: "Greenview Apartments, Unit A2",
    location: "Ruiru, Kiambu",
    type: "Apartment",
    rent: 28000,
    bedrooms: 2,
    bathrooms: 1,
    description: "Two-bedroom apartment with parking and water supply.",
    status: "Occupied",
  },
  {
    id: "p2",
    name: "Greenview Apartments, Unit B1",
    location: "Ruiru, Kiambu",
    type: "Apartment",
    rent: 26000,
    bedrooms: 2,
    bathrooms: 1,
    description: "Ground floor two-bedroom apartment.",
    status: "Vacant",
  },
  {
    id: "p3",
    name: "Oak Residence, Unit 4",
    location: "Kasarani, Nairobi",
    type: "Apartment",
    rent: 35000,
    bedrooms: 2,
    bathrooms: 2,
    description: "Modern apartment with a balcony.",
    status: "Occupied",
  },
  {
    id: "p4",
    name: "Sunrise Family Home",
    location: "Kahawa Sukari, Kiambu",
    type: "House",
    rent: 52000,
    bedrooms: 3,
    bathrooms: 2,
    description: "Three-bedroom home with a small garden.",
    status: "Occupied",
  },
  {
    id: "p5",
    name: "Maple Court Studio 7",
    location: "Westlands, Nairobi",
    type: "Studio",
    rent: 22000,
    bedrooms: 1,
    bathrooms: 1,
    description: "Compact studio for a single tenant.",
    status: "Vacant",
  },
];

export const landlordTenants = [
  {
    id: "t1",
    name: "Jane Wanjiku",
    phone: "0712 345 678",
    email: "jane.wanjiku@example.com",
    propertyId: "p1",
    leaseStart: "2026-02-01",
    leaseEnd: "2027-01-31",
    status: "Active",
  },
  {
    id: "t2",
    name: "Brian Otieno",
    phone: "0723 456 789",
    email: "brian.otieno@example.com",
    propertyId: "p3",
    leaseStart: "2026-05-01",
    leaseEnd: "2027-04-30",
    status: "Active",
  },
  {
    id: "t3",
    name: "Mercy Chebet",
    phone: "0734 567 890",
    email: "mercy.chebet@example.com",
    propertyId: "p4",
    leaseStart: "2025-11-01",
    leaseEnd: "2026-10-31",
    status: "Notice given",
  },
];

export const landlordMaintenance = [
  {
    id: "m1",
    propertyId: "p1",
    issue: "Leaking kitchen tap",
    status: "Pending",
  },
  {
    id: "m2",
    propertyId: "p3",
    issue: "Broken balcony door lock",
    status: "In progress",
  },
  {
    id: "m3",
    propertyId: "p4",
    issue: "Blocked drain in the garden",
    status: "Pending",
  },
];

export const landlordRentRecords = [
  {
    id: "r1",
    tenantId: "t1",
    amount: 28000,
    date: "2026-11-02",
    status: "Paid",
    reference: "SAMPLE-0001",
  },
  {
    id: "r2",
    tenantId: "t2",
    amount: 35000,
    date: "2026-11-03",
    status: "Paid",
    reference: "SAMPLE-0002",
  },
  {
    id: "r3",
    tenantId: "t3",
    amount: 52000,
    date: "2026-11-05",
    status: "Pending",
    reference: "SAMPLE-0003",
  },
  {
    id: "r4",
    tenantId: "t1",
    amount: 28000,
    date: "2026-10-02",
    status: "Paid",
    reference: "SAMPLE-0004",
  },
];

export function statusTone(status) {
  if (status === "Occupied" || status === "Paid" || status === "Active")
    return "green";
  if (status === "Vacant" || status === "Pending" || status === "Notice given")
    return "amber";
  return "slate";
}
