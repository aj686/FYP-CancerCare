import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { Dialog } from '@headlessui/react';

export default function StoryView({ auth, story }) {
    const [approveModal, setApproveModal] = useState(false);
    const [rejectModal, setRejectModal] = useState(false);
    const [adminNotes, setAdminNotes] = useState('');
    const [processing, setProcessing] = useState(false);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusBadge = (status) => {
        const styles = {
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
            pending: 'bg-yellow-100 text-yellow-800'
        };

        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status] || styles.pending}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const handleStatusUpdate = async (status) => {
        setProcessing(true);
        try {
            await router.patch(route('admin.stories.update-status', story.id), {
                status,
                admin_notes: adminNotes
            }, {
                onSuccess: () => {
                    if (status === 'approved') setApproveModal(false);
                    if (status === 'rejected') setRejectModal(false);
                    setAdminNotes('');
                }
            });
        } catch (error) {
            console.error('Error updating story status:', error);
        }
        setProcessing(false);
    };

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this story? This cannot be undone.')) {
            await router.delete(route('admin.stories.destroy', story.id), {
                onSuccess: () => {
                    router.visit(route('admin.stories')); // Redirect to stories list
                }
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">View Story</h2>}
        >
            <Head title={`Story - ${story.title}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <button
                        onClick={() => router.visit(route('admin.stories'))}
                        className="mb-4 inline-flex items-center text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Stories
                    </button>

                    {/* Story Header Card */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{story.title}</h1>
                                    <p className="text-gray-600">By {story.user.name}</p>
                                    <p className="text-gray-500 text-sm">{story.user.email}</p>
                                </div>
                                <div className="text-right">
                                    <div className="mb-2">{getStatusBadge(story.status)}</div>
                                    <p className="text-sm text-gray-500">
                                        Submitted on {formatDate(story.created_at)}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {story.status === 'pending' && (
                                <div className="flex space-x-4 mt-4">
                                    <button
                                        onClick={() => setApproveModal(true)}
                                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                    >
                                        <CheckCircleIcon className="w-4 h-4 mr-2" />
                                        Approve Story
                                    </button>
                                    <button
                                        onClick={() => setRejectModal(true)}
                                        className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                    >
                                        <XCircleIcon className="w-4 h-4 mr-2" />
                                        Reject Story
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Story Content Card */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {story.thumbnail && (
                                <div className="mb-6">
                                    <img
                                        src={`/storage/${story.thumbnail}`}
                                        alt={story.title}
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                </div>
                            )}
                            
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Cancer Type</h3>
                                    <p className="text-gray-700">{story.cancer_type}</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Story</h3>
                                    <div className="prose max-w-none">
                                        <div dangerouslySetInnerHTML={{ __html: story.content }} />
                                    </div>
                                </div>

                                {story.admin_notes && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Admin Notes</h3>
                                        <p className="text-gray-700">{story.admin_notes}</p>
                                    </div>
                                )}
                            </div>

                            {/* Delete Button */}
                            <div className="mt-8 pt-6 border-t">
                                <button
                                    onClick={handleDelete}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Delete Story
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                                placeholder="Add reason for rejection (required)"
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
                                disabled={processing || !adminNotes.trim()}
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