import React from 'react';

export default function CardCancer({ title, href }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-purpleMid hover:border-purpleTua">
      <a href={href} className="block">
        <h3 className="text-xl font-semibold text-purpleTua mb-2">{title}</h3>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Learn more</span>
          <svg
            className="w-5 h-5 text-purpleMid"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </a>
    </div>
  );
}
