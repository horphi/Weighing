import { WeightRecord, DashboardFilters } from "./types";
import { startOfDay, endOfDay, isWithinInterval } from "date-fns";

export function filterWeightRecords(
  records: WeightRecord[],
  filters: Partial<DashboardFilters>
): WeightRecord[] {
  return records.filter((record) => {
    // Date range filter
    if (filters.dateRange) {
      const recordDate = record.timestamp;
      const isInRange = isWithinInterval(recordDate, {
        start: startOfDay(filters.dateRange.from),
        end: endOfDay(filters.dateRange.to),
      });
      if (!isInRange) return false;
    }

    // Type filter
    if (filters.type && record.type !== filters.type) {
      return false;
    }

    // Item filter
    if (filters.itemId && record.item.id !== filters.itemId) {
      return false;
    }

    // Vendor filter
    if (filters.vendorId && record.vendor.id !== filters.vendorId) {
      return false;
    }

    // Vehicle filter
    if (filters.vehicleId && record.vehicle.id !== filters.vehicleId) {
      return false;
    }

    return true;
  });
}

export function calculateTotals(records: WeightRecord[]) {
  const incoming = records.filter((r) => r.type === "incoming");
  const outgoing = records.filter((r) => r.type === "outgoing");

  return {
    totalIncoming: incoming.reduce((sum, r) => sum + r.netWeight, 0),
    totalOutgoing: outgoing.reduce((sum, r) => sum + r.netWeight, 0),
    incomingCount: incoming.length,
    outgoingCount: outgoing.length,
    totalRecords: records.length,
  };
}

export function formatWeight(weight: number): string {
  if (weight >= 1000) {
    return `${(weight / 1000).toFixed(1)}t`;
  }
  return `${weight.toFixed(0)}kg`;
}

export function getWeightTrendData(records: WeightRecord[]) {
  const last7Days = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);

    const dayRecords = records.filter((record) =>
      isWithinInterval(record.timestamp, { start: dayStart, end: dayEnd })
    );

    const incoming = dayRecords
      .filter((r) => r.type === "incoming")
      .reduce((sum, r) => sum + r.netWeight, 0);

    const outgoing = dayRecords
      .filter((r) => r.type === "outgoing")
      .reduce((sum, r) => sum + r.netWeight, 0);

    last7Days.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      incoming: Math.round(incoming / 1000), // Convert to tons
      outgoing: Math.round(outgoing / 1000),
    });
  }

  return last7Days;
}
