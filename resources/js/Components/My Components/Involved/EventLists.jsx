import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Tag, ChevronDown, ChevronUp, Users } from 'lucide-react';
import { Link, useForm } from '@inertiajs/react';
// import { Alert, AlertDescription } from '@/components/ui/alert';

export default function EventLists({ events, auth = null }) {
    const [expandedEvents, setExpandedEvents] = useState({});
    const [hoveredEvent, setHoveredEvent] = useState(null);
    const { delete: destroy } = useForm();

    const toggleEventExpansion = (eventId, e) => {
        e.preventDefault();
        setExpandedEvents(prev => ({
            ...prev,
            [eventId]: !prev[eventId]
        }));
    };

    const formatPrice = (price) => {
        return price === 0 ? 'Free Entry' : `RM ${parseFloat(price).toFixed(2)}`;
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-MY', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleCancelRegistration = (eventId) => {
        if (confirm('Are you sure you want to cancel your registration?')) {
            destroy(route('events.cancel', eventId));
        }
    };

    const renderRegistrationStatus = (event) => {
        const spotsLeft = event.participant_count - event.registrations_count;
        const percentageFull = (event.registrations_count / event.participant_count) * 100;

        return (
            <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">
                        <Users className="inline w-4 h-4 mr-1" />
                        {spotsLeft} spots remaining
                    </span>
                    <span className="text-sm text-gray-600">{percentageFull.toFixed(0)}% Full</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${percentageFull}%` }}
                    />
                </div>
            </div>
        );
    };

    const renderActionButtons = (event) => {
        if (!auth || !auth.user) {
            return (
                <div className="mt-6 space-y-3 sm:space-y-0 sm:flex sm:space-x-3">
                    <Link
                        href={route('events.show.event', event.id)}
                        className="w-full sm:w-auto bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
                    >
                        View Details
                    </Link>
                    <Link
                        href={route('login')}
                        className="w-full sm:w-auto bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
                    >
                        Login to Register
                    </Link>
                </div>
            );
        }

        const isMember = auth.user.membership_status === 'active';
        const isRegistered = event.registered_users?.includes(auth.user.id);
        const showMembershipRequired = event.price > 0 && !isMember;
        const isFull = event.registrations_count >= event.participant_count;

        return (
            <div className="mt-6">
                <div className="space-y-3 sm:space-y-0 sm:flex sm:space-x-3">
                    <Link
                        href={route('events.show.event', event.title)}
                        className="w-full sm:w-auto bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
                    >
                        View Details
                    </Link>
                    {isRegistered ? (
                        <button
                            onClick={() => handleCancelRegistration(event.id)}
                            className="w-full sm:w-auto bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
                        >
                            Cancel Registration
                        </button>
                    ) : showMembershipRequired ? (
                        <Link
                            href={route('membership.subscribe')}
                            method="post"
                            className="w-full sm:w-auto bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
                        >
                            Subscribe to Register (RM 25/month)
                        </Link>
                    ) : isFull ? (
                        <button
                            disabled
                            className="w-full sm:w-auto bg-gray-400 text-white px-6 py-2 rounded-lg cursor-not-allowed"
                        >
                            Event Full
                        </button>
                    ) : (
                        <Link
                            href={route('events.register', event.id)}
                            method="post"
                            className="w-full sm:w-auto bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
                        >
                            Register Now
                        </Link>
                    )}
                </div>
                {showMembershipRequired && (
                    <div className="mt-2 text-sm text-gray-600">
                        This event requires membership. Members can join all events including advanced ones!
                    </div>
                )}
            </div>
        );
    };

    if (!events.length) {
        return (
            <Alert className="max-w-lg mx-auto">
                <AlertDescription>
                    No events are currently scheduled. Please check back later!
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="space-y-6 max-w-sm mx-auto md:max-w-5xl">
            {events.map((event) => (
                <div
                    key={event.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg"
                    onMouseEnter={() => setHoveredEvent(event.id)}
                    onMouseLeave={() => setHoveredEvent(null)}
                    style={{
                        transform: hoveredEvent === event.id ? 'scale(1.01)' : 'scale(1)'
                    }}
                >
                    <div className="md:flex">
                        <div className="md:flex-shrink-0 relative overflow-hidden block">
                            <img 
                                className="h-48 w-full object-cover md:w-72 transition-transform duration-300 hover:scale-110" 
                                src={`/storage/${event.image}`}
                                alt={event.title}
                                style={{ objectFit: 'cover', height: '100%' }}
                            />
                            {event.price === 0 && (
                                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    Free Entry!
                                </div>
                            )}
                        </div>

                        <div className="p-8 w-full">
                            <div className="uppercase tracking-wide text-lg text-indigo-500 font-semibold mb-2 group-hover:text-indigo-600">
                                {event.title}
                            </div>

                            <div>
                                <p className={`text-gray-700 ${expandedEvents[event.id] ? '' : 'line-clamp-2'}`}>
                                    {event.description}
                                </p>
                                {event.description.length > 100 && (
                                    <button
                                        onClick={(e) => toggleEventExpansion(event.id, e)}
                                        className="text-indigo-500 hover:text-indigo-600 text-sm mt-2 flex items-center"
                                    >
                                        {expandedEvents[event.id] ? (
                                            <>
                                                <ChevronUp className="w-4 h-4 mr-1" />
                                                Show less
                                            </>
                                        ) : (
                                            <>
                                                <ChevronDown className="w-4 h-4 mr-1" />
                                                Read more
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>

                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div className="flex items-center text-gray-600">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    <span>{event.location}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <span>{formatDate(event.start_date)}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Clock className="w-4 h-4 mr-2" />
                                    <span>{event.event_time}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Tag className="w-4 h-4 mr-2" />
                                    <span>{formatPrice(event.price)}</span>
                                </div>
                            </div>

                            {renderRegistrationStatus(event)}
                            {renderActionButtons(event)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}