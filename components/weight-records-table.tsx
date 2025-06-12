import React from 'react';
import { WeightRecord } from '@/lib/types';
import { formatWeight } from '@/lib/dashboard-utils';
import { ArrowUp, ArrowDown, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface WeightRecordsTableProps {
    records: WeightRecord[];
    maxRecords?: number;
}

export function WeightRecordsTable({ records, maxRecords = 20 }: WeightRecordsTableProps) {
    const displayRecords = records.slice(0, maxRecords);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Weight Records</CardTitle>
                <p className="text-sm text-muted-foreground">
                    Showing {displayRecords.length} of {records.length} records
                </p>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Ticket</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Item</TableHead>
                                <TableHead>Vendor</TableHead>
                                <TableHead>Vehicle</TableHead>
                                <TableHead>Net Weight</TableHead>
                                <TableHead>Operator</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {displayRecords.map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell className="font-medium">
                                        {record.ticketNumber}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {record.type === 'incoming' ? (
                                                <ArrowDown className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <ArrowUp className="h-4 w-4 text-orange-500" />
                                            )}
                                            <span className={`capitalize ${record.type === 'incoming'
                                                    ? 'text-green-600 dark:text-green-400'
                                                    : 'text-orange-600 dark:text-orange-400'
                                                }`}>
                                                {record.type}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <div>{record.timestamp.toLocaleDateString()}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {record.timestamp.toLocaleTimeString()}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{record.item.name}</div>
                                            <div className="text-xs text-muted-foreground">{record.item.category}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{record.vendor.name}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {record.vendor.code} • {record.vendor.type}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Truck className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <div className="font-medium">{record.vehicle.plateNumber}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {record.vehicle.type} • {record.vehicle.driver}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {formatWeight(record.netWeight)}
                                    </TableCell>
                                    <TableCell>{record.operator}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {records.length > maxRecords && (
                    <div className="mt-4 text-center">
                        <p className="text-sm text-muted-foreground">
                            Showing {maxRecords} of {records.length} records. Use filters to refine results.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
