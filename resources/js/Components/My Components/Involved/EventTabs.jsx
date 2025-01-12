import React, { useState } from 'react';
import EventLists from './EventLists';
import PastEventList from './PastEventList';

export default function EventTabs({ events, auth, plan }) {
    const [activeTab, setActiveTab] = useState('active');
    
    // Split events into active and past
    const activeEvents = events?.filter(event => event.status === 'active') || [];
    const pastEvents = events?.filter(event => event.status === 'completed')
        .map(event => ({
            ...event,
            user_registered: event.registered_users?.includes(auth?.user?.id),
            user_feedback: event.feedbacks?.some(f => f.user_id === auth?.user?.id) ?? false
        })) || [];

    return (
        <div className="w-full">
            {/* Tab Headers */}
            <div className="flex border-b mb-6">
                <button 
                    className={`flex-1 py-4 px-6 text-center font-semibold ${
                        activeTab === 'active' 
                            ? 'text-purpleTua border-b-2 border-purpleTua' 
                            : 'text-gray-500 hover:text-purpleMid'
                    }`}
                    onClick={() => setActiveTab('active')}
                >
                    Upcoming Events
                </button>
                <button 
                    className={`flex-1 py-4 px-6 text-center font-semibold ${
                        activeTab === 'past' 
                            ? 'text-purpleTua border-b-2 border-purpleTua' 
                            : 'text-gray-500 hover:text-purpleMid'
                    }`}
                    onClick={() => setActiveTab('past')}
                >
                    Past Events
                </button>
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === 'active' ? (
                    <EventLists 
                        events={activeEvents} 
                        auth={auth} 
                        plan={plan}
                    />
                ) : (
                    <PastEventList 
                        events={pastEvents} 
                        auth={auth}
                    />
                )}
            </div>
        </div>
    );
}