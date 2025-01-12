import React from 'react';

export function ModalButton({ 
    onClick, 
    variant = "primary", 
    children, 
    disabled = false,
    className = ""
}) {
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white",
        secondary: "bg-white hover:bg-gray-50 focus:ring-blue-500 text-gray-700 border border-gray-300",
        danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white",
        success: "bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white",
        warning: "bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-500 text-white"
    };

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`
                inline-flex justify-center rounded-md px-4 py-2 text-sm font-semibold
                focus:outline-none focus:ring-2 focus:ring-offset-2
                transition-colors duration-200 ease-in-out
                ${variants[variant]}
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                ${className}
            `}
        >
            {children}
        </button>
    );
}