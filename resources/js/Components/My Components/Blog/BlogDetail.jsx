import React from 'react';

export default function BlogDetail({ blog }) {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <img 
            src={`/storage/${blog.thumbnail}`}
            alt={blog.title}
            className="w-full h-96 object-cover rounded-xl"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-800">{blog.title}</h1>
        <div className="flex items-center gap-6 mb-8 text-gray-500">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 ple0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{blog.date}</span>
          </div>
          {blog.tags && (
            <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
              {blog.tags}
            </div>
          )}
        </div>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
    </div>
  );
}