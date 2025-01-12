import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Star } from 'lucide-react';

export default function EventFeedbackModal({ isOpen, onClose, eventId, registration }) {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        rating: 0,
        comment: '',
        anonymous: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/events/${eventId}/feedback`, {
            onSuccess: () => {
                reset();
                onClose();
            }
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h3 className="text-xl font-bold text-purpleTua mb-4">Event Feedback</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            How would you rate this event?
                        </label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => {
                                        setRating(star);
                                        setData('rating', star);
                                    }}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    className="focus:outline-none"
                                >
                                    <Star 
                                        size={32}
                                        className={`${
                                            (hoveredRating ? hoveredRating >= star : rating >= star)
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-gray-300'
                                        } transition-colors`}
                                    />
                                </button>
                            ))}
                        </div>
                        {errors.rating && (
                            <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Share your thoughts about the event (Optional)
                        </label>
                        <textarea
                            value={data.comment}
                            onChange={e => setData('comment', e.target.value)}
                            className="w-full px-3 py-2 border rounded-md resize-none focus:ring-2 focus:ring-purpleMuda focus:border-purpleMuda"
                            rows={4}
                            placeholder="Tell us about your experience..."
                        />
                        {errors.comment && (
                            <p className="text-red-500 text-sm mt-1">{errors.comment}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="anonymous"
                            checked={data.anonymous}
                            onChange={e => setData('anonymous', e.target.checked)}
                            className="rounded border-gray-300 text-purpleTua focus:ring-purpleMuda"
                        />
                        <label htmlFor="anonymous" className="text-sm text-gray-700">
                            Submit anonymously
                        </label>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing || !data.rating}
                            className="px-4 py-2 bg-purpleTua text-white rounded-md hover:bg-purple-700 
                                     disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Submit Feedback
                        </button>
                    </div>
                </form>
            </div>
            
            {/* Click outside to close */}
            <div 
                className="absolute inset-0 -z-10" 
                onClick={onClose}
                aria-hidden="true"
            />
        </div>
    );
}