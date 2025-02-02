import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    Menu, 
    X, 
    LayoutGrid,
    Box,
    UserCircle2,
    ShoppingBag,
    Wallet,
    BookOpen,
    Newspaper,
    CalendarCheck,
    MessageSquare,
    Award,
    Clipboard,
    HeartHandshake,
    HomeIcon,
    CalendarDays,
    BookmarkCheck
} from 'lucide-react';
import Dropdown from '@/Components/Dropdown';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function AuthenticatedLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { auth } = usePage().props;
    const user = auth.user;

    // Profile route based on user type
    const profileRoute = user.usertype === 'admin' ? 'admin.profile' : 'profile.edit';

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navbar */}
            <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-10">
                <div className="px-4 h-16 flex items-center justify-between">
                    {/* Left side */}
                    <div className="flex items-center">
                        <button 
                            onClick={() => setSidebarOpen(!sidebarOpen)} 
                            className="p-2 hover:bg-gray-100 rounded-md transition-colors duration-200"
                        >
                            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <Link href="/dashboard" className="ml-4">
                            <ApplicationLogo className="h-9 w-auto" />
                        </Link>
                    </div>

                    {/* Right side - Profile Dropdown */}
                    <div className="flex items-center gap-4">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                                    {/* Profile Image */}
                                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200">
                                        {user.profile_photo_url ? (
                                            <img
                                                src={user.profile_photo_url}
                                                alt={user.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                                <span className="text-gray-600 text-sm">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <span>{user.name}</span>
                                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route(profileRoute)}>Profile</Dropdown.Link>
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
                            <SidebarLink href={route('admin.dashboard')} icon={LayoutGrid}>
                                Dashboard
                            </SidebarLink>
                            <SidebarLink href={route('admin.products')} icon={Box}>
                                Products
                            </SidebarLink>
                            <SidebarLink href={route('admin.programs')} icon={CalendarDays}>
                                Events
                            </SidebarLink>
                            <SidebarLink href={route('admin.users')} icon={UserCircle2}>
                                Users
                            </SidebarLink>
                            <SidebarLink href={route('admin.orders')} icon={ShoppingBag}>
                                Orders
                            </SidebarLink>
                            <SidebarLink href={route('admin.payments')} icon={Wallet}>
                                Payments
                            </SidebarLink>
                            <SidebarLink href={route('admin.blogs')} icon={BookOpen}>
                                Blog
                            </SidebarLink>
                            <SidebarLink href={route('admin.stories')} icon={Newspaper}>
                                Stories
                            </SidebarLink>
                            <SidebarLink href={route('admin.registration')} icon={CalendarCheck}>
                                Event Registration
                            </SidebarLink>
                            <SidebarLink href={route('admin.event-feedbacks')} icon={MessageSquare}>
                                Event Feedback
                            </SidebarLink>
                            <SidebarLink href={route('admin.membership')} icon={Award}>
                                Membership
                            </SidebarLink>
                            <SidebarLink href={route('admin.plans')} icon={Clipboard}>
                                Plan
                            </SidebarLink>
                            <SidebarLink href={route('admin.donate')} icon={HeartHandshake}>
                                Donate
                            </SidebarLink>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            <SidebarLink href={route('dashboard')} icon={LayoutGrid}>
                                Dashboard
                            </SidebarLink>
                            <SidebarLink href={route('user.bookings')} icon={BookmarkCheck}>
                                Bookings
                            </SidebarLink>
                            <SidebarLink href={route('user.orders')} icon={ShoppingBag}>
                                Orders
                            </SidebarLink>
                            {user.has_active_membership && (
                                <SidebarLink href={route('stories.my-stories')} icon={Newspaper}>
                                    Your Stories
                                </SidebarLink>
                            )}
                            <SidebarLink href={route('home-page')} icon={HomeIcon}>
                                Homepage
                            </SidebarLink>
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

// Enhanced SidebarLink Component with new styling
function SidebarLink({ href, icon: Icon, children }) {
    const isActive = route().current(href.split('.').slice(-1)[0]);
    
    return (
        <Link
            href={href}
            className={`flex items-center px-4 py-2 text-sm font-medium transition-all duration-200 relative group ${
                isActive
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 pl-3'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent pl-3 hover:border-gray-300'
            }`}
        >
            <Icon className={`w-5 h-5 mr-3 transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
            }`} />
            <span className="truncate">{children}</span>
        </Link>
    );
}