import React from 'react';
import { LucideIcon } from 'lucide-react';

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
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        orange: 'bg-orange-500',
        purple: 'bg-purple-500',
    };

    const changeColorClasses = {
        positive: 'text-green-600',
        negative: 'text-red-600',
        neutral: 'text-gray-600',
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                    {change && (
                        <p className={`text-sm mt-1 ${changeColorClasses[changeType]}`}>
                            {change}
                        </p>
                    )}
                </div>
                <div className={`p-3 rounded-full ${colorClasses[color]}`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
            </div>
        </div>
    );
}
