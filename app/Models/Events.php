<?php

namespace App\Models;

use App\Http\Controllers\EventRegistrationController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon; // Add this import

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
        'status',
        'funding_goal',
        'funding_description',
        'funding_end_date',
        'funding_categories'
    ];

    protected $casts = [
        'funding_categories' => 'array'
    ];

    public function donations()
    {
        return $this->hasMany(EventDonation::class, 'event_id');
    }

    public function getTotalDonationsAttribute()
    {
        return $this->donations()->where('status', 'completed')->sum('amount');
    }

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
        return $this->registrations()
            ->where('status', 'registered')
            ->count() >= $this->participant_count;
    }

    public function getAvailableSpots()
    {
        $registeredCount = $this->registrations()
            ->where('status', 'registered')
            ->count();
        return max(0, $this->participant_count - $registeredCount);
    }

    protected static function boot()
    {
        parent::boot();
        
        static::updating(function ($event) {
            // Automatically update status when capacity is reached
            if ($event->isFullyBooked()) {
                $event->status = 'full';
            }

            // Automatically update status to "completed" if the event end_date has passed
            $today = Carbon::now()->toDateString();
            if ($event->end_date < $today && $event->status !== 'completed') {
                $event->status = 'completed';
            }
        });

        // Add logic for when the event is created
        static::creating(function ($event) {
            $today = Carbon::now()->toDateString();
            if ($event->end_date < $today && $event->status !== 'completed') {
                $event->status = 'completed';
            }
        });
    }
}