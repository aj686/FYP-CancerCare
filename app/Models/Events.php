<?php

namespace App\Models;

use App\Http\Controllers\EventRegistrationController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Events extends Model
{
    use HasFactory;
    
    protected $fillable = [
         'title', 
         'description', 
         'start_date', 
         'end_date', 
         'event_time',
         'price',
         'location', 
         'image', 
         'participant_count',
         'status'
    ];

    // Fix: Change to EventRegistration model instead of controller
    public function registrations()
    {
        return $this->hasMany(EventRegistration::class, 'events_id'); // Changed to events_id
    }

    public function registeredUsers()
    {
        return $this->belongsToMany(User::class, 'event_registrations', 'events_id', 'user_id')
                    ->withPivot('status')
                    ->withTimestamps();
    }

    // Add helper methods
    public function isFullyBooked()
    {
        return $this->registrations()->where('status', 'registered')->count() >= $this->participant_count;
    }

    public function getAvailableSpots()
    {
        return max(0, $this->participant_count - $this->registrations()->where('status', 'registered')->count());
    }
}
