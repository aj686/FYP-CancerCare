import InputLabel from "@/Components/InputLabel";
import { 
    CheckCircleIcon, 
    XCircleIcon, 
    ClockIcon, 
    CurrencyDollarIcon, 
    CalendarIcon, 
    InboxIcon, 
    DocumentTextIcon, 
    TagIcon, 
    UserIcon, 
    ArrowUturnLeftIcon 
} from '@heroicons/react/24/outline';

export default function PaymentView({ payment }) {
    return (
        <>
            {/* Button to open the modal */}
            <button
                onClick={() => document.getElementById(`my_modal_2${payment.id}`).showModal()}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150"
            >
                View Details
            </button>

            {/* Modal to display payment information */}
            <dialog id={`my_modal_2${payment.id}`} className="modal">
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                            {/* Modal Header */}
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Payment Details
                                        <span className="block text-sm text-gray-500">Payment ID: {payment.id}</span>
                                    </h3>
                                    <button
                                        onClick={() => document.getElementById(`my_modal_2${payment.id}`).close()}
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Payment Information */}
                                <div className="border-b pb-4">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-gray-700"><span className="font-medium">Order ID:</span> {payment.order_id}</p>
                                        <p className="text-gray-700"><span className="font-medium">User ID:</span> {payment.user_id}</p>
                                    </div>
                                </div>

                                {/* Payment Details Grid */}
                                <div className="mt-6">
                                    <h4 className="text-sm font-medium text-gray-900 mb-4">Payment Information</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Payment ID */}
                                        <div className="flex items-center space-x-3">
                                            <InboxIcon className="h-6 w-6 text-blue-500 flex-shrink-0" />
                                            <div>
                                                <InputLabel value="Payment ID" />
                                                <p className="text-gray-700">{payment.id}</p>
                                            </div>
                                        </div>

                                        {/* Order ID */}
                                        <div className="flex items-center space-x-3">
                                            <TagIcon className="h-6 w-6 text-orange-500 flex-shrink-0" />
                                            <div>
                                                <InputLabel value="Order ID" />
                                                <p className="text-gray-700">{payment.order_id}</p>
                                            </div>
                                        </div>

                                        {/* Order Number */}
                                        <div className="flex items-center space-x-3">
                                            <DocumentTextIcon className="h-6 w-6 text-teal-500 flex-shrink-0" />
                                            <div>
                                                <InputLabel value="Order Number" />
                                                <p className="text-gray-700">{payment.ordernumber}</p>
                                            </div>
                                        </div>

                                        {/* User ID */}
                                        <div className="flex items-center space-x-3">
                                            <UserIcon className="h-6 w-6 text-purple-500 flex-shrink-0" />
                                            <div>
                                                <InputLabel value="User ID" />
                                                <p className="text-gray-700">{payment.user_id}</p>
                                            </div>
                                        </div>

                                        {/* Payment Amount */}
                                        <div className="flex items-center space-x-3">
                                            <CurrencyDollarIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                                            <div>
                                                <InputLabel value="Amount (RM)" />
                                                <p className="text-gray-700">{`RM ${payment.amount}`}</p>
                                            </div>
                                        </div>

                                        {/* Payment Date */}
                                        <div className="flex items-center space-x-3">
                                            <CalendarIcon className="h-6 w-6 text-blue-400 flex-shrink-0" />
                                            <div>
                                                <InputLabel value="Payment Date" />
                                                <p className="text-gray-700">{payment.payment_date}</p>
                                            </div>
                                        </div>

                                        {/* Created At */}
                                        <div className="flex items-center space-x-3">
                                            <ClockIcon className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                                            <div>
                                                <InputLabel value="Created At" />
                                                <p className="text-gray-700">{payment.created_at}</p>
                                            </div>
                                        </div>

                                        {/* Payment Status */}
                                        <div className="flex items-center space-x-3">
                                            {(() => {
                                                switch(payment.payment_status) {
                                                    case "pending":
                                                        return (
                                                            <>
                                                                <ClockIcon className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                                                                <div>
                                                                    <InputLabel value="Status" />
                                                                    <p className="text-yellow-500 font-semibold">Pending</p>
                                                                </div>
                                                            </>
                                                        );
                                                    case "completed":
                                                        return (
                                                            <>
                                                                <CheckCircleIcon className="h-6 w-6 text-green-600 flex-shrink-0" />
                                                                <div>
                                                                    <InputLabel value="Status" />
                                                                    <p className="text-green-600 font-semibold">Completed</p>
                                                                </div>
                                                            </>
                                                        );
                                                    case "failed":
                                                        return (
                                                            <>
                                                                <XCircleIcon className="h-6 w-6 text-red-600 flex-shrink-0" />
                                                                <div>
                                                                    <InputLabel value="Status" />
                                                                    <p className="text-red-600 font-semibold">Failed</p>
                                                                </div>
                                                            </>
                                                        );
                                                    case "refunded":
                                                        return (
                                                            <>
                                                                <ArrowUturnLeftIcon className="h-6 w-6 text-purple-500 flex-shrink-0" />
                                                                <div>
                                                                    <InputLabel value="Status" />
                                                                    <p className="text-purple-500 font-semibold">Refunded</p>
                                                                </div>
                                                            </>
                                                        );
                                                    default:
                                                        return null;
                                                }
                                            })()}
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-8 flex justify-end">
                                    <button
                                        onClick={() => document.getElementById(`my_modal_2${payment.id}`).close()}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
}