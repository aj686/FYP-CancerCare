import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Dashboard from '@/Components/My Components/Admin Comp/Dashboard';
import GrafanaDashboard from '@/Components/My Components/Grafana/GrafanaDashboard';
import DailyUserRegistration from '@/Components/My Components/Grafana/DailyUserRegistration';
import ActiveUsersStats from '@/Components/My Components/Grafana/ActiveUsersStats';




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

                    {/* New Grafana Dashboard */}
                    {/* <GrafanaDashboard 
                        url="//localhost:3000/d-solo/ee727gleyhog0f/new-dashboard?orgId=1&from=1734305361143&to=1734326961143&timezone=browser&panelId=1&__feature.dashboardSceneSolo"
                        title="Analytics Dashboard"
                    />
                    <br />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <DailyUserRegistration />
                        <ActiveUsersStats />
                    </div> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


