import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WeightChartProps {
    data: Array<{
        date: string;
        incoming: number;
        outgoing: number;
    }>;
}

export function WeightChart({ data }: WeightChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>7-Day Weight Trend (Tons)</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis
                                dataKey="date"
                                className="fill-muted-foreground text-xs"
                            />
                            <YAxis
                                className="fill-muted-foreground text-xs"
                            />
                            <Tooltip
                                formatter={(value: number, name: string) => [
                                    `${value} tons`,
                                    name === 'incoming' ? 'Incoming' : 'Outgoing'
                                ]}
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--card))',
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: '6px',
                                    color: 'hsl(var(--card-foreground))'
                                }}
                            />
                            <Legend />
                            <Bar dataKey="incoming" fill="#10b981" name="Incoming" />
                            <Bar dataKey="outgoing" fill="#f59e0b" name="Outgoing" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
