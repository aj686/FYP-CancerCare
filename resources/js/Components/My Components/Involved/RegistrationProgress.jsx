import React from 'react';
import { Users } from 'lucide-react';

export default function RegistrationProgress({ registrations = [], participantCount = 0 }) {
    // Calculate registration stats
    const registeredCount = registrations?.filter(reg => reg.status === 'registered')?.length || 0;
    const availableSpots = Math.max(0, participantCount - registeredCount);
    const progressPercentage = Math.min(100, (registeredCount / participantCount) * 100);
    const isFull = registeredCount >= participantCount;

    return (
        <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2 text-purpleMid" />
                    <span className="text-sm">Registration Progress</span>
                </div>
                <div className="text-sm font-medium">
                    {isFull ? (
                        <span className="text-red-600">Event Full</span>
                    ) : (
                        <span className="text-purpleTua">{availableSpots} spots remaining</span>
                    )}
                </div>
            </div>
            
            <div className="relative w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                    className={`absolute left-0 h-full rounded-full transition-all duration-500 ${
                        isFull ? 'bg-red-500' : 'bg-purpleMid'
                    }`}
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{registeredCount} registered</span>
                <span>{participantCount} total spots</span>
            </div>

            {isFull && (
                <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded-md">
                    This event has reached its maximum capacity.
                </div>
            )}
        </div>
    );
}