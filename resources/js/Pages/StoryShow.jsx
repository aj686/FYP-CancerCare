import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';
import CommentSection from '@/Components/My Components/CommentSection';
import StorySidebar from '@/Components/My Components/StorySidebar';

export default function StoryShow({ story, otherStories = [], auth }) {
    // Add debugging console log
    useEffect(() => {
        console.log('StoryShow Data:', {
            currentStory: story,
            otherStoriesData: otherStories,
            otherStoriesCount: otherStories?.length
        });
    }, [story, otherStories]);

    if (!story) {
        return (
            <>
                <DynamicNavbar />
                <div className="min-h-screen flex items-center justify-center">
                    <p>Loading story...</p>
                </div>
                <Footer />
            </>
        );
    }

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

    // Ensure otherStories excludes the current story
    const filteredOtherStories = Array.isArray(otherStories) 
        ? otherStories.filter(s => s.id !== story.id)
        : [];

    return (
        <>
            <Head title={story.title} />
            <DynamicNavbar />

            <main className="bg-gray-50 min-h-screen py-12">
                <div className="max-w-7xl mx-auto px-4 flex gap-8">
                    {/* Main Content */}
                    <article className="flex-1 max-w-4xl">
                        <header className="mb-8">
                            {story.thumbnail && (
                                <div className="mb-8">
                                    <img 
                                        src={`/storage/${story.thumbnail}`}
                                        alt={story.title}
                                        className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
                                        onError={(e) => {
                                            e.target.src = '/images/default-thumbnail.jpg';
                                        }}
                                    />
                                </div>
                            )}
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">{story.title}</h1>
                            <div className="flex items-center gap-4 text-gray-600">
                                <div>By {story.user?.name || 'Anonymous'}</div>
                                <div>•</div>
                                <div>{story.cancer_type}</div>
                                <div>•</div>
                                <div>{formatDate(story.created_at)}</div>
                            </div>
                        </header>

                        <div className="prose prose-lg max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: story.content }} />
                        </div>

                        <footer className="mt-12 pt-8 border-t border-gray-200">
                            <Link 
                                href={route('stories.index')} 
                                className="text-purple-600 hover:text-purple-800 font-semibold"
                            >
                                ← Back to All Stories
                            </Link>
                        </footer>

                        {story && (
                            <CommentSection 
                                story={story}
                                auth={auth}
                                comments={story.comments || []}
                            />
                        )}
                    </article>

                    {/* Sidebar */}
                    <StorySidebar 
                        otherStories={filteredOtherStories} 
                        currentStory={story} 
                    />
                </div>
            </main>

            <Footer />
        </>
    );
}