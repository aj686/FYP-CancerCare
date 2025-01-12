import React from 'react';

export function Alert({ children, variant = 'default' }) {
    const variantClasses = {
        default: 'bg-blue-100 text-blue-800',
        destructive: 'bg-red-100 text-red-800',
    };

    return (
        <div className={`p-4 rounded ${variantClasses[variant]}`}>
            {children}
        </div>
    );
}

export function AlertDescription({ children }) {
    return <div className="text-sm">{children}</div>;
}
