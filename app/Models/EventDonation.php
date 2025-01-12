<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventDonation extends Model
{
    use HasFactory;
    protected $fillable = [
        'event_id',
        'user_id',
        'amount',
        'status',
        'stripe_payment_id',
        'message',
        'is_anonymous'
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'is_anonymous' => 'boolean'
    ];

    public function event()
    {
        return $this->belongsTo(Events::class, 'event_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
