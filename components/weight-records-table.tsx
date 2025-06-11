import React from 'react';
import { WeightRecord } from '@/lib/types';
import { formatWeight } from '@/lib/dashboard-utils';
import { ArrowUp, ArrowDown, Truck } from 'lucide-react';

interface WeightRecordsTableProps {
    records: WeightRecord[];
    maxRecords?: number;
}

export function WeightRecordsTable({ records, maxRecords = 20 }: WeightRecordsTableProps) {
    const displayRecords = records.slice(0, maxRecords);

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Weight Records</h3>
                <p className="text-sm text-gray-600">Showing {displayRecords.length} of {records.length} records</p>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ticket
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date & Time
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Item
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Vendor
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Vehicle
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Net Weight
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Operator
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {displayRecords.map((record) => (
                            <tr key={record.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {record.ticketNumber}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <div className="flex items-center gap-2">
                                        {record.type === 'incoming' ? (
                                            <ArrowDown className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <ArrowUp className="h-4 w-4 text-orange-500" />
                                        )}
                                        <span className={`capitalize ${record.type === 'incoming' ? 'text-green-700' : 'text-orange-700'
                                            }`}>
                                            {record.type}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {record.timestamp.toLocaleDateString()}<br />
                                    <span className="text-gray-500 text-xs">
                                        {record.timestamp.toLocaleTimeString()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <div>
                                        <div className="font-medium">{record.item.name}</div>
                                        <div className="text-gray-500 text-xs">{record.item.category}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <div>
                                        <div className="font-medium">{record.vendor.name}</div>
                                        <div className="text-gray-500 text-xs">
                                            {record.vendor.code} • {record.vendor.type}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <div className="flex items-center gap-2">
                                        <Truck className="h-4 w-4 text-gray-400" />
                                        <div>
                                            <div className="font-medium">{record.vehicle.plateNumber}</div>
                                            <div className="text-gray-500 text-xs">
                                                {record.vehicle.type} • {record.vehicle.driver}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {formatWeight(record.netWeight)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {record.operator}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {records.length > maxRecords && (
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                    <p className="text-sm text-gray-600 text-center">
                        Showing {maxRecords} of {records.length} records. Use filters to refine results.
                    </p>
                </div>
            )}
        </div>
    );
}
