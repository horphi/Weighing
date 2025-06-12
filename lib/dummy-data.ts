import { WeightRecord, Item, Vendor, Vehicle } from "./types";

// Dummy Items
export const dummyItems: Item[] = [
  { id: "1", name: "Steel Coils", category: "Metal", unit: "tons" },
  { id: "2", name: "Aluminum Sheets", category: "Metal", unit: "tons" },
  { id: "3", name: "Plastic Pellets", category: "Plastic", unit: "kg" },
  { id: "4", name: "Rubber Components", category: "Rubber", unit: "kg" },
  { id: "5", name: "Glass Panels", category: "Glass", unit: "pieces" },
  { id: "6", name: "Copper Wire", category: "Metal", unit: "kg" },
  { id: "7", name: "Ceramic Tiles", category: "Ceramic", unit: "boxes" },
  { id: "8", name: "Wooden Pallets", category: "Wood", unit: "pieces" },
];

// Dummy Vendors
export const dummyVendors: Vendor[] = [
  {
    id: "1",
    name: "Steel Solutions Inc.",
    code: "SSI",
    type: "supplier",
    contact: "john@steelsolutions.com",
  },
  {
    id: "2",
    name: "Metro Manufacturing",
    code: "MM",
    type: "customer",
    contact: "sales@metro-mfg.com",
  },
  {
    id: "3",
    name: "Global Plastics Ltd.",
    code: "GPL",
    type: "supplier",
    contact: "orders@globalplastics.com",
  },
  {
    id: "4",
    name: "Automotive Parts Co.",
    code: "APC",
    type: "customer",
    contact: "procurement@autoparts.com",
  },
  {
    id: "5",
    name: "Industrial Materials",
    code: "IM",
    type: "supplier",
    contact: "support@indmaterials.com",
  },
  {
    id: "6",
    name: "Construction Supplies",
    code: "CS",
    type: "customer",
    contact: "orders@consupplies.com",
  },
];

// Dummy Vehicles
export const dummyVehicles: Vehicle[] = [
  {
    id: "1",
    plateNumber: "TRK-001",
    type: "truck",
    capacity: 25000,
    driver: "Mike Johnson",
  },
  {
    id: "2",
    plateNumber: "TRK-002",
    type: "truck",
    capacity: 30000,
    driver: "Sarah Wilson",
  },
  {
    id: "3",
    plateNumber: "TRL-001",
    type: "trailer",
    capacity: 40000,
    driver: "David Brown",
  },
  {
    id: "4",
    plateNumber: "TRL-002",
    type: "trailer",
    capacity: 35000,
    driver: "Lisa Garcia",
  },
  {
    id: "5",
    plateNumber: "CNT-001",
    type: "container",
    capacity: 50000,
    driver: "Robert Taylor",
  },
  {
    id: "6",
    plateNumber: "TRK-003",
    type: "truck",
    capacity: 20000,
    driver: "Jennifer Davis",
  },
  {
    id: "7",
    plateNumber: "TRL-003",
    type: "trailer",
    capacity: 45000,
    driver: "Mark Anderson",
  },
];

// Generate dummy weight records
export function generateDummyWeightRecords(
  count: number = 100
): WeightRecord[] {
  const records: WeightRecord[] = [];
  const operators = [
    "John Smith",
    "Maria Rodriguez",
    "Alex Chen",
    "Emma Thompson",
  ];

  for (let i = 0; i < count; i++) {
    const type = i % 2 === 0 ? "incoming" : "outgoing"; // Deterministic type
    const item = dummyItems[i % dummyItems.length];
    const vendor = dummyVendors[i % dummyVendors.length];
    const vehicle = dummyVehicles[i % dummyVehicles.length];

    // Generate deterministic weights
    const tareWeight = 5000 + ((i * 1234) % 10000); // 5-15 tons
    const netWeight = 10000 + ((i * 5678) % 30000); // 10-40 tons
    const grossWeight = tareWeight + netWeight;

    // Generate timestamps for the last 30 days - use fixed base date to avoid hydration issues
    const baseDate = new Date("2024-06-12T00:00:00.000Z"); // Fixed date for consistency
    const timestamp = new Date(baseDate);
    const daysAgo = Math.floor((i * 30) / 150); // Distribute across 30 days
    timestamp.setDate(timestamp.getDate() - daysAgo);
    timestamp.setHours(6 + (i % 12)); // Working hours 6AM-6PM
    timestamp.setMinutes((i * 7) % 60); // Deterministic minutes

    records.push({
      id: `WR-${String(i + 1).padStart(4, "0")}`,
      type,
      timestamp,
      weight: netWeight,
      item,
      vendor,
      vehicle,
      grossWeight,
      tareWeight,
      netWeight,
      ticketNumber: `TKT-${String(i + 1).padStart(6, "0")}`,
      operator: operators[i % operators.length], // Deterministic operator
      notes: i % 5 === 0 ? "Special handling required" : undefined, // Deterministic notes
    });
  }

  // Sort by timestamp (newest first)
  return records.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export const dummyWeightRecords = generateDummyWeightRecords(150);
