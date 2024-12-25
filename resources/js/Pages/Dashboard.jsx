import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { UserCircle2, Settings, Box, Calendar, BookOpen, AlertCircle, Mail, Phone, MapPin, Users, CheckCircle2, ArrowRight  } from 'lucide-react';

export default function Dashboard({ auth, orders, bookings, stories }) {
    const user = auth.user;
    const { post, processing } = useForm();

    // Debug what we're receiving
    console.log('User data:', user);

    const getUserTypeBadgeColor = (survivorshipStatus) => {
        if (!survivorshipStatus) return 'bg-gray-100 text-gray-800';
        
        switch (survivorshipStatus.toLowerCase()) {
            case 'patient':
                return 'bg-blue-100 text-blue-800';
            case 'parent':
                return 'bg-purple-100 text-purple-800';
            case 'guardian':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatSurvivorshipStatus = (status) => {
        if (!status) return 'Not Specified';
        return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    };

    const cancelMembership = () => {
        post(route('membership.cancel'), {
            onFinish: () => {
                // Handle any additional logic after cancellation
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Profile Section */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6 transform hover:shadow-lg transition-all duration-300">
                        <div className="p-6 relative overflow-hidden">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-5">
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100"></div>
                                <div className="h-full w-full bg-grid-pattern"></div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-4 relative z-10">
                                {/* Profile Photo with Animation */}
                                <div className="flex-shrink-0 group">
                                    {user.profile_photo_url ? (
                                        <div className="relative transform hover:scale-105 transition-all duration-300">
                                            <img 
                                                src={user.profile_photo_url} 
                                                alt={user.name}
                                                className="w-24 h-24 rounded-full object-cover ring-4 ring-purple-100 group-hover:ring-purple-200 transition-all"
                                            />
                                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 animate-pulse"></div>
                                        </div>
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center transform hover:scale-105 transition-all duration-300 group-hover:from-purple-100 group-hover:to-blue-100">
                                            <UserCircle2 className="w-16 h-16 text-gray-400 group-hover:text-gray-500 transition-colors" />
                                        </div>
                                    )}
                                </div>

                                {/* User Information */}
                                <div className="flex-1 space-y-4">
                                    {/* Basic Info with hover effects */}
                                    <div className="transform hover:translate-x-1 transition-transform duration-300">
                                        <h2 className="text-2xl font-bold text-gray-900 group-hover:text-gray-800">{user.name}</h2>
                                        <div className="flex flex-wrap items-center gap-2 mt-1">
                                            <span className={`px-3 py-1 text-sm font-medium rounded-full transform hover:scale-105 transition-all duration-300
                                                ${user.usertype === 'patient' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'}`}>
                                                {user.usertype}
                                            </span>
                                            {user.has_active_membership && (
                                                <span className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transform hover:scale-105 transition-all duration-300">
                                                    Premium Member ✨
                                                </span>
                                            )}
                                        </div>
                                        {/* Update Profile Button */}
        
                                        <a href={route('profile.edit')}
                                            className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transform hover:scale-105 transition-all duration-300 shadow-sm hover:shadow group"
                                        >
                                            <span>Update Profile</span>
                                            <Settings className="w-4 h-4 ml-2 transform group-hover:rotate-90 transition-transform duration-300" />
                                        </a>
                                    </div>

                                    {/* Contact Information with hover animations */}
                                    <div className="space-y-2 group">
                                        <div className="flex items-center space-x-2 hover:translate-x-1 transition-transform duration-300">
                                            <div className="p-2 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors">
                                                <Mail className="w-4 h-4 text-gray-500" />
                                            </div>
                                            <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{user.email}</span>
                                        </div>
                                        {user.phone && (
                                            <div className="flex items-center space-x-2 hover:translate-x-1 transition-transform duration-300">
                                                <div className="p-2 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors">
                                                    <Phone className="w-4 h-4 text-gray-500" />
                                                </div>
                                                <span className="text-gray-600 group-hover:text-gray-900 transition-colors">{user.phone}</span>
                                            </div>
                                        )}
                                        {user.age && (
                                            <div className="flex items-center space-x-2 hover:translate-x-1 transition-transform duration-300">
                                                <div className="p-2 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors">
                                                    <UserCircle2 className="w-4 h-4 text-gray-500" />
                                                </div>
                                                <span className="text-gray-600 group-hover:text-gray-900 transition-colors">Age: {user.age}</span>
                                            </div>
                                        )}
                                        {(user.address_1 || user.address_2 || user.city || user.state || user.postcode || user.country) && (
                                            <div className="flex items-start space-x-2 hover:translate-x-1 transition-transform duration-300">
                                                <div className="p-2 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors mt-1">
                                                    <MapPin className="w-4 h-4 text-gray-500" />
                                                </div>
                                                <div className="text-gray-600 group-hover:text-gray-900 transition-colors">
                                                    {user.address_1 && <div className="hover:text-gray-900">{user.address_1}</div>}
                                                    {user.address_2 && <div className="hover:text-gray-900">{user.address_2}</div>}
                                                    {(user.city || user.state || user.postcode) && (
                                                        <div className="hover:text-gray-900">
                                                            {[user.city, user.state, user.postcode].filter(Boolean).join(', ')}
                                                        </div>
                                                    )}
                                                    {user.country && <div className="hover:text-gray-900">{user.country}</div>}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Membership Information with enhanced styling */}
                                    {user.has_active_membership && (
                                        <div className="mt-4 space-y-2 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg transform hover:scale-[1.02] transition-all duration-300 shadow-sm hover:shadow">
                                            <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                                                <span>Membership Status</span>
                                                <span className="inline-block animate-pulse">✨</span>
                                            </h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-white/50 p-3 rounded-lg hover:bg-white/80 transition-colors">
                                                    <p className="text-sm text-gray-600">Start Date</p>
                                                    <p className="font-medium text-gray-900">{new Date(user.membership.start_date).toLocaleDateString()}</p>
                                                </div>
                                                <div className="bg-white/50 p-3 rounded-lg hover:bg-white/80 transition-colors">
                                                    <p className="text-sm text-gray-600">End Date</p>
                                                    <p className="font-medium text-gray-900">{new Date(user.membership.end_date).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={cancelMembership}
                                                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300 w-full transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                                disabled={processing}
                                            >
                                                <span>{processing ? 'Processing...' : 'Cancel Membership'}</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {/* Orders Card */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg transform hover:scale-105 transition-all duration-300">
                            <div className="p-6 relative overflow-hidden group">
                                {/* Animated Background */}
                                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 transform rotate-12"></div>
                                    <div className="h-full w-full bg-grid-pattern"></div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className="flex items-center">
                                        <div className="p-3 rounded-full bg-blue-100 mr-4 transform group-hover:scale-110 transition-transform duration-300">
                                            <Box className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">Total Orders</p>
                                            <p className="text-2xl font-semibold text-gray-900">{orders.length}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Decoration */}
                                <div className="absolute top-4 right-4 transform rotate-45 opacity-20 group-hover:rotate-90 transition-transform duration-500">
                                    <div className="w-8 h-8 border-2 border-blue-400"></div>
                                </div>
                            </div>
                        </div>

                        {/* Bookings Card */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg transform hover:scale-105 transition-all duration-300">
                            <div className="p-6 relative overflow-hidden group">
                                {/* Animated Background */}
                                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 transform rotate-12"></div>
                                    <div className="h-full w-full bg-grid-pattern"></div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className="flex items-center">
                                        <div className="p-3 rounded-full bg-green-100 mr-4 transform group-hover:scale-110 transition-transform duration-300">
                                            <Calendar className="h-6 w-6 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-600">Active Bookings</p>
                                            <p className="text-2xl font-semibold text-gray-900">
                                                {bookings.filter(b => b.status === 'registered').length}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Decoration */}
                                <div className="absolute bottom-4 left-4 transform rotate-45 opacity-20 group-hover:-rotate-45 transition-transform duration-500">
                                    <div className="w-8 h-8 bg-green-400"></div>
                                </div>
                            </div>
                        </div>

                        {/* Stories Card */}
                        {user.has_active_membership && (
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg transform hover:scale-105 transition-all duration-300">
                                <div className="p-6 relative overflow-hidden group">
                                    {/* Animated Background */}
                                    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 transform rotate-12"></div>
                                        <div className="h-full w-full bg-grid-pattern"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        <div className="flex items-center">
                                            <div className="p-3 rounded-full bg-purple-100 mr-4 transform group-hover:scale-110 transition-transform duration-300">
                                                <BookOpen className="h-6 w-6 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">Approved Stories</p>
                                                <p className="text-2xl font-semibold text-gray-900">
                                                    {stories.filter(s => s.status === 'approved').length}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decoration */}
                                    <div className="absolute top-4 right-4 transform rotate-45 opacity-20 group-hover:rotate-90 transition-transform duration-500">
                                        <div className="w-8 h-8 border-2 border-purple-400"></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Exclusive Community */}
                        {user.has_active_membership && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg transform hover:scale-105 transition-all duration-300">
                            {/* <div className="p-6 relative overflow-hidden group">
                               
                                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 transform rotate-12"></div>
                                    <div className="h-full w-full bg-grid-pattern"></div>
                                </div>

                                
                                <div className="relative z-10">
                                    <div className="flex items-center mb-4 space-x-3">
                                        <div className="p-3 rounded-full bg-purple-100 transform group-hover:scale-110 transition-transform duration-300">
                                            <Users className="h-6 w-6 text-purple-600" />
                                        </div>
                                        <h3 className="font-semibold text-xl">Community Access</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-gray-600">
                                            Join our exclusive member community to:
                                        </p>
                                        
                                        <ul className="space-y-2">
                                            {[
                                                'Connect with other members',
                                                'Share experiences',
                                                'Get support and advice',
                                                // 'Access exclusive resources'
                                            ].map((benefit, index) => (
                                                <li 
                                                    key={index}
                                                    className="flex items-center space-x-2 transform hover:translate-x-2 transition-transform duration-300"
                                                >
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    <span className="text-gray-700">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        
                                        <a  href={route('community.index')}
                                            className="mt-4 group inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg 
                                                    hover:bg-purple-700 transform hover:-translate-y-1 transition-all duration-300"
                                        >
                                            <span>Join Community</span>
                                            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                                        </a>


                                        <div className="mt-4 flex items-center text-sm text-gray-500">
                                            <div className="flex -space-x-2 mr-2">
                                                {[...Array(3)].map((_, i) => (
                                                    <div 
                                                        key={i}
                                                        className={`w-6 h-6 rounded-full border-2 border-white 
                                                                ${['bg-pink-400', 'bg-purple-400', 'bg-indigo-400'][i]}`}
                                                    >
                                                    </div>
                                                ))}
                                            </div>
                                            <span>20+ members online</span>
                                        </div>
                                    </div>
                                </div> 

                                <div className="absolute top-4 right-4 transform rotate-45 opacity-20 group-hover:rotate-90 transition-transform duration-500">
                                    <div className="w-12 h-12 border-2 border-purple-400"></div>
                                </div>
                                <div className="absolute bottom-4 left-4 transform rotate-45 opacity-20 group-hover:-rotate-45 transition-transform duration-500">
                                    <div className="w-8 h-8 bg-purple-400"></div>
                                </div>
                            </div> */}
                        </div>
                    )}
                    </div>

                    {/* Recent Activity Section */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                            {!orders.length && !bookings.length ? (
                                <div className="text-center py-6">
                                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600">No recent activity to display</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {/* Recent Orders */}
                                    {orders.slice(0, 3).map(order => (
                                        <div key={order.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                                            <Box className="h-5 w-5 text-blue-600 mr-3" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    Order #{order.ordernumber}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Total: RM{order.total_price}
                                                </p>
                                            </div>
                                            <span className={`ml-auto px-2 py-1 text-xs font-medium rounded-full 
                                                ${order.status === 'paid' ? 'bg-green-100 text-green-800' : 
                                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                                'bg-red-100 text-red-800'}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                    ))}

                                    {/* Recent Bookings */}
                                    {bookings.slice(0, 3).map(booking => (
                                        <div key={booking.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                                            <Calendar className="h-5 w-5 text-green-600 mr-3" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {booking.event.title}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {booking.event.start_date}
                                                </p>
                                            </div>
                                            <span className={`ml-auto px-2 py-1 text-xs font-medium rounded-full 
                                                ${booking.status === 'registered' ? 'bg-green-100 text-green-800' : 
                                                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                                'bg-red-100 text-red-800'}`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}