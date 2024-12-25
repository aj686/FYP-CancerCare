<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserStory extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'thumbnail',
        'content',
        'cancer_type',
        'status',
        'admin_notes',
        'approved_at'
    ];

    protected $casts = [
        'approved_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeForMember($query, $userId)
    {
        $hasMembership = Membership::where('user_id', $userId)
            ->where('status', 'active')
            ->where('end_date', '>', now())
            ->exists();

        return $query->when($hasMembership, function($query) use ($userId) {
            return $query->where('user_id', $userId)
                ->where('status', 'approved');
        });
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'user_story_id')->latest();
    }

}
