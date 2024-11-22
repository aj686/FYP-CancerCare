import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PencilIcon, TrashIcon, EyeIcon } from 'lucide-react';
import BlogAdd from '@/Components/My Components/Admin Comp/Blog/BlogAdd';
import BlogDelete from '@/Components/My Components/Admin Comp/Blog/BlogDelete';
import BlogUpdate from '@/Components/My Components/Admin Comp/Blog/BlogUpdate';

export default function Blog({ auth, blogs, count }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const truncateText = (text, maxLength) => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Blog Post Dashboard</h2>}
        >
            <Head title="Blog" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Header Section */}
                        <div className="p-6 flex justify-between items-center border-b">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Blog Posts</h3>
                                <p className="text-sm text-gray-600">
                                    Total Posts: {count === 0 ? "No blogs yet" : count}
                                </p>
                            </div>
                            <BlogAdd className="float-end" />
                        </div>

                        {/* Table Section */}
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thumbnail</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blog Info</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content Preview</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {blogs.map((blog) => (
                                            <tr key={blog.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {blog.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {blog.thumbnail && (
                                                        <img 
                                                            src={`/storage/${blog.thumbnail}`} 
                                                            alt={blog.title}
                                                            className="h-16 w-16 object-cover rounded-md"
                                                        />
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                                                    <div className="text-sm text-gray-500">Slug: {blog.slug}</div>
                                                    <div className="text-sm text-gray-500 mt-1">{blog.header}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-500">
                                                        {truncateText(blog.content, 100)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm">
                                                        <p className="text-gray-900">Author: {blog.author}</p>
                                                        <p className="text-gray-500">Date: {formatDate(blog.date)}</p>
                                                        <div className="mt-1">
                                                            {blog.tags?.split(',').map((tag, index) => (
                                                                <span 
                                                                    key={index}
                                                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-1 mb-1"
                                                                >
                                                                    {tag.trim()}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                        blog.active === 1 ? 
                                                        'bg-green-100 text-green-800' : 
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {blog.active === 1 ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex flex-col space-y-2">
                                                        <BlogUpdate 
                                                            className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                                                            blogId={`my_modal_3${blog.id}`}
                                                            blog={blog}
                                                        >
                                                            <PencilIcon className="h-4 w-4" />
                                                            <span>Edit</span>
                                                        </BlogUpdate>

                                                        <BlogDelete 
                                                            className="text-red-600 hover:text-red-900 flex items-center gap-1"
                                                            blogId={`my_modal_4${blog.id}`}
                                                            blog={blog}
                                                        >
                                                            <TrashIcon className="h-4 w-4" />
                                                            <span>Delete</span>
                                                        </BlogDelete>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}