import React, { useState } from 'react';
import { ChevronRight, Heart, Share2 } from 'lucide-react';

export default function CardDetailCancer({ title, href, image, description }) {
  const [isLiked, setIsLiked] = useState(false);
  const [showShare, setShowShare] = useState(false);

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
        <div className="p-6 space-y-4">
          <h5 className="mb-2 text-2xl font-bold text-white text-center group-hover:text-yellow-300 transition-colors duration-300">
            {title}
          </h5>
          
          <p className="text-gray-200 text-sm leading-relaxed opacity-90">
            {description || 'Learn more about symptoms, treatments, and prevention methods for this type of cancer.'}
          </p>

          {/* Interactive Buttons */}
          <div className="flex items-center justify-between pt-4">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="flex items-center gap-2 text-gray-200 hover:text-yellow-300 transition-colors duration-300"
            >
              <Heart 
                className={`w-5 h-5 transition-all duration-300 ${isLiked ? 'fill-yellow-300 text-yellow-300' : ''}`}
              />
              <span className="text-sm font-medium">{isLiked ? 'Saved' : 'Save'}</span>
            </button>

            <div className="relative">
              <button 
                onClick={() => setShowShare(!showShare)}
                className="flex items-center gap-2 text-gray-200 hover:text-yellow-300 transition-colors duration-300"
              >
                <Share2 className="w-5 h-5" />
                <span className="text-sm font-medium">Share</span>
              </button>

              {/* Share Popup */}
              {showShare && (
                <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-xl p-3 w-48 z-10">
                  <div className="flex flex-col space-y-2 text-sm text-gray-700">
                    <button className="hover:bg-purpleMuda/20 p-2 rounded-lg text-left transition-colors duration-200 flex items-center gap-2">
                      Copy Link
                    </button>
                    <button className="hover:bg-purpleMuda/20 p-2 rounded-lg text-left transition-colors duration-200 flex items-center gap-2">
                      Share on Twitter
                    </button>
                    <button className="hover:bg-purpleMuda/20 p-2 rounded-lg text-left transition-colors duration-200 flex items-center gap-2">
                      Share on Facebook
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Learn More Button */}
          <a 
            href={href}
            className="inline-flex items-center w-full justify-center gap-2 px-4 py-2.5 mt-4 text-purpleTua font-medium 
                       bg-yellow-300 hover:bg-yellow-400 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Learn More
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}