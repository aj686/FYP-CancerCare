<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    const STATUS_PENDING = 'pending';
    const STATUS_COMPLETED = 'completed';
    const STATUS_FAILED = 'failed';
    const STATUS_REFUNDED = 'refunded';

    protected $fillable = [
        'order_id',
        'ordernumber',
        'user_id',
        'stripe_session_id',
        'payment_method',
        'amount',
        'payment_status',
        'payment_date',
        'stripe_invoice_id',
        'stripe_invoice_url',
        'invoice_pdf'
    ];

    protected $casts = [
        'amount' => 'float',
        'payment_date' => 'datetime'
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

    // Helper methods
    public function isCompleted()
    {
        return $this->payment_status === self::STATUS_COMPLETED;
    }

    public function isPending()
    {
        return $this->payment_status === self::STATUS_PENDING;
    }

    public function isFailed()
    {
        return $this->payment_status === self::STATUS_FAILED;
    }

    public function isRefunded()
    {
        return $this->payment_status === self::STATUS_REFUNDED;
    }

    // New helper method for invoice
    public function hasInvoice()
    {
        return !empty($this->stripe_invoice_url);
    }
}
