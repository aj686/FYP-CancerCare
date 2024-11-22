<?php

namespace App\Http\Controllers;

use App\Models\Events;
use App\Models\Membership;
use App\Models\EventRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Exception;


class EventRegistrationController extends Controller
{
    public function register(Request $request, Events $event)
    {
        $user = $request->user();
        
        // Check if user is already registered
        $existingRegistration = EventRegistration::where('events_id', $event->id)
            ->where('user_id', $user->id)
            ->where('status', 'registered')
            ->first();
            
        if ($existingRegistration) {
            return back()->with('error', 'You are already registered for this event');
        }

        // Check participant limit
        $registeredCount = EventRegistration::where('events_id', $event->id)
            ->where('status', 'registered')
            ->count();
            
        if ($registeredCount >= $event->participant_count) {
            return back()->with('error', 'Event is full');
        }

        // For paid events, check membership
        if ($event->price > 0 && !$user->hasActiveMembership()) {
            return back()->with('error', 'This event requires an active membership');
        }

        // Create registration
        EventRegistration::create([
            'events_id' => $event->id,
            'user_id' => $user->id,
            'status' => 'registered'
        ]);

        return back()->with([
            'success' => 'Successfully registered for the event',
        ]);
    }

    public function cancel(Request $request, Events $event)
    {
        try {
            $user = $request->user();
            
            $registration = EventRegistration::where('events_id', $event->id)
                ->where('user_id', $user->id)
                ->where('status', 'registered')
                ->first();

            if (!$registration) {
                Log::info('User attempted to cancel non-existent registration', [
                    'user_id' => $user->id,
                    'event_id' => $event->id
                ]);
                return back()->with('error', 'No active registration found');
            }

            $registration->update(['status' => 'cancelled']);
            
            Log::info('User successfully cancelled event registration', [
                'user_id' => $user->id,
                'event_id' => $event->id,
                'registration_id' => $registration->id
            ]);

            return back()->with([
                'success' => 'Registration cancelled successfully'
            ]);

        } catch (Exception $e) {
            Log::error('Failed to cancel event registration', [
                'error' => $e->getMessage(),
                'user_id' => $request->user()->id ?? null,
                'event_id' => $event->id,
                'trace' => $e->getTraceAsString()
            ]);

            return back()->with('error', 'An error occurred while cancelling registration');
        }
    }
}