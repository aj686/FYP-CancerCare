
import React from 'react';

export default function DailyUserRegistration() {
   return (
       <div className="bg-white rounded-xl shadow-lg overflow-hidden">
           {/* Header */}
           <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700">
               <h2 className="text-2xl font-bold text-white">User Registrations</h2>
               <p className="text-blue-100 mt-1">Last 30 days activity</p>
           </div>

           {/* Graph */}
           <div className="p-6">
               <iframe
                   src="http://localhost:3000/d-solo/ee727gleyhog0f/new-dashboard?orgId=1&from=1726272000000&to=1733961600000&timezone=browser&panelId=2&__feature.dashboardSceneSolo"
                   width="100%"
                   height="400px"
                   frameBorder="0"
                   className="rounded-lg"
               />
           </div>

           {/* View Full Analytics Link */}
           {/* <div className="flex justify-end p-4 border-t">
               <a 
                   href="http://localhost:3000"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
               >
                   <svg 
                       className="w-5 h-5 mr-2" 
                       fill="none" 
                       stroke="currentColor" 
                       viewBox="0 0 24 24"
                   >
                       <path 
                           strokeLinecap="round" 
                           strokeLinejoin="round" 
                           strokeWidth="2" 
                           d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                       />
                   </svg>
                   View Full Analytics
               </a>
           </div> */}
       </div>
   );
}