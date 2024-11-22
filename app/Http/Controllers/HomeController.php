<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Events;
use App\Models\Blogs;
use App\Models\EventRegistration;

class HomeController extends Controller
{
    public function index() {
        return Inertia::render("Homepage");
    }

    public function cancerInformation() {
        return Inertia::render("CancerInformation");
    }

    // Pass events to GetInvolved component then pass to EvenList component
    public function getInvolved() {
        return Inertia::render("GetInvolved", [
            'events' => Events::where('status', 'active')
                ->orderBy('start_date', 'asc')
                ->get()
        ]);
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

    public function eventList() {
        return Inertia::render("Involved/EventLists", [
            'events' => Events::all()
        ]);
    }

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

}
