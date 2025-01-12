<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Events;
use App\Models\Blogs;
use App\Models\Plan;
use App\Models\EventRegistration;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
{
    $blogs = Blogs::latest()->take(3)->get();
    $plans = Plan::all();
    
    if(Auth::check()) {
        $user = Auth::user();
        $activeMembership = $user->membership;
        
        return Inertia::render('Homepage', [
            'blogs' => $blogs,
            'plans' => $plans,
            'isGuest' => false,
            'activeMembership' => $activeMembership ? [
                'plan_id' => $activeMembership->plan_id,
                'end_date' => $activeMembership->end_date,
                'status' => $activeMembership->status
            ] : null,
        ]);
    } else {
        return Inertia::render('Homepage', [
            'blogs' => $blogs,
            'plans' => $plans,
            'isGuest' => true,
            'activeMembership' => null,
        ]);
    }
}

    // public function indexGuest() {
    //     // if User Not Logged In
    //     return Inertia::render('Guest/Homepage');
    // }

    public function cancerInformation() {

        if(Auth::check()) {
            $user = Auth::user();
            return Inertia::render('CancerInformation');
        } else {
            return Inertia::render("Guest/CancerInformation");
        }
    }

    // Pass events to GetInvolved component then pass to EvenList component
   public function getInvolved() {
        // First, get events with necessary relationships
        $events = Events::with([
            'registrations', 
            'registrations.user',
            'registrations.feedback' => function($query) {
                $query->with('user'); // Make sure we have user data for feedbacks
            }
        ])
        ->withCount(['registrations as registered_count' => function($query) {
            $query->where('status', 'registered');
        }])
        ->get()
        ->map(function ($event) {
            // Get registered users
            $registeredUsers = $event->registrations
                ->where('status', 'registered')
                ->pluck('user_id')
                ->toArray();

            // Calculate average rating safely
            $feedbacks = $event->registrations
                ->pluck('feedback')
                ->filter() // Remove null values
                ->values(); // Reindex array

            $average_rating = $feedbacks->avg('rating');

            // Map event data
            return [
                'id' => $event->id,
                'title' => $event->title,
                'description' => $event->description,
                'start_date' => $event->start_date,
                'end_date' => $event->end_date,
                'event_time' => $event->event_time,
                'price' => $event->price,
                'location' => $event->location,
                'image' => $event->image,
                'participant_count' => $event->participant_count,
                'status' => $event->status,
                'created_at' => $event->created_at,
                'updated_at' => $event->updated_at,
                'registered_count' => $event->registered_count,
                'registered_users' => $registeredUsers,
                'is_full' => $event->registered_count >= $event->participant_count,
                'average_rating' => $average_rating ? round($average_rating, 1) : null,
                // Safely map feedbacks
                'feedbacks' => $feedbacks->map(function ($feedback) {
                    return [
                        'id' => $feedback->id,
                        'rating' => $feedback->rating,
                        'anonymous' => $feedback->anonymous,
                        // Only include user_id if feedback exists and isn't anonymous
                        'user_id' => $feedback->anonymous ? null : $feedback->user_id
                    ];
                })->values()->all()
            ];
        });

        $plan = Plan::where('slug', 'yearly-membership')->first();

        return Inertia::render(Auth::check() ? 'GetInvolved' : 'Guest/GetInvolved', [
            'events' => $events,
            'auth' => [
                'user' => Auth::user()
            ],
            'plan' => $plan
        ]);
    }

    // View each detail event
    public function showEvent(Request $request, Events $event) {
        $user = $request->user();
        
        // Load the event with registrations
        $event = Events::with(['registrations' => function($query) {
            $query->where('status', 'registered');
        }])
        ->withCount(['registrations as registered_count' => function($query) {
            $query->where('status', 'registered');
        }])
        ->findOrFail($event->id);
    
        $isRegistered = false;
        $hasMembership = false;
    
        if ($user) {
            $isRegistered = EventRegistration::where('events_id', $event->id)
                ->where('user_id', $user->id)
                ->where('status', 'registered')
                ->exists();
            
            $hasMembership = $user->hasActiveMembership();
        }
    
        // Add registered_users array like in getInvolved method
        $registeredUsers = $event->registrations
            ->where('status', 'registered')
            ->pluck('user_id')
            ->toArray();
    
        $eventData = array_merge($event->toArray(), [
            'registered_users' => $registeredUsers,
            'is_full' => $event->registered_count >= $event->participant_count
        ]);
    
        return Inertia::render('EventDetails', [
            'event' => $eventData,
            'isRegistered' => $isRegistered,
            'hasMembership' => $hasMembership,
            'auth' => [
                'user' => $user
            ]
        ]);
    }

    // public function eventList() {
    //     return Inertia::render("Involved/EventLists", [
    //         'events' => Events::all()
    //     ]);
    // }

    public function ourResearch(Request $request) {
        $query = Blogs::query();
        
        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('content', 'like', '%' . $request->search . '%')
                  ->orWhere('tags', 'like', '%' . $request->search . '%');
        }
    
        return Inertia::render("OurResearch", [
            'blogs' => $query->paginate(3)
        ]);
    }

    public function showBlog($title) {
        $blog = Blogs::where('title', str_replace('-', ' ', $title))
                ->orWhere('slug', $title)
                ->firstOrFail();
                
        return inertia('BlogViewDetail', [
            'blog' => [
                'id' => $blog->id,
                'title' => $blog->title,
                'header' => $blog->header,
                'content' => $blog->content,
                'thumbnail' => $blog->thumbnail,
                'author' => $blog->author,
                'date' => $blog->created_at->format('M d, Y'),
                'tags' => $blog->tags
            ]
        ]);
    }

    public function about() {
        return Inertia::render("About");
    }

    // Methods for guest users
    // protected function guestIndex()
    // {
    //     return Inertia::render('Guest/Homepage');
    // }

    // protected function guestCancerInformation()
    // {
    //     return Inertia::render('Guest/CancerInformation');
    // }

    // protected function guestGetInvolved()
    // {
    //     return Inertia::render('Guest/GetInvolved');
    // }

    // protected function guestShowEvent($event)
    // {
    //     return Inertia::render('Guest/Event/Show', [
    //         'event' => $event
    //     ]);
    // }

    // protected function guestOurResearch()
    // {
    //     return Inertia::render('Guest/OurResearch');
    // }

    // protected function guestShowBlog($title)
    // {
    //     return Inertia::render('Guest/Blog/Show', [
    //         'title' => $title
    //     ]);
    // }

    // protected function guestAbout()
    // {
    //     return Inertia::render('Guest/About');
    // }
}
