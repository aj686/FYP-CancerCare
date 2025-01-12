<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventFeedback extends Model
{

    use HasFactory;

    protected $table = 'event_feedbacks';

    protected $fillable = [
        'events_id',
        'user_id',
        'event_registration_id',
        'rating',
        'comment',
        'anonymous'
    ];

    protected $casts = [
        'anonymous' => 'boolean',
        'rating' => 'integer'
    ];

    public function event()
    {
        return $this->belongsTo(Events::class, 'events_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function registration()
    {
        return $this->belongsTo(EventRegistration::class, 'event_registration_id');
    }
}
