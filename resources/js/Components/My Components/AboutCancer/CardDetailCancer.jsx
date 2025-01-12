import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function CardDetailCancer({ title, href, image, description }) {
  return (
    <div className="relative max-w-sm group">
      <div className="bg-gradient-to-br from-purpleMid to-purpleTua rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl border border-purpleMuda/20">
        {/* Image Container with Overlay */}
        <div className="relative overflow-hidden rounded-t-xl">
          <img 
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
            src={image}
            alt={title} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purpleTua/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h5 className="mb-4 text-2xl font-bold text-white text-center group-hover:text-yellow-300 transition-colors duration-300">
            {title}
          </h5>
          
          <p className="mb-8 text-gray-200 text-sm leading-relaxed opacity-90">
            {description || 'Learn more about symptoms, treatments, and prevention methods for this type of cancer.'}
          </p>

          {/* Learn More Button */}
          <a 
            href={href}
            className="inline-flex items-center w-full justify-center gap-2 px-6 py-3 text-purpleTua font-medium 
                       bg-yellow-300 hover:bg-yellow-400 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Learn More
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}