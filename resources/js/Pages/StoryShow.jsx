import { Head } from '@inertiajs/react';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';

export default function StoryShow({ story }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <Head title={story.title} />
            <DynamicNavbar />

            <main className="bg-gray-50 min-h-screen py-12">
                <article className="max-w-4xl mx-auto px-4">
                    {/* Story Header */}
                    <header className="mb-8">
                        {story.thumbnail && (
                            <div className="mb-8">
                                <img 
                                    src={`/storage/${story.thumbnail}`}
                                    alt={story.title}
                                    className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
                                />
                            </div>
                        )}
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{story.title}</h1>
                        <div className="flex items-center gap-4 text-gray-600">
                            <div>By {story.user.name}</div>
                            <div>•</div>
                            <div>{story.cancer_type}</div>
                            <div>•</div>
                            <div>{formatDate(story.created_at)}</div>
                        </div>
                    </header>

                    {/* Story Content */}
                    <div className="prose prose-lg max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: story.content }} />
                    </div>

                    {/* Story Footer */}
                    <footer className="mt-12 pt-8 border-t border-gray-200">
                        <a 
                            href={route('stories.index')} 
                            className="text-purple-600 hover:text-purple-800 font-semibold"
                        >
                            ← Back to All Stories
                        </a>
                    </footer>
                </article>
            </main>

            <Footer />
        </>
    );
}