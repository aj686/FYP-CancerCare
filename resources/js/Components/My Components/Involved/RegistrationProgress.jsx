import React from 'react';
import { Users } from 'lucide-react';

export default function RegistrationProgress({ registrations, participantCount }) {
    // Calculate registration stats
    const registeredCount = Array.isArray(registrations) 
        ? registrations.filter(reg => reg.status === 'registered').length 
        : 0;
    const spotsLeft = Math.max(0, participantCount - registeredCount);
    const percentageFull = Math.min(100, Math.round((registeredCount / participantCount) * 100));
    
    return (
        <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">
                    <Users className="inline w-4 h-4 mr-1" />
                    {spotsLeft} spots remaining
                </span>
                <span className="text-sm text-gray-600">
                    {percentageFull}% Full
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                    className="bg-gradient-to-r from-purpleMid to-purpleTua h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${percentageFull}%` }}
                />
            </div>
        </div>
    );
}