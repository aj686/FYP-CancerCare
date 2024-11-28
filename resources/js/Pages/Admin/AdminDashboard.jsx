import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Dashboard from '@/Components/My Components/Admin Comp/Dashboard';




export default function AdminDashboard({products, productCount,  events, eventCount, users, userCount}) {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}
        >
            <Head title=" Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Dashboard userType="admin" 
                        totalProduct = {productCount}
                        totalEvent = {eventCount}
                        totalUser = {userCount}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


