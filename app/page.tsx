'use client';

import React, { useState, useMemo } from 'react';
import { Scale, TrendingUp, TrendingDown, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';
import { StatsCard } from '@/components/stats-card';
import { WeightChart } from '@/components/weight-chart';
import { DashboardFiltersComponent } from '@/components/dashboard-filters';
import { WeightRecordsTable } from '@/components/weight-records-table';
import {
    dummyWeightRecords,
    dummyItems,
    dummyVendors,
    dummyVehicles
} from '@/lib/dummy-data';
import { DashboardFilters } from '@/lib/types';
import {
    filterWeightRecords,
    calculateTotals,
    formatWeight,
    getWeightTrendData
} from '@/lib/dashboard-utils';

export default function Home() {
    const [filters, setFilters] = useState<Partial<DashboardFilters>>({
        dateRange: {
            from: new Date('2024-06-05T00:00:00.000Z'), // Fixed date 7 days before base date
            to: new Date('2024-06-12T00:00:00.000Z'), // Fixed base date
        },
    });

    const filteredRecords = useMemo(() => {
        return filterWeightRecords(dummyWeightRecords, filters);
    }, [filters]);

    const totals = useMemo(() => {
        return calculateTotals(filteredRecords);
    }, [filteredRecords]);

    const trendData = useMemo(() => {
        return getWeightTrendData(filteredRecords);
    }, [filteredRecords]);

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center gap-3">
                            <Scale className="h-8 w-8 text-primary" />
                            <div>
                                <h1 className="text-2xl font-bold text-foreground">Weighing Dashboard</h1>
                                <p className="text-sm text-muted-foreground">Factory Shipping & Receiving Department</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">Total Records</p>
                                <p className="text-2xl font-bold text-foreground">{totals.totalRecords}</p>
                            </div>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters */}
                <DashboardFiltersComponent
                    filters={filters}
                    onFiltersChange={setFilters}
                    items={dummyItems}
                    vendors={dummyVendors}
                    vehicles={dummyVehicles}
                />

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        title="Total Incoming"
                        value={formatWeight(totals.totalIncoming)}
                        change={`${totals.incomingCount} shipments`}
                        icon={TrendingDown}
                        color="green"
                    />
                    <StatsCard
                        title="Total Outgoing"
                        value={formatWeight(totals.totalOutgoing)}
                        change={`${totals.outgoingCount} shipments`}
                        icon={TrendingUp}
                        color="orange"
                    />
                    <StatsCard
                        title="Net Balance"
                        value={formatWeight(totals.totalIncoming - totals.totalOutgoing)}
                        change={totals.totalIncoming > totals.totalOutgoing ? 'Surplus' : 'Deficit'}
                        changeType={totals.totalIncoming > totals.totalOutgoing ? 'positive' : 'negative'}
                        icon={Scale}
                        color="blue"
                    />
                    <StatsCard
                        title="Active Items"
                        value={new Set(filteredRecords.map(r => r.item.id)).size.toString()}
                        change="Different items"
                        icon={Package}
                        color="purple"
                    />
                </div>

                {/* Chart */}
                <div className="mb-8">
                    <WeightChart data={trendData} />
                </div>

                {/* Records Table */}
                <WeightRecordsTable records={filteredRecords} maxRecords={50} />
            </main>
        </div>
    );
}
