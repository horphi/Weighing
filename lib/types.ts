export interface WeightRecord {
  id: string;
  type: "incoming" | "outgoing";
  timestamp: Date;
  weight: number; // in kg
  item: Item;
  vendor: Vendor;
  vehicle: Vehicle;
  grossWeight: number;
  tareWeight: number;
  netWeight: number;
  ticketNumber: string;
  operator: string;
  notes?: string;
}

export interface Item {
  id: string;
  name: string;
  category: string;
  unit: string;
}

export interface Vendor {
  id: string;
  name: string;
  code: string;
  type: "supplier" | "customer";
  contact: string;
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  type: "truck" | "trailer" | "container";
  capacity: number; // in kg
  driver: string;
}

export interface DashboardFilters {
  dateRange: {
    from: Date;
    to: Date;
  };
  type?: "incoming" | "outgoing";
  itemId?: string;
  vendorId?: string;
  vehicleId?: string;
}

export interface WeighingData {
  firstWeight: number | null;
  secondWeight: number | null;
  grossWeight: number | null;
  tareWeight: number | null;
  netWeight: number | null;
  ticketNumber: string;
  vehiclePlate: string;
  driverName: string;
  itemDescription: string;
  notes: string;
}
