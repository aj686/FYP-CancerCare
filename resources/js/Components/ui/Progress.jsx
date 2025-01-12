import React from 'react';

export function Progress({ value, className }) {
    return (
        <div className={`relative w-full bg-gray-200 rounded ${className}`}>
            <div
                className="absolute top-0 left-0 h-full bg-purple-600 rounded"
                style={{ width: `${value}%` }}
            ></div>
        </div>
    );
}
