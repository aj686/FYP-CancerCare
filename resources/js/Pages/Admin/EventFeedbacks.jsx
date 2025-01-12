import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

export default function EventFeedbacks({ feedbacks, statistics }) {
    // Group feedbacks by event
    const [expandedEvents, setExpandedEvents] = useState([]);

    // Group feedbacks by event and calculate per-event statistics
    const eventGroups = React.useMemo(() => {
        const groups = {};
        feedbacks.forEach(feedback => {
            if (!groups[feedback.event.id]) {
                groups[feedback.event.id] = {
                    event: feedback.event,
                    feedbacks: [],
                    stats: {
                        total: 0,
                        average: 0,
                        anonymous: 0
                    }
                };
            }
            groups[feedback.event.id].feedbacks.push(feedback);
            groups[feedback.event.id].stats.total++;
            groups[feedback.event.id].stats.average += feedback.rating;
            if (feedback.anonymous) groups[feedback.event.id].stats.anonymous++;
        });

        // Calculate averages
        Object.values(groups).forEach(group => {
            group.stats.average = (group.stats.average / group.stats.total).toFixed(1);
        });

        return groups;
    }, [feedbacks]);

    const toggleEvent = (eventId) => {
        setExpandedEvents(prev => 
            prev.includes(eventId)
                ? prev.filter(id => id !== eventId)
                : [...prev, eventId]
        );
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Event Feedback Dashboard</h2>}
        >
            <Head title="Event Feedbacks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700">Total Feedbacks</h3>
                            <p className="text-3xl font-bold text-blue-600">{statistics.total_feedbacks}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700">Average Rating</h3>
                            <p className="text-3xl font-bold text-green-600">{statistics.average_rating} / 5</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700">Events with Feedback</h3>
                            <p className="text-3xl font-bold text-purple-600">{statistics.total_events_with_feedback}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-700">Anonymous Feedbacks</h3>
                            <p className="text-3xl font-bold text-orange-600">{statistics.anonymous_feedback_count}</p>
                        </div>
                    </div>

                    {/* Rating Distribution */}
                    <div className="bg-white shadow rounded-lg mb-6">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
                            <div className="space-y-4">
                                {Object.entries(statistics.feedback_distribution).reverse().map(([rating, count]) => (
                                    <div key={rating} className="flex items-center">
                                        <div className="w-24 flex items-center">
                                            <span className="text-sm font-medium text-gray-700 mr-2">{rating} stars</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div 
                                                    className="bg-yellow-400 h-2.5 rounded-full" 
                                                    style={{ width: `${(count / statistics.total_feedbacks) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div className="w-20 text-right">
                                            <span className="text-sm text-gray-600">{count}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Event-wise Feedback List */}
                    <div className="space-y-4">
                        {Object.entries(eventGroups).map(([eventId, group]) => (
                            <div key={eventId} className="bg-white shadow rounded-lg">
                                {/* Event Header */}
                                <div 
                                    className="p-6 cursor-pointer hover:bg-gray-50"
                                    onClick={() => toggleEvent(eventId)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{group.event.title}</h3>
                                            <div className="mt-1 text-sm text-gray-500">
                                                {group.stats.total} feedbacks • Average rating: {group.stats.average} • 
                                                {group.stats.anonymous} anonymous
                                            </div>
                                        </div>
                                        {expandedEvents.includes(eventId) ? (
                                            <ChevronUp className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5 text-gray-400" />
                                        )}
                                    </div>
                                </div>

                                {/* Feedback Table */}
                                {expandedEvents.includes(eventId) && (
                                    <div className="border-t border-gray-200">
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comment</th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {group.feedbacks.map((feedback) => (
                                                        <tr key={feedback.id}>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">
                                                                    {feedback.anonymous ? 'Anonymous' : feedback.user.name}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    {[...Array(5)].map((_, index) => (
                                                                        <Star
                                                                            key={index}
                                                                            className={`h-4 w-4 ${
                                                                                index < feedback.rating 
                                                                                ? 'text-yellow-400 fill-yellow-400' 
                                                                                : 'text-gray-300'
                                                                            }`}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <div className="text-sm text-gray-900 max-w-xs">
                                                                    {feedback.comment || '-'}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {feedback.created_at}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}