import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Tag, ChevronDown, ChevronUp, Star, CreditCard } from 'lucide-react';
import { Link } from '@inertiajs/react';
import RegistrationProgress from './RegistrationProgress';

export default function PastEventList({ events, auth }) {
    const [expandedEvents, setExpandedEvents] = useState({});
    const [hoveredEvent, setHoveredEvent] = useState(null);

    const toggleEventExpansion = (eventId, e) => {
        e.preventDefault();
        setExpandedEvents(prev => ({
            ...prev,
            [eventId]: !prev[eventId]
        }));
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-MY', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatPrice = (price) => {
        return price === 0 ? 'Free Entry' : `RM ${parseFloat(price).toFixed(2)}`;
    };

    if (!events?.length) {
        return (
            <div className="max-w-lg mx-auto p-4 text-center rounded-xl bg-purpleMuda/20 text-purpleTua">
                No past events available.
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-sm mx-auto md:max-w-5xl">
            {events.map((event) => (
                <div
                    key={event.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-purpleMuda/20"
                    onMouseEnter={() => setHoveredEvent(event.id)}
                    onMouseLeave={() => setHoveredEvent(null)}
                    style={{
                        transform: hoveredEvent === event.id ? 'scale(1.01)' : 'scale(1)'
                    }}
                >
                    <div className="md:flex">
                        {/* Image Section */}
                        <div className="md:flex-shrink-0 relative overflow-hidden block">
                            <img 
                                className="h-48 w-full object-cover md:w-72 transition-transform duration-300 filter grayscale" 
                                src={`/storage/${event.image}`}
                                alt={event.title}
                                style={{ objectFit: 'cover', height: '100%' }}
                            />
                            <div className="absolute top-4 right-4 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                Completed
                            </div>
                            {event.average_rating > 0 && (
                                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-yellow-500 px-3 py-1 rounded-full text-sm font-semibold shadow-lg flex items-center">
                                    <Star className="w-4 h-4 mr-1 fill-yellow-400" />
                                    {Number(event.average_rating).toFixed(1)}/5
                                </div>
                            )}
                        </div>

                        {/* Content Section */}
                        <div className="p-8 w-full">
                            <div className="uppercase tracking-wide text-lg text-purpleTua font-semibold mb-2">
                                {event.title}
                            </div>

                            <div>
                                <p className={`text-gray-700 ${expandedEvents[event.id] ? '' : 'line-clamp-2'}`}>
                                    {event.description}
                                </p>
                                {event.description.length > 100 && (
                                    <button
                                        onClick={(e) => toggleEventExpansion(event.id, e)}
                                        className="text-purpleMid hover:text-purpleTua text-sm mt-2 flex items-center transition-colors duration-200"
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
                                    <MapPin className="w-4 h-4 mr-2 text-purpleMid" />
                                    <span>{event.location}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Calendar className="w-4 h-4 mr-2 text-purpleMid" />
                                    <span>{formatDate(event.end_date)}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Clock className="w-4 h-4 mr-2 text-purpleMid" />
                                    <span>{event.event_time}</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Tag className="w-4 h-4 mr-2 text-purpleMid" />
                                    <span>{formatPrice(event.price)}</span>
                                </div>
                            </div>

                            {/* Participation Progress */}
                            <RegistrationProgress 
                                registrations={event.registrations}
                                participantCount={event.participant_count}
                                isPast={true}
                            />

                            {/* Action Buttons */}
                            <div className="mt-6 space-y-3 sm:space-y-0 sm:flex sm:space-x-3">
                                {event.funding_goal > 0 && (
                                    <Link
                                        href={route('events.donate', event.id)}
                                        className="w-full sm:w-auto bg-yellow-400 text-purpleTua px-6 py-2 rounded-full hover:bg-yellow-500 focus:outline-none transition-colors duration-200 flex items-center justify-center font-medium"
                                    >
                                        <CreditCard className="w-4 h-4 mr-2" />
                                        Support This Event
                                    </Link>
                                )}
                                
                                {/* <Link 
                                    href={route('events.show.event', event.id)}
                                    className="w-full sm:w-auto bg-purpleMuda text-purpleTua px-6 py-2 rounded-full hover:bg-purpleMuda/80 focus:outline-none transition-colors duration-200 flex items-center justify-center font-medium"
                                >
                                    View Details
                                </Link> */}

                                {event.user_registered && !event.user_feedback && (
                                    <Link
                                        href={`/events/${event.id}#feedback`}
                                        className="w-full sm:w-auto bg-gradient-to-r from-purpleMid to-purpleTua text-white px-6 py-2 rounded-full hover:shadow-lg focus:outline-none transition-all duration-200 flex items-center justify-center font-medium"
                                    >
                                        Leave Feedback
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}