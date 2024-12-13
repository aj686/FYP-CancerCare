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

        try {
            $validated = $request->validate([
                'title' => 'required|max:255',
                'content' => 'required',
                'cancer_type' => 'required|string|max:100',
                'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            $validated['user_id'] = Auth::user()->id;
            $validated['slug'] = Str::slug($request->title);
            $validated['status'] = 'pending';

            if ($request->hasFile('thumbnail')) {
                $path = $request->file('thumbnail')->store('public/stories');
                $validated['thumbnail'] = str_replace('public/', '', $path);
            }

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

        return Inertia::render('StoryShow', [
            'story' => $story
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

        try {
            $validated = $request->validate([
                'title' => 'required|max:255',
                'content' => 'required',
                'cancer_type' => 'required|string|max:100',
                'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            $validated['slug'] = Str::slug($request->title);
            $validated['status'] = 'pending'; // Reset to pending after edit

            if ($request->hasFile('thumbnail')) {
                if ($story->thumbnail) {
                    Storage::delete('public/' . $story->thumbnail);
                }
                $path = $request->file('thumbnail')->store('public/stories');
                $validated['thumbnail'] = str_replace('public/', '', $path);
            }

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
}