<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventRegistration extends Model
{
    use HasFactory;

    protected $fillable = [
        'events_id',
        'user_id', 
        'status'
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function event()
    {
        return $this->belongsTo(Events::class, 'events_id');
    }

    public function user() 
    {
        return $this->belongsTo(User::class);
    }

    public function feedback()
    {
        return $this->hasOne(EventFeedback::class);
    }

    public function canLeaveFeedback()
    {
        return $this->status === 'registered' && 
            $this->event->status === 'completed' && 
            !$this->feedback()->exists();
    }
}
