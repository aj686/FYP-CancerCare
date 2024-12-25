import React, { useState, useEffect } from 'react'; // Add missing imports
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react'; // Add missing import for router
import { PencilIcon, TrashIcon, CheckCircleIcon, XCircleIcon, Eye } from 'lucide-react';
import { Dialog } from '@headlessui/react';

export default function Story({ auth, stories, count }) {
    const [viewModal, setViewModal] = useState(false);
    const [approveModal, setApproveModal] = useState(false);
    const [rejectModal, setRejectModal] = useState(false);
    const [selectedStory, setSelectedStory] = useState(null);
    const [adminNotes, setAdminNotes] = useState('');
    const [processing, setProcessing] = useState(false);

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

    const handleView = (story) => {
        // setSelectedStory(story);
        // setViewModal(true);

        // this line to navigate to StoryView
        router.visit(route('admin.stories.view', story.id));
    };

    const handleApproveClick = (story) => {
        setSelectedStory(story);
        setApproveModal(true);
    };

    const handleRejectClick = (story) => {
        setSelectedStory(story);
        setRejectModal(true);
    };

    const handleStatusUpdate = async (status) => {
        setProcessing(true);
        try {
            await router.patch(route('admin.stories.update-status', selectedStory.id), {
                status,
                admin_notes: adminNotes
            }, {
                onSuccess: () => {
                    setApproveModal(false);
                    setRejectModal(false);
                    setSelectedStory(null);
                    setAdminNotes('');
                }
            });
        } catch (error) {
            console.error('Error updating story status:', error);
        }
        setProcessing(false);
    };

    const handleDelete = async (storyId) => {
        if (confirm('Are you sure you want to delete this story?')) {
            await router.delete(route('admin.stories.destroy', storyId));
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User Stories</h2>}
        >
            <Head title="User Stories" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Header Section */}
                        <div className="p-6 flex justify-between items-center border-b">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">User Stories Management</h3>
                                <p className="text-sm text-gray-600">
                                    Total Stories: {count === 0 ? "No stories yet" : count}
                                </p>
                            </div>
                        </div>

                        {/* Table Section */}
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cancer Type</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {stories.map((story) => (
                                            <tr key={story.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{story.user.name}</div>
                                                    <div className="text-sm text-gray-500">{story.user.email}</div>
                                                </td>
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
                                                    {formatDate(story.created_at)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-3">
                                                        <button
                                                            onClick={() => handleView(story)}
                                                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                            <span>View</span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleApproveClick(story)}
                                                            className="text-green-600 hover:text-green-900 flex items-center gap-1"
                                                            disabled={story.status === 'approved'}
                                                        >
                                                            <CheckCircleIcon className="h-4 w-4" />
                                                            <span>Approve</span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleRejectClick(story)}
                                                            className="text-red-600 hover:text-red-900 flex items-center gap-1"
                                                            disabled={story.status === 'rejected'}
                                                        >
                                                            <XCircleIcon className="h-4 w-4" />
                                                            <span>Reject</span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(story.id)}
                                                            className="text-red-600 hover:text-red-900 flex items-center gap-1"
                                                        >
                                                            <TrashIcon className="h-4 w-4" />
                                                            <span>Delete</span>
                                                        </button>
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

            {/* View Modal */}
            {/* <Dialog open={viewModal} onClose={() => setViewModal(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto max-w-3xl rounded bg-white p-6 w-full">
                        <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
                            Story Details
                        </Dialog.Title>
                        {selectedStory && (
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold">{selectedStory.title}</h3>
                                    <p className="text-sm text-gray-500">By {selectedStory.user.name}</p>
                                </div>
                                {selectedStory.thumbnail && (
                                    <img 
                                        src={`/storage/${selectedStory.thumbnail}`}
                                        alt={selectedStory.title}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                )}
                                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: selectedStory.content }} />
                                <div className="flex justify-end mt-4">
                                    <button
                                        onClick={() => setViewModal(false)}
                                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </Dialog.Panel>
                </div>
            </Dialog> */}

            {/* Approve Modal */}
            <Dialog open={approveModal} onClose={() => setApproveModal(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto max-w-md rounded bg-white p-6">
                        <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                            Approve Story
                        </Dialog.Title>
                        <div className="mt-4">
                            <textarea
                                className="w-full px-3 py-2 border rounded-md"
                                rows="3"
                                placeholder="Add notes (optional)"
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                            />
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={() => setApproveModal(false)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleStatusUpdate('approved')}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                disabled={processing}
                            >
                                {processing ? 'Approving...' : 'Approve'}
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>

            {/* Reject Modal */}
            <Dialog open={rejectModal} onClose={() => setRejectModal(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto max-w-md rounded bg-white p-6">
                        <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                            Reject Story
                        </Dialog.Title>
                        <div className="mt-4">
                            <textarea
                                className="w-full px-3 py-2 border rounded-md"
                                rows="3"
                                placeholder="Add reason for rejection"
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={() => setRejectModal(false)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleStatusUpdate('rejected')}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                disabled={processing}
                            >
                                {processing ? 'Rejecting...' : 'Reject'}
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>

        </AuthenticatedLayout>
    );
}