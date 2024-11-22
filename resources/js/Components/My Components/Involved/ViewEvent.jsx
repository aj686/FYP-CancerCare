import React from 'react';
import { Calendar, MapPin, Clock, Tag, Users, Share2, ArrowLeft } from 'lucide-react';
import { Link, useForm } from '@inertiajs/react';

export default function ViewEvent({ event, isRegistered: initialIsRegistered, hasMembership, auth }) {
    const [isRegistered, setIsRegistered] = React.useState(initialIsRegistered);
    const { post, delete: destroy, processing } = useForm();

    const handleRegister = () => {
        if (!auth?.user) {
            return;
        }

        // Check if event requires membership
        if (event.price > 0 && !hasMembership) {
            if (confirm('This event requires membership. Would you like to subscribe for RM25/month to access all events?')) {
                window.location.href = route('membership.subscribe');
            }
            return;
        }

        if (confirm('Would you like to register for this event?')) {
            post(route('events.register', event.id), {
                onSuccess: (page) => {
                    if (page.props.flash.success) {
                        setIsRegistered(true);
                    }
                },
            });
        }
    };

    const handleCancel = () => {
        if (confirm('Are you sure you want to cancel your registration?')) {
            destroy(route('events.cancel', event.id), {
                onSuccess: (page) => {
                    if (page.props.flash.success) {
                        setIsRegistered(false);
                    }
                },
            });
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-MY', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const registeredCount = event.registrations?.length || 0;
    const spotsLeft = event.participant_count - registeredCount;
    const isFull = registeredCount >= event.participant_count;

    const renderActionButton = () => {
        if (!auth?.user) {
            return (
                <Link
                    href={route('login')}
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                    Login to Register
                </Link>
            );
        }

        if (isRegistered) {
            return (
                <button
                    onClick={handleCancel}
                    disabled={processing}
                    className="w-full px-6 py-3 text-base font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
                >
                    Cancel Registration
                </button>
            );
        }

        if (isFull) {
            return (
                <button 
                    disabled 
                    className="w-full px-6 py-3 text-base font-medium text-white bg-gray-400 rounded-md cursor-not-allowed"
                >
                    Event Full
                </button>
            );
        }

        if (event.price > 0 && !hasMembership) {
            return (
                <div className="border rounded-lg p-4 space-y-4 bg-white">
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                        <p className="text-sm text-blue-700">
                            This is a premium event that requires membership. Join now to access all premium events!
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-semibold">Membership Benefits:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Access to all premium events</li>
                            <li>Priority registration</li>
                            <li>Exclusive content and resources</li>
                            <li>Only RM25/month</li>
                        </ul>
                    </div>
                    <Link
                        href={route('membership.subscribe')}
                        className="inline-flex w-full items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                    >
                        Subscribe to Join (RM25/month)
                    </Link>
                </div>
            );
        }

        return (
            <button 
                onClick={handleRegister}
                disabled={processing}
                className="w-full px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
                Register Now
            </button>
        );
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <Link
                href={route('getInvolved-page')}
                className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Events
            </Link>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    {/* Left side - Image */}
                    <div className="md:w-2/5 relative">
                        <img
                            src={`/storage/${event.image}`}
                            alt={event.title}
                            className="w-full h-full object-cover object-center"
                            style={{ minHeight: '400px' }}
                        />
                        {event.price === 0 && (
                            <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                Free Entry!
                            </div>
                        )}
                    </div>

                    {/* Right side - Content */}
                    <div className="md:w-3/5 p-6">
                        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center">
                                <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                                <span>{formatDate(event.start_date)}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-5 h-5 mr-2 text-gray-500" />
                                <span>{event.event_time}</span>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                                <span>{event.location}</span>
                            </div>
                            <div className="flex items-center">
                                <Tag className="w-5 h-5 mr-2 text-gray-500" />
                                <span>{event.price > 0 ? `RM ${event.price}` : 'Free'}</span>
                            </div>
                        </div>

                        <div className="prose max-w-none mb-6">
                            <h2 className="text-xl font-semibold mb-2">About This Event</h2>
                            <p className="text-gray-600">{event.description}</p>
                        </div>

                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <span>
                                    <Users className="w-4 h-4 inline mr-1" />
                                    {spotsLeft} spots remaining
                                </span>
                                <span>{Math.round((registeredCount / event.participant_count) * 100)}% Full</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-indigo-600 rounded-full h-2"
                                    style={{
                                        width: `${(registeredCount / event.participant_count) * 100}%`
                                    }}
                                />
                            </div>
                        </div>

                        {renderActionButton()}

                        {isRegistered && (
                            <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-4">
                                <p className="text-sm text-green-700">
                                    You are registered for this event! We look forward to seeing you there.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}