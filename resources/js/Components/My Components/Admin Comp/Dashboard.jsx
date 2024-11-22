import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import {
    Users,
    Calendar,
    ShoppingBag,
    Activity,
    Heart,
    DollarSign,
    MessageSquare,
    AlertCircle,
} from 'lucide-react';



export default function Dashboard({totalProduct, totalEvent, totalUser}) {
    // Mock data
    const stats = {
        totalUsers: totalUser,
        totalEvents: totalEvent,
        totalProducts: totalProduct,
        pendingRequests: 12,
        eventsJoined: 3,
        upcomingEvents: 2,
        myProducts: 4,
        supportGroups: 2,
    };

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className="bg-white rounded-lg shadow overflow-hidden flex-1">
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">{title}</p>
                        <h3 className="text-2xl font-bold mt-2">{value}</h3>
                    </div>
                    <div className={`p-3 rounded-full ${color}`}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <StatCard
                            title="Total Users"
                            value={stats.totalUsers}
                            icon={Users}
                            color="bg-blue-500"
                        />
                        <StatCard
                            title="Total Events"
                            value={stats.totalEvents}
                            icon={Calendar}
                            color="bg-green-500"
                        />
                        <StatCard
                            title="Total Products"
                            value={stats.totalProducts}
                            icon={ShoppingBag}
                            color="bg-purple-500"
                        />
                        <StatCard
                            title="Pending Requests (tiada data lagi)"
                            value={stats.pendingRequests}
                            icon={AlertCircle}
                            color="bg-orange-500"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
                                {/* <div className="space-y-4">
                                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                        <div className="flex items-center gap-3">
                                            <Users className="w-5 h-5 text-blue-500" />
                                            <span>New user registration</span>
                                        </div>
                                        <span className="text-sm text-gray-500">2m ago</span>
                                    </div>
                                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                        <div className="flex items-center gap-3">
                                            <ShoppingBag className="w-5 h-5 text-purple-500" />
                                            <span>New product listed</span>
                                        </div>
                                        <span className="text-sm text-gray-500">15m ago</span>
                                    </div>
                                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                        <div className="flex items-center gap-3">
                                            <Calendar className="w-5 h-5 text-green-500" />
                                            <span>Event registration</span>
                                        </div>
                                        <span className="text-sm text-gray-500">1h ago</span>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="p-4 bg-blue-50 rounded-lg flex flex-col items-center gap-2 hover:bg-blue-100">
                                        <Link href={route('admin.programs')} className="flex flex-col items-center gap-2 text-blue-500">
                                            <Calendar className="w-6 h-6" />
                                            <span>Create Event</span>
                                        </Link>
                                    </button>
                                    <button className="p-4 bg-purple-50 rounded-lg flex flex-col items-center gap-2 hover:bg-purple-100">
                                        <Link href={route('admin.products')} className="flex flex-col items-center gap-2 text-purple-500">
                                            <ShoppingBag className="w-6 h-6" />
                                            <span>Add Product</span>
                                        </Link>
                                    </button>
                                    {/* <button className="p-4 bg-green-50 rounded-lg flex flex-col items-center gap-2 hover:bg-green-100">
                                        <MessageSquare className="w-6 h-6 text-green-500" />
                                        <span>Support Chat</span>
                                    </button>
                                    <button className="p-4 bg-orange-50 rounded-lg flex flex-col items-center gap-2 hover:bg-orange-100">
                                        <DollarSign className="w-6 h-6 text-orange-500" />
                                        <span>Donations</span>
                                    </button> */}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}