import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface WeightChartProps {
    data: Array<{
        date: string;
        incoming: number;
        outgoing: number;
    }>;
}

export function WeightChart({ data }: WeightChartProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">7-Day Weight Trend (Tons)</h3>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip
                            formatter={(value: number, name: string) => [
                                `${value} tons`,
                                name === 'incoming' ? 'Incoming' : 'Outgoing'
                            ]}
                        />
                        <Legend />
                        <Bar dataKey="incoming" fill="#10b981" name="Incoming" />
                        <Bar dataKey="outgoing" fill="#f59e0b" name="Outgoing" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
