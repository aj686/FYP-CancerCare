import React from 'react';

export default function ActiveUsersStats() {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-green-600 to-green-700">
                <h2 className="text-2xl font-bold text-white">User Activity</h2>
                <p className="text-green-100 mt-1">Based on last update time</p>
            </div>

            <div className="p-6">
                <iframe
                    src="//localhost:3000/d-solo/ee727gleyhog0f/new-dashboard?orgId=1&panelId=3"
                    width="100%"
                    height="400px"
                    frameBorder="0"
                    className="rounded-lg"
                />
            </div>
        </div>
    );
}