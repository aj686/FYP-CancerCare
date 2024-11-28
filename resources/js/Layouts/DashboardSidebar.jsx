// resources/js/Components/DashboardSidebar.jsx
import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Package, Users, ShoppingCart, CreditCard, FileText, UserCircle, Calendar, Ticket, Home } from 'lucide-react';

export default function DashboardSidebar() {
    const { auth } = usePage().props;

    return (
        <aside className="fixed left-0 top-16 h-full w-64 bg-white border-r border-gray-200">
            <nav className="p-4">
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