import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PencilIcon, TrashIcon, PlusIcon, Clock } from 'lucide-react';
import StoryAdd from './Stories/StoryAdd';
import StoryDelete from './Stories/StoryDelete';
import StoryUpdate from './Stories/StoryUpdate';

export default function MyStories({ auth, stories, count }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Your Stories</h2>}
        >
            <Head title="Your Stories" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Header Section */}
                        <div className="p-6 flex justify-between items-center border-b">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Your Stories</h3>
                                <p className="text-sm text-gray-600">
                                    Total Stories: {count === 0 ? "No stories yet" : count}
                                </p>
                            </div>
                            <StoryAdd className="float-end" />
                        </div>

                        {/* Table Section */}
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cancer Type</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin Notes</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {stories.map((story) => (
                                            <tr key={story.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900">{story.title}</div>
                                                    <div className="text-sm text-gray-500">{story.slug}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{story.cancer_type}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(story.status)}`}>
                                                        {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {formatDate(story.updated_at)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-500">
                                                        {story.admin_notes || '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                        <StoryUpdate 
                                                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                                                            storyId={`story_modal_${story.id}`}
                                                            story={story}
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                            <span>Edit</span>
                                                        </StoryUpdate>

                                                        <StoryDelete 
                                                            className="text-red-600 hover:text-red-900 flex items-center gap-1"
                                                            storyId={`story_delete_${story.id}`}
                                                            story={story}
                                                        >
                                                            <TrashIcon className="h-4 w-4" />
                                                            <span>Delete</span>
                                                        </StoryDelete>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}