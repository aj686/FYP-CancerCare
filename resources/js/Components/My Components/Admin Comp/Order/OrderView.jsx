import InputLabel from "@/Components/InputLabel";
import { 
    CalendarIcon, 
    MapPinIcon, 
    UsersIcon, 
    TruckIcon,
    CurrencyDollarIcon, 
    ClockIcon, 
    CheckCircleIcon, 
    XCircleIcon,
    InboxIcon,
    UserCircleIcon,
    DevicePhoneMobileIcon 
} from '@heroicons/react/24/outline';

export default function OrderView({ order }) {
    return (
        <>
            <button
                onClick={() => document.getElementById(`my_modal_2${order.id}`).showModal()}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150"
            >
                View Details
            </button>

            <dialog id={`my_modal_2${order.id}`} className="modal">
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                            {/* Modal Header */}
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Order Details
                                        <span className="block text-sm text-gray-500">Order #{order.ordernumber}</span>
                                    </h3>
                                    <button
                                        onClick={() => document.getElementById(`my_modal_2${order.id}`).close()}
                                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Order Information */}
                                <div className="border-b pb-4">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-gray-700"><span className="font-medium">Customer ID:</span> {order.user_id}</p>
                                        <p className="text-gray-700"><span className="font-medium">Order Number:</span> {order.ordernumber}</p>
                                    </div>
                                </div>

                                {/* Order Details Grid */}
                                <div className="mt-6">
                                    <h4 className="text-sm font-medium text-gray-900 mb-4">Customer Information</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Email */}
                                        <div className="flex items-center space-x-3">
                                            <InboxIcon className="h-6 w-6 text-blue-500 flex-shrink-0" />
                                            <div>
                                                <InputLabel value="Email" />
                                                <p className="text-gray-700">{order.email}</p>
                                            </div>
                                        </div>

                                        {/* First Name */}
                                        <div className="flex items-center space-x-3">
                                            <UserCircleIcon className="h-6 w-6 text-purple-500 flex-shrink-0" />
                                            <div>
                                                <InputLabel value="First Name" />
                                                <p className="text-gray-700">{order.firstname}</p>
                                            </div>
                                        </div>

                                        {/* Phone number */}
                                        <div className="flex items-center space-x-3">
                                            <DevicePhoneMobileIcon className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                                            <div>
                                                <InputLabel value="Phone Number" />
                                                <p className="text-gray-700">{order.phonenumber}</p>
                                            </div>
                                        </div>

                                        {/* City */}
                                        <div className="flex items-center space-x-3">
                                            <MapPinIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
                                            <div>
                                                <InputLabel value="City" />
                                                <p className="text-gray-700">{order.city}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <h4 className="text-sm font-medium text-gray-900 mb-4">Order Information</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Price */}
                                            <div className="flex items-center space-x-3">
                                                <CurrencyDollarIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                                                <div>
                                                    <InputLabel value="Total Price" />
                                                    <p className="text-gray-700 font-medium">
                                                        {order.total_price ? `RM ${parseFloat(order.total_price).toFixed(2)}` : "Free"}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Order Create */}
                                            <div className="flex items-center space-x-3">
                                                <ClockIcon className="h-6 w-6 text-blue-500 flex-shrink-0" />
                                                <div>
                                                    <InputLabel value="Order Date" />
                                                    <p className="text-gray-700">
                                                        {new Date(order.created_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Status Shipping */}
                                            <div className="flex items-center space-x-3">
                                                {(() => {
                                                    switch(order.shipping_status) {
                                                        case "pending":
                                                            return (
                                                                <>
                                                                    <ClockIcon className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                                                                    <div>
                                                                        <InputLabel value="Shipping Status" />
                                                                        <p className="text-yellow-500 font-semibold">Pending</p>
                                                                    </div>
                                                                </>
                                                            );
                                                        case "shipped":
                                                            return (
                                                                <>
                                                                    <TruckIcon className="h-6 w-6 text-blue-500 flex-shrink-0" />
                                                                    <div>
                                                                        <InputLabel value="Shipping Status" />
                                                                        <p className="text-blue-500 font-semibold">Shipped</p>
                                                                    </div>
                                                                </>
                                                            );
                                                        case "delivered":
                                                            return (
                                                                <>
                                                                    <CheckCircleIcon className="h-6 w-6 text-green-600 flex-shrink-0" />
                                                                    <div>
                                                                        <InputLabel value="Shipping Status" />
                                                                        <p className="text-green-600 font-semibold">Delivered</p>
                                                                    </div>
                                                                </>
                                                            );
                                                        case "cancelled":
                                                            return (
                                                                <>
                                                                    <XCircleIcon className="h-6 w-6 text-red-600 flex-shrink-0" />
                                                                    <div>
                                                                        <InputLabel value="Shipping Status" />
                                                                        <p className="text-red-600 font-semibold">Cancelled</p>
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
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-8 flex justify-end">
                                    <button
                                        onClick={() => document.getElementById(`my_modal_2${order.id}`).close()}
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