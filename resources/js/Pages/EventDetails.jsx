import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Calendar, MapPin, Clock, Tag, Share2, ArrowLeft, CreditCard } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import RegistrationProgress from '@/Components/My Components/Involved/RegistrationProgress';
import Footer from '@/Components/My Components/Footer';

export default function ViewEvent({ event, isRegistered: initialIsRegistered, hasMembership, auth }) {
    const [isRegistered, setIsRegistered] = React.useState(initialIsRegistered);
    const { post, delete: destroy, processing } = useForm();

    React.useEffect(() => {
        console.log('Event data in ViewEvent:', event);
    }, [event]);

    const handleRegister = () => {
        if (!auth?.user) return;
        if (event.price > 0 && !hasMembership) {
            if (confirm('This event requires membership. Would you like to subscribe for RM25/month to access all events?')) {
                window.location.href = route('membership.subscribe');
            }
            return;
        }
        if (confirm('Would you like to register for this event?')) {
            post(route('events.register', event.id), {
                preserveState: true, // Preserve the current page state
                onSuccess: () => {
                    setIsRegistered(true); // Update state only after successful response
                },
            });
        }
    };

    const handleCancel = () => {
        if (confirm('Are you sure you want to cancel your registration?')) {
            destroy(route('events.cancel', event.id), {
                preserveState: true, // Preserve the current page state
                onSuccess: () => {
                    setIsRegistered(false); // Update state only after successful response
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

    const renderActionButton = () => {
        const donateButton = (
            <Link
                href={route('events.donate', event.id)}
                className="w-full px-6 py-3 text-base font-medium text-purpleTua bg-yellow-400 rounded-full hover:bg-yellow-500 transition-all duration-300 flex items-center justify-center mb-4"
            >
                <CreditCard className="w-5 h-5 mr-2" />
                Support This Event
            </Link>
        );

        const actionButtons = (
            <div className="space-y-4">
                {!auth?.user ? (
                    <Link
                        href={route('login')}
                        className="inline-flex w-full items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-purpleMid to-purpleTua rounded-full hover:shadow-lg transition-all duration-300"
                    >
                        Login to Register
                    </Link>
                ) : isRegistered ? (
                    <button
                        onClick={handleCancel}
                        disabled={processing}
                        className="w-full px-6 py-3 text-base font-medium text-white bg-red-500 rounded-full hover:bg-red-600 disabled:opacity-50 transition-colors duration-300"
                    >
                        Cancel Registration
                    </button>
                ) : (
                    <div className="space-y-4">
                        <button 
                            onClick={handleRegister}
                            disabled={processing || event.is_full}
                            className={`w-full px-6 py-3 text-base font-medium text-white ${
                                event.is_full 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-purpleMid to-purpleTua hover:shadow-lg'
                            } rounded-full disabled:opacity-50 transition-all duration-300`}
                        >
                            {event.is_full ? 'Event Full' : 'Register for Event'}
                        </button>
                        
                        {event.price > 0 && !hasMembership && (
                            <div className="border border-purpleMuda rounded-xl p-4 space-y-4 bg-purpleMuda/10">
                                <p className="text-sm text-purpleTua">
                                    Note: This is a premium event. You'll need to subscribe to our membership to complete registration.
                                </p>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-purpleTua">Membership Benefits:</h4>
                                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                                        <li>Access to all premium events</li>
                                        <li>Priority registration</li>
                                        <li>Exclusive content and resources</li>
                                        <li>Only RM25/month</li>
                                    </ul>
                                </div>
                                <Link
                                    href={route('membership.subscribe')}
                                    className="inline-flex w-full items-center justify-center px-6 py-3 text-base font-medium text-purpleTua bg-yellow-300 rounded-full hover:bg-yellow-400 transition-colors duration-300"
                                >
                                    Subscribe Now (RM25/month)
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );

        return (
            <div className="space-y-4">
                {donateButton}
                {actionButtons}
            </div>
        );
    };

    const renderEventDetails = () => (
        <div className="md:w-3/5 p-8">
            <h1 className="text-3xl font-bold mb-4 text-purpleTua">{event.title}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-purpleMid" />
                    <span className="text-gray-700">{formatDate(event.start_date)}</span>
                </div>
                <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-purpleMid" />
                    <span className="text-gray-700">{event.event_time}</span>
                </div>
                <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-purpleMid" />
                    <span className="text-gray-700">{event.location}</span>
                </div>
                <div className="flex items-center">
                    <Tag className="w-5 h-5 mr-2 text-purpleMid" />
                    <span className="text-gray-700">{event.price > 0 ? `RM ${event.price}` : 'Free'}</span>
                </div>
            </div>

            <div className="prose max-w-none mb-8">
                <h2 className="text-xl font-semibold mb-3 text-purpleTua">About This Event</h2>
                <p className="text-gray-600">{event.description}</p>
            </div>

            <div className="mb-8">
                <RegistrationProgress 
                    registrations={event.registrations || []}
                    participantCount={event.participant_count}
                />
            </div>

            {renderActionButton()}

            {isRegistered && (
                <div className="mt-4 bg-purpleMuda/20 border-l-4 border-purpleTua p-4 rounded-r-lg">
                    <p className="text-sm text-purpleTua">
                        You are registered for this event! We look forward to seeing you there.
                    </p>
                </div>
            )}
        </div>
    );

    return (
        <>
            <Head title={`Event Details - ${event.title}`} />
            <DynamicNavbar />

            <div className="max-w-7xl mx-auto p-6">
                <Link
                    href={route('getInvolved-page')}
                    className="inline-flex items-center text-purpleTua hover:text-purpleMid mb-6 transition-colors duration-300"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Events
                </Link>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-purpleMuda/20">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-2/5 relative">
                            <img
                                src={`/storage/${event.image}`}
                                alt={event.title}
                                className="w-full h-full object-cover object-center"
                                style={{ minHeight: '400px' }}
                            />
                            {event.price === 0 && (
                                <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-300 to-yellow-400 text-purpleTua px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                                    Free Entry!
                                </div>
                            )}
                        </div>
                        {renderEventDetails()}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}