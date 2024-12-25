// Resources/js/Pages/Community/Index.jsx
import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Facebook, MessageCircle } from 'lucide-react';

export default function CommunityIndex({ auth, groups }) {
    const getIcon = (type) => {
        switch (type) {
            case 'facebook':
                return <Facebook className="w-6 h-6" />;
            case 'whatsapp':
                return <MessageCircle className="w-6 h-6" />;
            default:
                return null;
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Member Community</h2>}
        >
            <Head title="Member Community" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Welcome Section */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Welcome to Our Community!
                        </h3>
                        <p className="text-gray-600">
                            Connect with fellow members in our online communities. Join our groups to share experiences, 
                            ask questions, and support each other.
                        </p>
                    </div>

                    {/* Groups Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {groups.map((group) => (
                            <div key={group.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        {getIcon(group.type)}
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {group.name}
                                        </h3>
                                    </div>
                                    <p className="text-gray-600 mb-6">
                                        {group.description}
                                    </p>
                                    <a
                                        href={group.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full"
                                    >
                                        Join Group
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Community Guidelines */}
                    <div className="mt-12 bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Community Guidelines
                        </h3>
                        <ul className="space-y-2 text-gray-600">
                            <li>• Be respectful and supportive of other members</li>
                            <li>• Keep discussions related to cancer support and recovery</li>
                            <li>• Protect your privacy and that of others</li>
                            <li>• Report any inappropriate behavior to moderators</li>
                        </ul>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
    );
}