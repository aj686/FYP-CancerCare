import { Head, Link } from '@inertiajs/react';
import {
    Users,
    Calendar,
    ShoppingBag,
    AlertCircle,
    MessageSquare,
    DollarSign,
    TrendingUp,
    Activity,
    BarChart2
} from 'lucide-react';

export default function Dashboard({totalProduct, totalEvent, totalUser}) {
    const stats = {
        totalUsers: totalUser,
        totalEvents: totalEvent,
        totalProducts: totalProduct,
        pendingRequests: 12,
    };

    const StatCard = ({ title, value, icon: Icon, color, trend }) => (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex-1 transform transition-all duration-300 hover:scale-105">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-sm text-gray-600 font-medium">{title}</p>
                        <h3 className="text-3xl font-bold mt-2">{value}</h3>
                        {trend && (
                            <p className="text-sm text-green-500 mt-2 flex items-center">
                                <TrendingUp className="w-4 h-4 mr-1" />
                                +{trend}% from last month
                            </p>
                        )}
                    </div>
                    <div className={`p-4 rounded-xl ${color} transform transition-all duration-300 hover:scale-110`}>
                        <Icon className="w-8 h-8 text-white" />
                    </div>
                </div>
                <div className="mt-4 h-2 bg-gray-200 rounded-full">
                    <div className={`h-2 ${color.replace('bg-', 'bg-opacity-80 bg-')} rounded-full`} style={{width: '70%'}}></div>
                </div>
            </div>
        </div>
    );

    const AnalyticsCard = ({ title, value, change, icon: Icon, color }) => (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {change >= 0 ? '+' : ''}{change}%
                </span>
            </div>
            <h3 className="text-xl font-semibold mt-4">{value}</h3>
            <p className="text-gray-600 text-sm">{title}</p>
        </div>
    );

    return (
        <div className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {/* Main Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Users"
                        value={stats.totalUsers}
                        icon={Users}
                        color="bg-blue-500"
                        // trend="12"
                    />
                    <StatCard
                        title="Total Events"
                        value={stats.totalEvents}
                        icon={Calendar}
                        color="bg-green-500"
                        // trend="8"
                    />
                    <StatCard
                        title="Total Products"
                        value={stats.totalProducts}
                        icon={ShoppingBag}
                        color="bg-purple-500"
                        // trend="15"
                    />
                    {/* <StatCard
                        title="Pending Requests"
                        value={stats.pendingRequests}
                        icon={AlertCircle}
                        color="bg-orange-500"
                        trend="5"
                    /> */}
                </div>

                {/* Analytics Section */}
                {/* <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Analytics Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <AnalyticsCard
                            title="Active Users"
                            value="1,243"
                            change={28}
                            icon={Activity}
                            color="bg-indigo-500"
                        />
                        <AnalyticsCard
                            title="Conversion Rate"
                            value="64%"
                            change={-12}
                            icon={BarChart2}
                            color="bg-pink-500"
                        />
                        <AnalyticsCard
                            title="Avg. Event Participants"
                            value="38"
                            change={15}
                            icon={Users}
                            color="bg-teal-500"
                        />
                        <AnalyticsCard
                            title="Product Sales"
                            value="$12,430"
                            change={32}
                            icon={DollarSign}
                            color="bg-yellow-500"
                        />
                    </div>
                </div> */}

                {/* Action Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-800">Quick Actions</h2>
                                <button className="text-blue-500 hover:text-blue-600">View All</button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Link 
                                    href={route('admin.programs')}
                                    className="group p-6 bg-blue-50 rounded-xl flex flex-col items-center gap-3 hover:bg-blue-100 transition-all duration-300"
                                >
                                    <div className="p-4 bg-blue-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                                        <Calendar className="w-8 h-8 text-white" />
                                    </div>
                                    <span className="font-semibold text-blue-700">Create Event</span>
                                </Link>
                                <Link 
                                    href={route('admin.products')}
                                    className="group p-6 bg-purple-50 rounded-xl flex flex-col items-center gap-3 hover:bg-purple-100 transition-all duration-300"
                                >
                                    <div className="p-4 bg-purple-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                                        <ShoppingBag className="w-8 h-8 text-white" />
                                    </div>
                                    <span className="font-semibold text-purple-700">Add Product</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-800">Recent Activities</h2>
                                <button className="text-blue-500 hover:text-blue-600">See All</button>
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100 transition-colors duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <Users className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">New User Registration</p>
                                            <p className="text-sm text-gray-500">John Doe joined the platform</p>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500">2m ago</span>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-between hover:bg-gray-100 transition-colors duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <Calendar className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium">New Event Created</p>
                                            <p className="text-sm text-gray-500">Charity Walk 2024</p>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500">1h ago</span>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}