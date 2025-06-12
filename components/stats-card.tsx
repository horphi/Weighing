import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
    title: string;
    value: string;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
    icon: LucideIcon;
    color?: 'blue' | 'green' | 'orange' | 'purple';
}

export function StatsCard({
    title,
    value,
    change,
    changeType = 'neutral',
    icon: Icon,
    color = 'blue'
}: StatsCardProps) {
    const colorClasses = {
        blue: 'bg-blue-500 dark:bg-blue-600',
        green: 'bg-green-500 dark:bg-green-600',
        orange: 'bg-orange-500 dark:bg-orange-600',
        purple: 'bg-purple-500 dark:bg-purple-600',
    };

    const changeColorClasses = {
        positive: 'text-green-600 dark:text-green-400',
        negative: 'text-red-600 dark:text-red-400',
        neutral: 'text-muted-foreground',
    };

    return (
        <Card className="transition-all hover:shadow-md">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
                        {change && (
                            <p className={cn("text-sm mt-1", changeColorClasses[changeType])}>
                                {change}
                            </p>
                        )}
                    </div>
                    <div className={cn("p-3 rounded-full", colorClasses[color])}>
                        <Icon className="h-6 w-6 text-white" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
