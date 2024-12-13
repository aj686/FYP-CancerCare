import { Head } from '@inertiajs/react';
import DynamicNavbar from '@/Components/My Components/AboutCancer/DynamicNavbar';
import Footer from '@/Components/My Components/Footer';

export default function StoriesIndex({ stories, count }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <Head title="Cancer Stories" />
            <DynamicNavbar />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-24">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Cancer Stories</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Real stories from real people sharing their cancer journeys, experiences, and hope.
                    </p>
                </div>
            </section>

            {/* Stories Grid */}
            <div className="container mx-auto py-16 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stories.map((story) => (
                        <a 
                            href={route('stories.show', story.slug)} 
                            key={story.id}
                            className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                        >
                            {story.thumbnail && (
                                <div className="h-48 relative overflow-hidden">
                                    <img 
                                        src={`/storage/${story.thumbnail}`}  
                                        alt={story.title} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                    />
                                </div>
                            )}
                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                                    {story.title}
                                </h2>
                                <div className="text-sm text-gray-500 mb-4">
                                    By {story.user.name} • {story.cancer_type}
                                </div>
                                <div className="text-sm text-gray-600 line-clamp-3">
                                    <div dangerouslySetInnerHTML={{ __html: story.content }} />
                                </div>
                                <div className="mt-4 text-sm text-gray-500">
                                    {formatDate(story.created_at)}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>

                {count === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No stories have been shared yet.</p>
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}