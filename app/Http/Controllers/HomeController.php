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

        if(Auth::check()) {
            $user = Auth::user();
            return Inertia::render('GetInvolved',[
                'events' => Events::where('status', 'active')
                ->orderBy('start_date', 'asc')
                ->get()
            ]);
            } else {
                return Inertia::render("Guest/GetInvolved",[
                    'events' => Events::where('status', 'active')
                    ->orderBy('start_date', 'asc')
                    ->get()
                ]);
            } 
    }

    // View each detail event
    public function showEvent(Request $request, Events $event) {
        $user = $request->user();
        
        $isRegistered = false;
        $hasMembership = false;

        $isRegistered = false;
        if ($user) {
            $isRegistered = EventRegistration::where('events_id', $event->id)
                ->where('user_id', $user->id)
                ->where('status', 'registered')
                ->exists();
        }

        $hasMembership = $user ? $user->hasActiveMembership() : false;

        return Inertia::render('EventDetails', [
            'event' => $event,
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

    public function ourResearch() {
        return Inertia::render("OurResearch" ,[
            'blogs' => Blogs::all()
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
