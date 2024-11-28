// resources/js/Layouts/DashboardLayout.jsx
import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X, LayoutDashboard, Package, Users, ShoppingCart, CreditCard, FileText, Calendar, Ticket, Home } from 'lucide-react';
import Dropdown from '@/Components/Dropdown';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navbar */}
            <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-10">
                <div className="px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-md">
                            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <Link href="/" className="ml-4">
                            <ApplicationLogo className="h-9 w-auto" />
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                                    <span>{user.name}</span>
                                    <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 ${
                sidebarOpen ? 'w-64' : 'w-0 -translate-x-full'
            }`}>
                <nav className="p-4 overflow-y-auto h-full">
                    {auth.user.usertype === 'admin' ? (
                        <div className="space-y-1">
                            <SidebarLink href={route('admin.dashboard')} icon={LayoutDashboard}>Dashboard</SidebarLink>
                            <SidebarLink href={route('admin.products')} icon={Package}>Products</SidebarLink>
                            <SidebarLink href={route('admin.users')} icon={Users}>Users</SidebarLink>
                            <SidebarLink href={route('admin.orders')} icon={ShoppingCart}>Orders</SidebarLink>
                            <SidebarLink href={route('admin.payments')} icon={CreditCard}>Payments</SidebarLink>
                            <SidebarLink href={route('admin.blogs')} icon={FileText}>Blog</SidebarLink>
                            <SidebarLink href={route('admin.registration')} icon={Calendar}>Event Registration</SidebarLink>
                            <SidebarLink href={route('admin.membership')} icon={Ticket}>Membership</SidebarLink>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            <SidebarLink href={route('dashboard')} icon={LayoutDashboard}>Dashboard</SidebarLink>
                            <SidebarLink href={route('user.bookings')} icon={Calendar}>Bookings</SidebarLink>
                            <SidebarLink href={route('user.orders')} icon={ShoppingCart}>Orders</SidebarLink>
                            <SidebarLink href={route('home-page')} icon={Home}>Homepage</SidebarLink>
                        </div>
                    )}
                </nav>
            </aside>

            {/* Main Content */}
            <main className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}

function SidebarLink({ href, icon: Icon, children }) {
    const isActive = route().current(href.split('.').slice(-1)[0]);
    
    return (
        <Link
            href={href}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
        >
            <Icon className="w-5 h-5 mr-3" />
            {children}
        </Link>
    );
}