import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Heart } from 'lucide-react';  // Use this instead

export default function CommentSection({ story, auth, comments = [] }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [localComments, setLocalComments] = useState(comments);
    const [error, setError] = useState(null);

    // Check if user can comment
    const canComment = auth?.user?.membership?.status === 'active';

    // Debug
    console.log('Story:', story);
    console.log('Auth:', auth);
    console.log('Comments:', comments);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/stories/${story.id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify({ content: newComment }),
            });

            const data = await response.json();
            
            if (response.ok) {
                setLocalComments([data.comment, ...localComments]);
                setNewComment('');
            } else {
                alert(data.message || 'Failed to add comment');
            }
        } catch (error) {
            alert('Failed to add comment');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (commentId) => {
        if (!confirm('Are you sure you want to delete this comment?')) return;

        try {
            const response = await fetch(`/api/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
            });

            if (response.ok) {
                setLocalComments(localComments.filter(comment => comment.id !== commentId));
            } else {
                alert('Failed to delete comment');
            }
        } catch (error) {
            alert('Failed to delete comment');
        }
    };

    const handleLike = async (commentId, isLiked) => {
        if (!auth.user) {
            alert('Please login to like comments');
            return;
        }

        try {
            const response = await fetch(`/api/comments/${commentId}/toggle-like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
            });

            const data = await response.json();
            
            if (response.ok) {
                setLocalComments(localComments.map(comment => {
                    if (comment.id === commentId) {
                        return {
                            ...comment,
                            likes_count: data.likes_count,
                            is_liked: data.is_liked
                        };
                    }
                    return comment;
                }));
            }
        } catch (error) {
            alert('Failed to update like');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (!story) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Comments</h2>

            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            {/* Comment Form */}
            {auth?.user && (
                <div className="mb-8">
                    {canComment ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Share your thoughts..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                rows="3"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Posting...' : 'Post Comment'}
                            </button>
                        </form>
                    ) : (
                        <div className="bg-yellow-50 p-4 rounded-lg">
                            <p className="text-yellow-800">
                                Only members can comment on stories. 
                                <a href="/plan" className="ml-2 text-purple-600 hover:text-purple-800 font-medium">
                                    Join as a member
                                </a>
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Comments List */}
            <div className="space-y-6">
                {localComments.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No comments yet</p>
                ) : (
                    localComments.map((comment) => (
                        <div key={comment.id} className="flex space-x-4">
                            {/* User Avatar */}
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                    <span className="text-purple-600 font-medium">
                                        {comment.user?.name?.charAt(0) || '?'}
                                    </span>
                                </div>
                            </div>

                            {/* Comment Content */}
                            <div className="flex-grow">
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-medium text-gray-900">
                                                {comment.user?.name || 'Anonymous'}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                {formatDate(comment.created_at)}
                                            </p>
                                        </div>
                                        
                                        {/* Delete Button - Only show if user owns comment or is admin */}
                                        {(auth?.user?.id === comment.user_id || auth?.user?.usertype === 'admin') && (
                                            <button
                                                onClick={() => handleDelete(comment.id)}
                                                className="text-red-600 hover:text-red-800 text-sm"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-gray-700">{comment.content}</p>

                                    {/* Like Button */}
                                    <div className="mt-3 flex items-center gap-2">
                                        <button
                                            onClick={() => handleLike(comment.id, comment.is_liked)}
                                            className={`flex items-center gap-1 text-sm ${
                                                comment.is_liked 
                                                    ? 'text-red-500 hover:text-red-600' 
                                                    : 'text-gray-500 hover:text-gray-600'
                                            }`}
                                        >
                                            <Heart className={`w-5 h-5 ${comment.is_liked ? 'fill-current' : 'stroke-current'}`} />
                                            <span>{comment.likes_count || 0}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}