<?php

namespace App\Http\Controllers;

use App\Models\UserStory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserStoryController extends Controller
{
    // Remove constructor middleware and add it to routes instead
    
    // Gets all approved stories with their user relationships.
    // blog listing page where visitors can read cancer survivor stories.

    public function index()
    {
        $stories = UserStory::with('user')
            ->where('status', 'approved')
            ->latest()
            ->get();

        return Inertia::render('StoriesIndex', [
            'stories' => $stories,
            'count' => $stories->count()
        ]);
    }

    public function myStories()
    {
        $stories = UserStory::where('user_id', Auth::user()->id)
            ->latest()
            ->get();

        return Inertia::render('User/MyStories', [
            'stories' => $stories,
            'count' => $stories->count()
        ]);
    }

    public function store(Request $request)
    {
        Log::info('Story creation request received', [
            'request_data' => $request->except('thumbnail')
        ]);

        $validated = $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
            'cancer_type' => 'required|string|max:100',
            'thumbnail' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        try {
            // Handle thumbnail upload
            if ($request->hasFile('thumbnail')) {
                $image = $request->file('thumbnail');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('storage/thumbnail'), $imageName);
                $validated['thumbnail'] = 'thumbnail/' . $imageName;
            }

            $validated['user_id'] = Auth::user()->id;
            $validated['slug'] = Str::slug($request->title);
            $validated['status'] = 'pending';

            UserStory::create($validated);

            Log::info('Story created successfully', ['user_id' => Auth::user()->id]);

            return redirect()->route('stories.my-stories')
                ->with('message', 'Story submitted successfully and pending review');

        } catch (\Exception $e) {
            Log::error('Error creating story', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()
                ->withErrors(['error' => 'Failed to submit story'])
                ->withInput();
        }
    }

    // Finds a specific story by its URL-friendly slug
    // In UserStoryController.php
    public function show($slug)
    {
        $story = UserStory::with('user')
            ->where('slug', $slug)
            ->firstOrFail();

        // Check if story is not approved and user is not the owner or admin
        if ($story->status !== 'approved' && 
            $story->user_id !== Auth::user()->id && 
            Auth::user()->usertype !== 'admin') {
            abort(403);
        }

        // Get other stories (excluding current one)
        $otherStories = UserStory::with('user')
            ->where('status', 'approved')
            ->where('id', '!=', $story->id)
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('StoryShow', [
            'story' => $story,
            'otherStories' => $otherStories,
            'auth' => [
                'user' => Auth::check() ? [
                    'id' => Auth::id(),
                    'usertype' => Auth::user()->usertype
                ] : null
            ]
        ]);
    }


    public function update(Request $request, UserStory $story)
    {
        if ($story->user_id !== Auth::user()->id) {
            abort(403);
        }

        Log::info('Story update request received', [
            'story_id' => $story->id,
            'request_data' => $request->except('thumbnail')
        ]);

        $validated = $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
            'cancer_type' => 'required|string|max:100',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        try {
            if ($request->hasFile('thumbnail')) {
                // Delete old thumbnail if exists
                if ($story->thumbnail) {
                    $oldPath = public_path('storage/' . $story->thumbnail);
                    if (file_exists($oldPath)) {
                        unlink($oldPath);
                    }
                }
                
                // Upload new thumbnail
                $image = $request->file('thumbnail');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('storage/thumbnail'), $imageName);
                $validated['thumbnail'] = 'thumbnail/' . $imageName;
            }

            $validated['slug'] = Str::slug($request->title);
            $validated['status'] = 'pending';

            $story->update($validated);

            Log::info('Story updated successfully', ['story_id' => $story->id]);

            return redirect()->route('stories.my-stories')
                ->with('message', 'Story updated successfully and pending review');

        } catch (\Exception $e) {
            Log::error('Error updating story', [
                'story_id' => $story->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()
                ->withErrors(['error' => 'Failed to update story'])
                ->withInput();
        }
    }

    public function destroy(UserStory $story)
    {
        // Check if user is owner or admin
        if ($story->user_id !== Auth::user()->id && Auth::user()->usertype !== 'admin') {
            abort(403);
        }

        try {
            if ($story->thumbnail) {
                Storage::delete('public/' . $story->thumbnail);
            }

            $story->delete();

            Log::info('Story deleted successfully', ['story_id' => $story->id]);

            return redirect()->route('stories.my-stories')
                ->with('message', 'Story deleted successfully');

        } catch (\Exception $e) {
            Log::error('Error deleting story', [
                'story_id' => $story->id,
                'error' => $e->getMessage()
            ]);

            return back()->withErrors(['error' => 'Failed to delete story']);
        }
    }

    // Commenting out for now
    public function showComment($slug)
    {
        try {
            $story = UserStory::with(['user', 'comments.user', 'comments.likes'])
                ->where('slug', $slug)
                ->firstOrFail();

            if ($story->status !== 'approved' && 
                $story->user_id !== Auth::user()?->id && 
                Auth::user()?->usertype !== 'admin') {
                abort(403);
            }

            // Get related stories with the same cancer type
            $relatedStories = UserStory::with('user')
                ->where('status', 'approved')
                ->where('cancer_type', $story->cancer_type)
                ->where('id', '!=', $story->id)
                ->latest()
                ->take(5)
                ->get();

            return Inertia::render('StoryShow', [
                'story' => array_merge($story->toArray(), [
                    'relatedStories' => $relatedStories
                ]),
                'auth' => [
                    'user' => Auth::check() ? [
                        'id' => Auth::id(),
                        'usertype' => Auth::user()->usertype,
                        'membership' => Auth::user()->membership
                    ] : null
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Error in showComment:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            abort(500, 'Error loading story');
        }
    }
}