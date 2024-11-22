import React, { useState } from 'react';
import { ChevronRight, Heart, Share2 } from 'lucide-react';

export default function CardDetailCancer({ title, href, image, description }) {
  const [isLiked, setIsLiked] = useState(false);
  const [showShare, setShowShare] = useState(false);

  return (
    <div className="relative max-w-sm group">
      <div className="bg-blue-600 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
        {/* Image Container with Overlay */}
        <div className="relative overflow-hidden">
          <img 
            className="rounded-t-lg w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
            src="/api/placeholder/400/320"
            alt={title} 
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <h5 className="mb-2 text-2xl font-bold text-white text-center group-hover:text-gray-100">
            {title}
          </h5>
          
          <p className="text-gray-200 text-sm leading-relaxed opacity-80">
            {description || 'Learn more about symptoms, treatments, and prevention methods for this type of cancer.'}
          </p>

          {/* Interactive Buttons */}
          <div className="flex items-center justify-between pt-4">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="flex items-center gap-2 text-white hover:text-pink-400 transition-colors duration-300"
            >
              <Heart 
                className={`w-5 h-5 transition-all duration-300 ${isLiked ? 'fill-pink-400 text-pink-400' : ''}`}
              />
              <span className="text-sm">{isLiked ? 'Saved' : 'Save'}</span>
            </button>

            <div className="relative">
              <button 
                onClick={() => setShowShare(!showShare)}
                className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors duration-300"
              >
                <Share2 className="w-5 h-5" />
                <span className="text-sm">Share</span>
              </button>

              {/* Share Popup */}
              {showShare && (
                <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg p-3 w-48">
                  <div className="flex flex-col space-y-2 text-sm text-gray-700">
                    <button className="hover:bg-gray-100 p-2 rounded-lg text-left">Copy Link</button>
                    <button className="hover:bg-gray-100 p-2 rounded-lg text-left">Share on Twitter</button>
                    <button className="hover:bg-gray-100 p-2 rounded-lg text-left">Share on Facebook</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Learn More Button */}
          <a 
            href={href}
            className="inline-flex items-center w-full justify-center gap-2 px-4 py-2 mt-4 text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors duration-300"
          >
            Learn More
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}