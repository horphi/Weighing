import React from 'react';
import { Item, Vendor, Vehicle, DashboardFilters } from '@/lib/types';
import { Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    // Use consistent fixed dates to avoid hydration issues
    const today = new Date('2024-06-12T00:00:00.000Z');
    const weekAgo = new Date('2024-06-05T00:00:00.000Z');

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
        // Use special "all" value to represent no filter
        onFiltersChange({
            ...filters,
            [field]: value === 'all' ? undefined : value,
        });
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    {/* Date Range */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">From Date</label>
                        <Input
                            type="date"
                            value={defaultFromDate.toISOString().split('T')[0]}
                            onChange={(e) => handleDateChange('from', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">To Date</label>
                        <Input
                            type="date"
                            value={defaultToDate.toISOString().split('T')[0]}
                            onChange={(e) => handleDateChange('to', e.target.value)}
                        />
                    </div>

                    {/* Type Filter */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Type</label>
                        <Select
                            value={filters.type || 'all'}
                            onValueChange={(value) => handleSelectChange('type', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="All Types" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="incoming">Incoming</SelectItem>
                                <SelectItem value="outgoing">Outgoing</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Item Filter */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Item</label>
                        <Select
                            value={filters.itemId || 'all'}
                            onValueChange={(value) => handleSelectChange('itemId', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="All Items" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Items</SelectItem>
                                {items.map((item) => (
                                    <SelectItem key={item.id} value={item.id}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Vendor Filter */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Vendor</label>
                        <Select
                            value={filters.vendorId || 'all'}
                            onValueChange={(value) => handleSelectChange('vendorId', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="All Vendors" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Vendors</SelectItem>
                                {vendors.map((vendor) => (
                                    <SelectItem key={vendor.id} value={vendor.id}>
                                        {vendor.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Vehicle Filter */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Vehicle</label>
                        <Select
                            value={filters.vehicleId || 'all'}
                            onValueChange={(value) => handleSelectChange('vehicleId', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="All Vehicles" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Vehicles</SelectItem>
                                {vehicles.map((vehicle) => (
                                    <SelectItem key={vehicle.id} value={vehicle.id}>
                                        {vehicle.plateNumber} ({vehicle.type})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
