// IMPORTANT NOTE - Uses relative protocol (//) which might help with mixed content issues

import React from 'react';
import PropTypes from 'prop-types';

export default function GrafanaDashboard({ url, title }) {
    return (
        <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header Section */}
            <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700">
                <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
                <p className="text-blue-100">Real-time monitoring and analytics</p>
            </div>

            {/* Main Content */}
            <div className="p-6 space-y-6">
                {/* Dashboard Container */}
                <div className="bg-gray-50 rounded-lg p-1 shadow-inner">
                    <div className="relative bg-white rounded-lg overflow-hidden shadow-sm">
                        <iframe
                            src={url}
                            width="100%"
                            height="500px"
                            frameBorder="0"
                            className="rounded-lg"
                            title="Grafana Analytics Dashboard"
                            sandbox="allow-same-origin allow-scripts"
                        />
                    </div>
                </div>

                {/* Optional: Status Indicator */}
                <div className="flex items-center justify-end space-x-2 text-sm text-gray-600">
                    <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                        Live Dashboard
                    </div>
                </div>
            </div>
        </div>
    );
}

GrafanaDashboard.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};


