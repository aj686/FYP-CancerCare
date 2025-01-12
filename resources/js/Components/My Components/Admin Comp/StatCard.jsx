import React from 'react';

export default function StatCard({ title, value, subValue }) {
    return (
        <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="truncate text-sm font-medium text-gray-500">{title}</div>
                        <div className="mt-1 text-3xl font-semibold text-gray-900">{value}</div>
                        {subValue && (
                            <div className="mt-1 text-sm text-gray-600">{subValue}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}