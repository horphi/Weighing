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
    const type = Math.random() > 0.5 ? "incoming" : "outgoing";
    const item = dummyItems[Math.floor(Math.random() * dummyItems.length)];
    const vendor =
      dummyVendors[Math.floor(Math.random() * dummyVendors.length)];
    const vehicle =
      dummyVehicles[Math.floor(Math.random() * dummyVehicles.length)];

    // Generate realistic weights
    const tareWeight = 5000 + Math.random() * 10000; // 5-15 tons
    const netWeight = 10000 + Math.random() * 30000; // 10-40 tons
    const grossWeight = tareWeight + netWeight;

    // Generate timestamps for the last 30 days
    const timestamp = new Date();
    timestamp.setDate(timestamp.getDate() - Math.floor(Math.random() * 30));
    timestamp.setHours(6 + Math.floor(Math.random() * 12)); // Working hours 6AM-6PM
    timestamp.setMinutes(Math.floor(Math.random() * 60));

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
      operator: operators[Math.floor(Math.random() * operators.length)],
      notes: Math.random() > 0.7 ? "Special handling required" : undefined,
    });
  }

  // Sort by timestamp (newest first)
  return records.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export const dummyWeightRecords = generateDummyWeightRecords(150);
