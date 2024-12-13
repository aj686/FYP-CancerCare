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
