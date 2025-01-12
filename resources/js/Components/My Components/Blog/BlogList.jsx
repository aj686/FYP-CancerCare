import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Search } from 'lucide-react';

export default function BlogList({ blogs, isHomepage = false }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value) => {
    setSearchTerm(value);
    router.get('/our-research', 
      { search: value, page: 1 },
      { preserveState: true, preserveScroll: true }
    );
  };

  const handlePageChange = (page) => {
    router.get('/our-research',
      { search: searchTerm, page: page },
      { preserveState: true, preserveScroll: true }
    );
  };

  // Only show search bar if not on homepage
  const displayedBlogs = isHomepage ? blogs.slice(0, 3) : blogs.data;

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Only show search on research page */}
      {!isHomepage && (
        <div className="mb-8 mx-auto max-w-4xl px-4">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedBlogs?.map((blog) => (
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
      
      {/* Show pagination only on research page */}
      {!isHomepage && blogs.last_page > 1 && (
        <div className="flex justify-center space-x-2 mt-8">
          <button
            onClick={() => handlePageChange(blogs.current_page - 1)}
            disabled={blogs.current_page === 1}
            className="rounded-lg border border-purpleTua px-4 py-2 text-purpleTua disabled:opacity-50"
          >
            Previous
          </button>
          
          {Array.from({ length: blogs.last_page }, (_, i) => i + 1).map(pageNum => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`rounded-lg px-4 py-2 ${
                blogs.current_page === pageNum
                  ? 'bg-purpleTua text-white'
                  : 'border border-purpleTua text-purpleTua'
              }`}
            >
              {pageNum}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(blogs.current_page + 1)}
            disabled={blogs.current_page === blogs.last_page}
            className="rounded-lg border border-purpleTua px-4 py-2 text-purpleTua disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Show See More button on homepage */}
      {isHomepage && (
        <div className="flex justify-center mt-8">
          <Link
            href="/our-research"
            className="inline-flex items-center px-6 py-3 rounded-full bg-purpleTua text-white hover:bg-purpleMid transition-colors duration-300"
          >
            See More Research
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}