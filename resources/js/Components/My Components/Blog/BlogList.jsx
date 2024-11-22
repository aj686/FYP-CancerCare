import React from 'react';
import 'flowbite';
import { Link } from '@inertiajs/react';

export default function BlogList({ blogs }) {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">Latest Research & News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs?.map((blog) => (
          <Link href={route('events.show.blog', blog.title.toLowerCase().replace(/ /g, '-'))} key={blog.id}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="h-48 relative">
                <img 
                  src={`/storage/${blog.thumbnail}`}  
                  alt={blog.title} 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
                {blog.tags && (
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
                    {blog.tags}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-3 text-gray-800 hover:text-blue-600 transition-colors duration-300">
                  {blog.title}
                </h2>
                <p className="text-gray-800 mb-4 text-sm line-clamp-2">
                  {blog.header}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{blog.date}</span>
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