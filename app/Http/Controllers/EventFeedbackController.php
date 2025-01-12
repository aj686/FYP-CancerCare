<?php

namespace App\Http\Controllers;

use App\Models\Events;
use App\Models\EventFeedback;
use App\Models\EventRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventFeedbackController extends Controller
{
    public function store(Request $request, Events $event)
    {
        // Check if user is registered for this event
        $registration = EventRegistration::where('events_id', $event->id)
            ->where('user_id', Auth::id())
            ->where('status', 'registered')
            ->first();

        if (!$registration) {
            return back()->with('error', 'You must be registered for this event to leave feedback.');
        }

        // Check if user already left feedback
        $existingFeedback = EventFeedback::where('events_id', $event->id)
            ->where('user_id', Auth::id())
            ->exists();

        if ($existingFeedback) {
            return back()->with('error', 'You have already provided feedback for this event.');
        }

        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
            'anonymous' => 'boolean'
        ]);

        // Create feedback
        EventFeedback::create([
            'events_id' => $event->id,
            'user_id' => Auth::id(),
            'event_registration_id' => $registration->id,
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
            'anonymous' => $validated['anonymous'] ?? false
        ]);

        return back()->with('success', 'Thank you for your feedback!');
    }

    public function update(Request $request, Events $event, EventFeedback $feedback)
    {
        // Verify ownership
        if ($feedback->user_id !== Auth::id()) {
            return back()->with('error', 'Unauthorized action.');
        }

        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
            'anonymous' => 'boolean'
        ]);

        $feedback->update($validated);

        return back()->with('success', 'Feedback updated successfully!');
    }

    public function getEventFeedbacks(Events $event)
    {
        $feedbacks = $event->feedbacks()
            ->where(function($query) {
                $query->where('anonymous', false)
                      ->orWhere('user_id', Auth::id());
            })
            ->with(['user:id,name'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($feedback) {
                return [
                    'id' => $feedback->id,
                    'rating' => $feedback->rating,
                    'comment' => $feedback->comment,
                    'user_name' => $feedback->anonymous ? 'Anonymous' : $feedback->user->name,
                    'date' => $feedback->created_at->format('M d, Y'),
                    'is_owner' => $feedback->user_id === Auth::id()
                ];
            });

        return response()->json([
            'feedbacks' => $feedbacks,
            'average_rating' => $event->average_rating,
            'feedback_count' => $event->feedback_count
        ]);
    }
}