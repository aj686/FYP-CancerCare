import InputLabel from "@/Components/InputLabel";
import { 
    CalendarIcon, 
    MapPinIcon, 
    UsersIcon, 
    CurrencyDollarIcon, 
    ClockIcon, 
    CheckCircleIcon, 
    XCircleIcon,
    InboxIcon,
    UserCircleIcon,
    DevicePhoneMobileIcon } 
    from '@heroicons/react/24/outline';

export default function EventView({ order }) {
    return (
        <>
            {/* Button to open the modal */}
            <button
                onClick={() => document.getElementById(`my_modal_2${order.id}`).showModal()}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 border border-transparent rounded-lg text-white font-semibold shadow-lg transition ease-in-out duration-200"
            >
                View Details
            </button>

            {/* Modal to display event information */}
            <dialog id={`my_modal_2${order.id}`} className="modal">
                <div className="modal-box bg-white rounded-lg shadow-xl p-8 relative">
                    {/* Close Button */}
                    <button
                        onClick={() => document.getElementById(`my_modal_2${order.id}`).close()}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>

                    {/* Modal Content */}
                    <div className="space-y-6">
                        {/* Header Section */}
                        <div className="text-center border-b pb-4">
                            <h3 className="text-2xl font-bold text-gray-800">{order.user_id}</h3>
                            <p className="text-gray-500 mt-2">{order.ordernumber}</p>
                        </div>

                        {/* Order Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            {/* Email */}
                            <div className="flex items-center space-x-3">
                                <InboxIcon className="h-6 w-6 text-blue-500" />
                                <div>
                                    <InputLabel value="Email" />
                                    <p className="text-gray-700">{order.email}</p>
                                </div>
                            </div>

                            {/* First Name */}
                            <div className="flex items-center space-x-3">
                                <UserCircleIcon className="h-6 w-6 text-purple-500" />
                                <div>
                                    <InputLabel value="First Name" />
                                    <p className="text-gray-700">{order.firstname}</p>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="flex items-center space-x-3">
                                <CurrencyDollarIcon className="h-6 w-6 text-green-500" />
                                <div>
                                    <InputLabel value="Price (RM)" />
                                    <p className="text-gray-700">{order.total_price ? `RM ${order.total_price}` : "Free"}</p>
                                </div>
                            </div>

                            {/* City */}
                            <div className="flex items-center space-x-3">
                                <MapPinIcon className="h-6 w-6 text-red-500" />
                                <div>
                                    <InputLabel value="City" />
                                    <p className="text-gray-700">{order.city}</p>
                                </div>
                            </div>

                            {/* Phone number */}
                            <div className="flex items-center space-x-3">
                                <DevicePhoneMobileIcon className="h-6 w-6 text-yellow-500" />
                                <div>
                                    <InputLabel value="Phone Number" />
                                    <p className="text-gray-700">{order.phonenumber}</p>
                                </div>
                            </div>

                            {/* Order Create */}
                            <div className="flex items-center space-x-3">
                                <ClockIcon className="h-6 w-6 text-yellow-500" />
                                <div>
                                    <InputLabel value="Created At" />
                                    <p className="text-gray-700">{order.created_at}</p>
                                </div>
                            </div>

                            {/* Status Shipping */}
                            <div className="flex items-center space-x-3">
                                {order.shipping_status === "pending" && (
                                    <>
                                        <ClockIcon className="h-6 w-6 text-yellow-500" />
                                        <div>
                                            <InputLabel value="Status" />
                                            <p className="text-yellow-500 font-semibold">Pending</p>
                                        </div>
                                    </>
                                )}
                                {order.shipping_status === "shipped" && (
                                    <>
                                        <TruckIcon className="h-6 w-6 text-blue-500" />
                                        <div>
                                            <InputLabel value="Status" />
                                            <p className="text-blue-500 font-semibold">Shipped</p>
                                        </div>
                                    </>
                                )}
                                {order.shipping_status === "delivered" && (
                                    <>
                                        <CheckCircleIcon className="h-6 w-6 text-green-600" />
                                        <div>
                                            <InputLabel value="Status" />
                                            <p className="text-green-600 font-semibold">Delivered</p>
                                        </div>
                                    </>
                                )}
                                {order.shipping_status === "cancelled" && (
                                    <>
                                        <XCircleIcon className="h-6 w-6 text-red-600" />
                                        <div>
                                            <InputLabel value="Status" />
                                            <p className="text-red-600 font-semibold">Cancelled</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 text-right">
                        <button
                            onClick={() => document.getElementById(`my_modal_2${order.id}`).close()}
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
