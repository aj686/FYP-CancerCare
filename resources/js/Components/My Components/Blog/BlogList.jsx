import React from 'react';
import 'flowbite';
import { Link } from '@inertiajs/react';

export default function BlogList({ blogs }) {
  return (
    <div className="container mx-auto py-12 px-4">
      {/* <h1 className="text-4xl font-bold text-center text-purpleTua mb-4">Latest Research & News</h1>
      <div className="w-24 h-1 bg-purpleMid mx-auto rounded-full mb-12"></div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs?.map((blog) => (
          <Link 
            href={route('events.show.blog', blog.title.toLowerCase().replace(/ /g, '-'))} 
            key={blog.id}
          >
            <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 cursor-pointer border border-purpleMuda/20">
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={`/storage/${blog.thumbnail}`}  
                  alt={blog.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {blog.tags && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-purpleMid to-purpleTua text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg">
                    {blog.tags}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-3 text-purpleTua group-hover:text-purpleMid transition-colors duration-300">
                  {blog.title}
                </h2>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                  {blog.header}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500 pt-4 border-t border-purpleMuda/10">
                  <div className="flex items-center gap-2">
                    <svg 
                      className="w-4 h-4 text-purpleMid" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                      />
                    </svg>
                    <span className="text-gray-600">{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg 
                      className="w-4 h-4 text-purpleMid" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                      />
                    </svg>
                    <span className="text-gray-600">{blog.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}