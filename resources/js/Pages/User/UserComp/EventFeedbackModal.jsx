import React, { useState } from 'react';
import { Star, X } from 'lucide-react';

export default function EventFeedbackModal({ isOpen, onClose, onSubmit, eventRegistration }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [anonymous, setAnonymous] = useState(false);
    const [hoveredRating, setHoveredRating] = useState(0);

    if (!isOpen || !eventRegistration) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            rating,
            comment,
            anonymous,
            eventRegistrationId: eventRegistration.id
        });
        setRating(0);
        setComment('');
        setAnonymous(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X className="h-6 w-6" />
                </button>

                {/* Modal content */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Event Feedback</h2>
                    <p className="text-gray-600 mt-1">{eventRegistration.event.title}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Rating */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            How would you rate this event?
                        </label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setRating(value)}
                                    onMouseEnter={() => setHoveredRating(value)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    className="focus:outline-none"
                                >
                                    <Star
                                        className={`w-8 h-8 ${
                                            (hoveredRating || rating) >= value
                                                ? 'text-yellow-400 fill-yellow-400'
                                                : 'text-gray-300'
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Comment */}
                    <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                            Share your thoughts (Optional)
                        </label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            rows="4"
                            placeholder="Tell us about your experience..."
                        />
                    </div>

                    {/* Anonymous option */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="anonymous"
                            checked={anonymous}
                            onChange={(e) => setAnonymous(e.target.checked)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="anonymous" className="ml-2 text-sm text-gray-600">
                            Submit feedback anonymously
                        </label>
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!rating}
                            className={`px-4 py-2 text-white rounded-md ${
                                rating
                                    ? 'bg-blue-600 hover:bg-blue-700'
                                    : 'bg-gray-400 cursor-not-allowed'
                            }`}
                        >
                            Submit Feedback
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}