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
            {/* Hero Section with Purple Gradient */}
            <section className="relative bg-center bg-no-repeat bg-cover bg-[url('https://img.freepik.com/free-photo/curvy-pink-streamer-closeup_23-2148050293.jpg?t=st=1726639737~exp=1726643337~hmac=52c3d94107ae4236b83203f757da5bd81a33dcb6d74227b9a2011e98c9a87687&w=996')]">
                <div className="absolute inset-0 bg-gradient-to-br from-purpleMuda via-purpleMid to-purpleTua opacity-90"></div>
                <div className="relative px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                        Cancer Stories
                    </h1>
                    <p className="mb-8 text-lg font-normal text-gray-200 lg:text-xl sm:px-16 lg:px-48">
                        Real stories from real people sharing their cancer journeys, experiences, and hope.
                    </p>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                        <a href="#" className="inline-flex justify-center items-center py-3 px-6 text-base font-medium text-purpleTua bg-yellow-300 hover:bg-yellow-400 rounded-full transition-colors">
                            See Story Gallery
                            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </div>
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