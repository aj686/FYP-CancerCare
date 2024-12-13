<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Order;
use App\Models\Membership;
use Laravel\Cashier\Billable;
use HasActiveMembership;

class User extends Authenticatable
{
    use HasFactory, Notifiable, Billable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'usertype',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // one to many
    public function orders() {
        return $this->hasMany(Order::class);
    }

    public function isAdmin()
    {
        return $this->usertype === 'admin';
    }


    // Membership & Event Registration
    // Add event registration relationships
    // Membership relationship

    // Get all memberships (including expired ones)
    public function allMemberships()
    {
        return $this->hasMany(Membership::class);
    }

    // Event registration relationship
    public function eventRegistrations()
    {
        return $this->hasMany(EventRegistration::class);
    }

    public function registeredEvents()
    {
        return $this->belongsToMany(Events::class, 'event_registrations', 'user_id', 'events_id')
                    ->withPivot('status')
                    ->withTimestamps();
    }

    // Helper methods
    /**
     * Check if user has an active membership
     *
     * @return bool
     */
    public function hasActiveMembership(): bool
    {
        return $this->allMemberships()
                    ->where('status', 'active')
                    ->where('end_date', '>', now())
                    ->exists();
        
                    
    }

    public function membership()
    {
        return $this->hasOne(Membership::class)->where('status', 'active')
                    ->where('end_date', '>', now());
    }


    public function isRegisteredForEvent($eventId)
    {
        return $this->eventRegistrations()
                    ->where('events_id', $eventId)
                    ->where('status', 'registered')
                    ->exists();
    }
    
    // connect to membership cotroller to verify subscribe user or not
    public function memberships()
    {
        return $this->hasMany(Membership::class);
    }

}