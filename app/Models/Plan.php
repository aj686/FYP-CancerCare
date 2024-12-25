<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'stripe_plan',
        'price',
        'description',
        'can_comment',
        'can_access_forum',
        'can_access_events',
        'can_share_stories',
        'billing_interval',
    ];

    protected $casts = [
        'can_comment' => 'boolean',
        'can_access_forum' => 'boolean',
        'can_access_events' => 'boolean',
        'can_share_stories' => 'boolean',
        'price' => 'decimal:2'
    ];

    public function getRouteKeyName() {
        return 'slug';
    }

    public function memberships()
    {
        return $this->hasMany(Membership::class);
    }

    /**
     * Check if the plan is available for subscription
     */
    public function isActive(): bool
    {
        return !empty($this->stripe_plan);
    }
}
