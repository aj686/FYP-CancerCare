import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { TrashIcon, MessageSquareIcon } from 'lucide-react';
import { useState } from 'react';
import EventFeedbackModal from './UserComp/EventFeedbackModal';
import { router } from '@inertiajs/react';

export default function Booking({ auth, bookings, count, flash }) {
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const { post, processing } = useForm();

    const handleCancel = (bookingId) => {
        if (confirm('Are you sure you want to cancel this booking?')) {
            post(`/bookings/${bookingId}/cancel`, {
                preserveScroll: true,
                onSuccess: () => {
                    showAlertMessage('Booking cancelled successfully', 'success');
                },
            });
        }
    };

    const showAlertMessage = (message, type = 'success') => {
        setAlertMessage(message);
        setAlertType(type);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    const handleFeedbackClick = (booking) => {
        setSelectedBooking(booking);
        setFeedbackModalOpen(true);
    };

    const handleFeedbackSubmit = async (feedbackData) => {
        router.post(`/event-registrations/${feedbackData.eventRegistrationId}/feedback`, {
            rating: feedbackData.rating,
            comment: feedbackData.comment,
            anonymous: feedbackData.anonymous
        }, {
            preserveScroll: true,
            onSuccess: () => {
                showAlertMessage('Thank you for your feedback!', 'success');
                setFeedbackModalOpen(false);
            },
            onError: () => {
                showAlertMessage('Failed to submit feedback. Please try again.', 'error');
            }
        });
    };

    const canLeaveFeedback = (booking) => {
        return booking.status === 'registered' && 
               booking.event.status === 'completed' && 
               !booking.feedback;
    };

    const isEventExpired = (event) => {
        const currentDate = new Date().toISOString().split('T')[0];
        return event.end_date < currentDate || event.status === 'completed';
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Booking Dashboard</h2>}
        >
            <Head title="Booking" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {showAlert && (
                        <div className={`mb-4 p-4 border rounded ${
                            alertType === 'success' 
                                ? 'bg-green-100 border-green-400 text-green-700' 
                                : 'bg-red-100 border-red-400 text-red-700'
                        }`}>
                            {alertMessage}
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Header Section */}
                        <div className="p-6 flex justify-between items-center border-b">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">My Bookings</h3>
                                <p className="text-sm text-gray-600">
                                    Total Events: {count === 0 ? "No bookings yet" : count}
                                </p>
                            </div>
                        </div>

                        {/* Table Section */}
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {bookings.map((booking) => (
                                            <tr key={booking.event.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.event.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">{booking.event.title}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.event.start_date}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{booking.event.end_date}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{booking.event.price}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                        ${booking.status === 'registered' ? 'bg-green-100 text-green-800' : 
                                                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                                          'bg-red-100 text-red-800'}`}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-3">
                                                        {booking.status !== 'cancelled' && !isEventExpired(booking.event) && (
                                                            <button 
                                                                onClick={() => handleCancel(booking.id)}
                                                                disabled={processing}
                                                                className="flex items-center space-x-1 text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                <TrashIcon className="h-5 w-5" />
                                                                <span>Cancel</span>
                                                            </button>
                                                        )}
                                                        {canLeaveFeedback(booking) && (
                                                            <button 
                                                                onClick={() => handleFeedbackClick(booking)}
                                                                className="flex items-center space-x-1 text-blue-600 hover:text-blue-900"
                                                            >
                                                                <MessageSquareIcon className="h-5 w-5" />
                                                                <span>Feedback</span>
                                                            </button>
                                                        )}
                                                        {booking.feedback && (
                                                            <span className="text-green-600 flex items-center">
                                                                <span className="ml-1">Feedback submitted</span>
                                                            </span>
                                                        )}
                                                        {isEventExpired(booking.event) && !booking.feedback && (
                                                            <span className="text-gray-500 flex items-center">
                                                                <span className="ml-1">Event completed</span>
                                                            </span>
                                                        )}
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

            <EventFeedbackModal
                isOpen={feedbackModalOpen}
                onClose={() => setFeedbackModalOpen(false)}
                onSubmit={handleFeedbackSubmit}
                eventRegistration={selectedBooking}
            />
        </AuthenticatedLayout>
    );
}