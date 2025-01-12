import React, { useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function StorySidebar({ otherStories = [], currentStory }) {
    // Add debugging console log
    useEffect(() => {
        console.log('StorySidebar Data:', {
            otherStoriesCount: otherStories?.length,
            currentStoryId: currentStory?.id,
            otherStories
        });
    }, [otherStories, currentStory]);

    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            return 'Date unavailable';
        }
    };

    // Ensure otherStories is an array and contains data
    const stories = Array.isArray(otherStories) ? otherStories : [];

    const navigationItems = [
        { 
            title: 'About Cancer', 
            path: '/cancer-information/about-cancer'
        },
        { 
            title: 'Cancer Types', 
            path: '/cancer-information/cancer-types'
        },
        { 
            title: 'Treatment', 
            path: '/cancer-information/cancer-treatments'
        },
        { 
            title: 'Prevention', 
            path: '/cancer-information/cancer-prevention'
        },
        { 
            title: 'Early Detection', 
            path: '/cancer-information/cancer-detection'
        },
        { 
            title: 'Recovery', 
            path: '/cancer-information/cancer-recovery'
        },
        { 
            title: 'Diagnosis', 
            path: '/cancer-information/cancer-diagnosis'
        }
    ];
    
    return (
        <aside className="w-80 shrink-0 space-y-6 hidden lg:block">
            {/* Other Stories Section */}
            {/* <div className="bg-white rounded-lg shadow-sm p-6 top-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Other Stories {stories.length > 0 && `(${stories.length})`}
                </h3>
                <div className="space-y-4">
                    {stories.length > 0 ? (
                        stories.map((story) => (
                            <Link
                                key={story.id}
                                href={route('stories.show', story.slug)}
                                className="group block hover:bg-gray-50 rounded-lg transition-all duration-200 p-2"
                            >
                                <div className="flex gap-3">
                                    {story.thumbnail && (
                                        <div className="w-20 h-20 flex-shrink-0">
                                            <img
                                                src={`/storage/${story.thumbnail}`}
                                                alt={story.title}
                                                className="w-full h-full object-cover rounded-lg shadow-sm"
                                                onError={(e) => {
                                                    e.target.src = '/images/default-thumbnail.jpg';
                                                }}
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-purple-600 line-clamp-2 transition-colors">
                                            {story.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 mt-1">
                                            By {story.user?.name || 'Anonymous'} • {formatDate(story.created_at)}
                                        </p>
                                        {story.cancer_type && (
                                            <span className="inline-block mt-2 text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded-full">
                                                {story.cancer_type}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="text-center py-4">
                            <p className="text-sm text-gray-500">
                                No other stories available at the moment
                            </p>
                            <Link
                                href={route('stories.create')}
                                className="inline-block mt-3 text-sm text-purple-600 hover:text-purple-700"
                            >
                                Share your story →
                            </Link>
                        </div>
                    )}
                </div>
            </div> */}

            {/* Cancer Information Navigation */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cancer Information</h3>
                <nav className="space-y-2">
                    {navigationItems.map((item) => (
                        <a
                            key={item.title}
                            href={item.path}
                            className={`
                                block px-4 py-2 text-sm rounded-lg transition-colors duration-200 
                                ${currentStory?.type === item.path
                                    ? 'bg-purple-50 text-purple-600 font-medium' 
                                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                                }
                            `}
                        >
                            {item.title}
                        </a>
                    ))}
                </nav>
            </div>
        </aside>
    );
}