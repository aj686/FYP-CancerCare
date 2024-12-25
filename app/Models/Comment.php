<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'user_story_id',
        'content',
    ];

    protected $with = ['user'];
    protected $appends = ['likes_count', 'is_liked'];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function story()
    {
        return $this->belongsTo(UserStory::class, 'user_story_id');
    }

    public function likes()
    {
        return $this->hasMany(CommentLike::class);
    }

    public function getLikesCountAttribute()
    {
        return $this->likes()->count();
    }

    public function getIsLikedAttribute()
    {
        if (!Auth::check()) return false;
        return $this->likes()->where('user_id', Auth::id())->exists();
    }
}