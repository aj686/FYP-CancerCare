<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $fillable = [
        'order_id',
        'ordernumber',
        'user_id',
        'stripe_session_id',
        'payment_method',
        'amount',
        'payment_status',
        'payment_date',
    ];

    // order can have many payments
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    //user can have many payments)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
