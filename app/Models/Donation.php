<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Donation extends Model
{
    use HasFactory;

    const STATUS_PENDING = 'pending';
    const STATUS_COMPLETED = 'completed';
    const STATUS_FAILED = 'failed';

    protected $fillable = [
        'user_id',
        'amount',
        'stripe_session_id',
        'payment_status',
        'first_name',
        'last_name',
        'email',
        'phone',
        'identity_number',
        'race',
        'street_address',
        'address_line2',
        'city',
        'state',
        'postal_code',
        'country',
        'newsletter_opt_in',
        'payment_date'
    ];

    protected $casts = [
        'amount' => 'float',
        'newsletter_opt_in' => 'boolean',
        'payment_date' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
