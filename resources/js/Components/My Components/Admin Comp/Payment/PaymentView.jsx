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
    ArrowUturnLeftIcon  } 
    from '@heroicons/react/24/outline';

export default function PaymentView({ payment }) {
    return (
        <>
            {/* Button to open the modal */}
            <button
                onClick={() => document.getElementById(`my_modal_2${payment.id}`).showModal()}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 border border-transparent rounded-lg text-white font-semibold shadow-lg transition ease-in-out duration-200"
            >
                View Details
            </button>

            {/* Modal to display event information */}
            <dialog id={`my_modal_2${payment.id}`} className="modal">
                <div className="modal-box bg-white rounded-lg shadow-xl p-8 relative">
                    {/* Close Button */}
                    <button
                        onClick={() => document.getElementById(`my_modal_2${payment.id}`).close()}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>

                    {/* Modal Content */}
                    <div className="space-y-6">
                        {/* Header Section */}
                        <div className="text-center border-b pb-4">
                            <h3 className="text-2xl font-bold text-gray-800">{payment.id}</h3>
                            <p className="text-gray-500 mt-2">{payment.order_id}</p>
                        </div>

                        {/* Payment Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            {/* Payment ID */}
                            <div className="flex items-center space-x-3">
                                <InboxIcon className="h-6 w-6 text-blue-500" />
                                <div>
                                    <InputLabel value="Payment ID" />
                                    <p className="text-gray-700">{payment.id}</p>
                                </div>
                            </div>

                            {/* Order ID */}
                            <div className="flex items-center space-x-3">
                                <TagIcon className="h-6 w-6 text-orange-500" />
                                <div>
                                    <InputLabel value="Order ID" />
                                    <p className="text-gray-700">{payment.order_id}</p>
                                </div>
                            </div>

                            {/* Order Number */}
                            <div className="flex items-center space-x-3">
                                <DocumentTextIcon className="h-6 w-6 text-teal-500" />
                                <div>
                                    <InputLabel value="Order Number" />
                                    <p className="text-gray-700">{payment.ordernumber}</p>
                                </div>
                            </div>

                            {/* User ID */}
                            <div className="flex items-center space-x-3">
                                <UserIcon className="h-6 w-6 text-purple-500" />
                                <div>
                                    <InputLabel value="User ID" />
                                    <p className="text-gray-700">{payment.user_id}</p>
                                </div>
                            </div>

                            {/* Payment Amount */}
                            <div className="flex items-center space-x-3">
                                <CurrencyDollarIcon className="h-6 w-6 text-green-500" />
                                <div>
                                    <InputLabel value="Amount (RM)" />
                                    <p className="text-gray-700">{`RM ${payment.amount}`}</p>
                                </div>
                            </div>

                            {/* Payment Date */}
                            <div className="flex items-center space-x-3">
                                <CalendarIcon className="h-6 w-6 text-blue-400" />
                                <div>
                                    <InputLabel value="Payment Date" />
                                    <p className="text-gray-700">{payment.payment_date}</p>
                                </div>
                            </div>

                            {/* Created At */}
                            <div className="flex items-center space-x-3">
                                <ClockIcon className="h-6 w-6 text-yellow-500" />
                                <div>
                                    <InputLabel value="Created At" />
                                    <p className="text-gray-700">{payment.created_at}</p>
                                </div>
                            </div>

                            {/* Payment Status */}
                            <div className="flex items-center space-x-3">
                                {payment.payment_status === "pending" && (
                                    <>
                                        <ClockIcon className="h-6 w-6 text-yellow-500" />
                                        <div>
                                            <InputLabel value="Status" />
                                            <p className="text-yellow-500 font-semibold">Pending</p>
                                        </div>
                                    </>
                                )}
                                {payment.payment_status === "completed" && (
                                    <>
                                        <CheckCircleIcon className="h-6 w-6 text-green-600" />
                                        <div>
                                            <InputLabel value="Status" />
                                            <p className="text-green-600 font-semibold">Completed</p>
                                        </div>
                                    </>
                                )}
                                {payment.payment_status === "failed" && (
                                    <>
                                        <XCircleIcon className="h-6 w-6 text-red-600" />
                                        <div>
                                            <InputLabel value="Status" />
                                            <p className="text-red-600 font-semibold">Failed</p>
                                        </div>
                                    </>
                                )}
                                {payment.payment_status === "refunded" && (
                                    <>
                                        <ArrowUturnLeftIcon className="h-6 w-6 text-purple-500" />
                                        <div>
                                            <InputLabel value="Status" />
                                            <p className="text-purple-500 font-semibold">Refunded</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 text-right">
                        <button
                            onClick={() => document.getElementById(`my_modal_2${payment.id}`).close()}
                            className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg shadow-sm transition duration-200"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}
