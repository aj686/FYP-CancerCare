import React from 'react';

export default function Modal({ 
    isOpen, 
    onClose, 
    title, 
    children, 
    maxWidth = "2xl",
    showClose = true,
    footer
}) {
    const maxWidthClasses = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        full: "max-w-full"
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div className="flex min-h-screen items-center justify-center">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                    onClick={onClose}
                    aria-hidden="true"
                ></div>

                {/* Modal Panel */}
                <div className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full ${maxWidthClasses[maxWidth]} mx-4`}>
                    {/* Header */}
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-semibold leading-6 text-gray-900" id="modal-title">
                                        {title}
                                    </h3>
                                    {showClose && (
                                        <button
                                            onClick={onClose}
                                            className="rounded-full p-1 hover:bg-gray-100 transition-colors duration-200"
                                        >
                                            <svg className="w-6 h-6 text-gray-400 hover:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                <div className="mt-4">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    {footer && (
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}