import React from 'react';
import { Item, Vendor, Vehicle, DashboardFilters } from '@/lib/types';
import { Filter } from 'lucide-react';

interface DashboardFiltersProps {
    filters: Partial<DashboardFilters>;
    onFiltersChange: (filters: Partial<DashboardFilters>) => void;
    items: Item[];
    vendors: Vendor[];
    vehicles: Vehicle[];
}

export function DashboardFiltersComponent({
    filters,
    onFiltersChange,
    items,
    vendors,
    vehicles,
}: DashboardFiltersProps) {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const defaultFromDate = filters.dateRange?.from || weekAgo;
    const defaultToDate = filters.dateRange?.to || today;

    const handleDateChange = (field: 'from' | 'to', value: string) => {
        const newDate = new Date(value);
        onFiltersChange({
            ...filters,
            dateRange: {
                from: field === 'from' ? newDate : (filters.dateRange?.from || weekAgo),
                to: field === 'to' ? newDate : (filters.dateRange?.to || today),
            },
        });
    };

    const handleSelectChange = (field: keyof DashboardFilters, value: string) => {
        onFiltersChange({
            ...filters,
            [field]: value === '' ? undefined : value,
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
            <div className="flex items-center gap-2 mb-4">
                <Filter className="h-5 w-5 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {/* Date Range */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                    <input
                        type="date"
                        value={defaultFromDate.toISOString().split('T')[0]}
                        onChange={(e) => handleDateChange('from', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                    <input
                        type="date"
                        value={defaultToDate.toISOString().split('T')[0]}
                        onChange={(e) => handleDateChange('to', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Type Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                        value={filters.type || ''}
                        onChange={(e) => handleSelectChange('type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Types</option>
                        <option value="incoming">Incoming</option>
                        <option value="outgoing">Outgoing</option>
                    </select>
                </div>

                {/* Item Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Item</label>
                    <select
                        value={filters.itemId || ''}
                        onChange={(e) => handleSelectChange('itemId', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Items</option>
                        {items.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Vendor Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vendor</label>
                    <select
                        value={filters.vendorId || ''}
                        onChange={(e) => handleSelectChange('vendorId', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Vendors</option>
                        {vendors.map((vendor) => (
                            <option key={vendor.id} value={vendor.id}>
                                {vendor.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Vehicle Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle</label>
                    <select
                        value={filters.vehicleId || ''}
                        onChange={(e) => handleSelectChange('vehicleId', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Vehicles</option>
                        {vehicles.map((vehicle) => (
                            <option key={vehicle.id} value={vehicle.id}>
                                {vehicle.plateNumber} ({vehicle.type})
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
