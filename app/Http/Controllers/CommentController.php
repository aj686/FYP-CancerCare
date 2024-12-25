<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\UserStory;
use App\Models\CommentLike;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CommentController extends Controller
{
    public function index(UserStory $story)
    {
        return response()->json([
            'comments' => $story->comments()->with('user')->latest()->get()
        ]);
    }

    public function store(Request $request, UserStory $story)
    {
        $user = Auth::user();

        if (!$user->membership) {
            return response()->json([
                'message' => 'Only members can post comments'
            ], 403);
        }

        $validated = $request->validate([
            'content' => 'required|string|max:1000'
        ]);

        $comment = $story->comments()->create([
            'user_id' => $user->id,
            'content' => $validated['content']
        ]);

        return response()->json([
            'comment' => $comment->load('user'),
            'message' => 'Comment added successfully'
        ]);
    }

    public function destroy(Comment $comment)
    {
        $user = Auth::user();
        
        if ($comment->user_id !== $user->id && $user->usertype !== 'admin') {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        $comment->delete();
        
        return response()->json([
            'message' => 'Comment deleted successfully'
        ]);
    }

    public function toggleLike(Comment $comment)
    {
        $user = Auth::user();
        
        if (!$user) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        $exists = CommentLike::where('comment_id', $comment->id)
                            ->where('user_id', $user->id)
                            ->exists();

        if ($exists) {
            CommentLike::where('comment_id', $comment->id)
                       ->where('user_id', $user->id)
                       ->delete();
            $action = 'unliked';
        } else {
            CommentLike::create([
                'comment_id' => $comment->id,
                'user_id' => $user->id
            ]);
            $action = 'liked';
        }

        return response()->json([
            'success' => true,
            'likes_count' => $comment->likes()->count(),
            'is_liked' => $action === 'liked',
            'message' => "Comment $action successfully"
        ]);
    }
}