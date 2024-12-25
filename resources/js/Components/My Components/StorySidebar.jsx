import React from 'react';

export default function StorySidebar({ otherStories, currentStory }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    
    return (
        <aside className="w-80 shrink-0 space-y-6 hidden lg:block">
            {/* Other Stories Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 top-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Other Stories
                </h3>
                <div className="space-y-4">
                    {otherStories && otherStories.length > 0 ? (
                        otherStories.map((story) => (
                            <a
                                key={story.id}
                                href={route('stories.show', story.slug)}
                                className="group block"
                            >
                                <div className="flex gap-3">
                                    {story.thumbnail && (
                                        <div className="w-20 h-20 flex-shrink-0">
                                            <img
                                                src={`/storage/${story.thumbnail}`}
                                                alt={story.title}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-purple-600 line-clamp-2 transition-colors">
                                            {story.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 mt-1">
                                            By {story.user.name} • {formatDate(story.created_at)}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">
                            No other stories available
                        </p>
                    )}
                </div>
            </div>

            {/* Cancer Types Navigation */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cancer Types</h3>
                <nav className="space-y-2">
                    {[
                        'Breast Cancer',
                        'Lung Cancer',
                        'Colon Cancer',
                        'Prostate Cancer',
                        'Leukemia',
                        'Lymphoma',
                        'Melanoma',
                        'Other Types'
                    ].map((type) => (
                        <a
                            key={type}
                            href={route('stories.index', { type: type.toLowerCase().replace(' ', '-') })}
                            className={`block px-4 py-2 text-sm rounded-lg transition-colors duration-200 
                                ${currentStory.cancer_type === type 
                                    ? 'bg-purple-50 text-purple-600' 
                                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'}`}
                        >
                            {type}
                        </a>
                    ))}
                </nav>
            </div>
        </aside>
    );
}