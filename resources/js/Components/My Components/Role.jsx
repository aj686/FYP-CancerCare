import React from 'react';
import { ShieldCheck, Users, Stethoscope, User, UserCog } from 'lucide-react';

export default function Role({ activeFilter, onFilterChange }) {
    return (
        <div className="p-6 bg-white border-b border-gray-200">
            <div className="flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() => onFilterChange('admin')}
                    className={`inline-flex items-center text-sm px-5 py-2.5 rounded-full font-medium transition-all ${
                        activeFilter === 'admin'
                        ? 'bg-blue-700 text-white hover:bg-blue-800'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                >
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    Admin
                </button>
                
                <button
                    type="button"
                    onClick={() => onFilterChange('user')}
                    className={`inline-flex items-center text-sm px-5 py-2.5 rounded-full font-medium transition-all ${
                        activeFilter === 'user'
                        ? 'bg-gray-700 text-white hover:bg-gray-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    <User className="w-4 h-4 mr-2" />
                    User
                </button>
            </div>
        </div>
    );
}