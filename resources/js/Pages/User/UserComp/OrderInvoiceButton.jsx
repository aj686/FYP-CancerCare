import { useState } from 'react';
import { EyeIcon, PrinterIcon } from 'lucide-react';

export default function OrderInvoiceButton({ order }) {
    const [loading, setLoading] = useState(false);

    const handleInvoiceClick = async () => {
        try {
            setLoading(true);
            // Get the payment for this order
            const response = await fetch(`/payment/${order.id}/invoice`);
            
            if (!response.ok) {
                // If no Stripe invoice, fall back to your custom invoice
                const printWindow = window.open(`/invoice/${order.id}`, '_blank');
                printWindow.focus();
            } else {
                // If Stripe invoice exists, it will be handled by the redirect in the backend
                window.location.href = response.url;
            }
        } catch (error) {
            console.error('Error fetching invoice:', error);
            // Fall back to custom invoice on error
            const printWindow = window.open(`/invoice/${order.id}`, '_blank');
            printWindow.focus();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex space-x-2">
            <button 
                onClick={() => order.setSelectedOrder(order)}
                className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
            >
                <EyeIcon className="h-5 w-5" />
                <span>Details</span>
            </button>
            <button 
                onClick={handleInvoiceClick}
                disabled={loading}
                className="text-gray-600 hover:text-gray-900 flex items-center space-x-1"
            >
                <PrinterIcon className="h-5 w-5" />
                <span>{loading ? 'Loading...' : 'Invoice'}</span>
            </button>
        </div>
    );
}